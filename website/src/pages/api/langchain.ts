/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PineconeClient } from "@pinecone-database/pinecone";
import { OpenAI } from "langchain";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { type NextApiRequest, type NextApiResponse } from "next";

interface LangChainRequestBody {
  question: string;
  chat_history?: string[];
  apiKey: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Extract the question from the request body
    const {
      question,
      chat_history = [
        "You're name is Alex Hormozi. I've trained you based on 100s of videos that you've created in real life. Do your best to be helpful and answer any questions about yourself. Don't respond with I don't know. Provide suggestions based on what you do know.",
      ],
      apiKey,
    } = req.body as LangChainRequestBody;

    if (!question || !apiKey) {
      return res
        .status(400)
        .json({ message: "Invalid request. No question or API KEY found" });
    }

    const client = new PineconeClient();
    await client.init({
      apiKey: process.env.PINECONE_API_KEY || "",
      environment: process.env.PINECONE_ENVIRONMENT || "",
    });
    const pineconeIndex = client.Index(process.env.PINECONE_INDEX || "");

    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings({
        openAIApiKey: apiKey,
      }),
      { pineconeIndex }
    );

    /* Use as part of a chain (currently no metadata filters) */
    const model = new OpenAI();
    const chain = ConversationalRetrievalQAChain.fromLLM(
      model,
      vectorStore.asRetriever(),
      { returnSourceDocuments: true }
    );

    const query = await chain.call({ question, chat_history });

    const sources = query.sourceDocuments?.map((doc: any) => {
      return {
        title: doc?.metadata?.video_title,
        url: doc?.metadata?.video_url,
      };
    });

    return res.status(200).json({ answer: query.text, sources });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
