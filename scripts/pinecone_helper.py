
from langchain.vectorstores import Pinecone
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from dotenv import load_dotenv
import pinecone
import os
import csv
import json


load_dotenv()


def store_transcript(transcript, video_url, video_title):
    """Stores a transcript in the Pinecone vector database.

    Args:
      transcript: The transcript to store.
      video_url: The URL of the video associated with the transcript.
      video_title: The title of the video associated with the transcript.

    Returns:
      A list of documents that were stored in the Pinecone vector database.
    """

    pinecone.init(
        api_key=os.environ.get("PINECONE_API_KEY"),
        environment=os.environ.get("PINECONE_ENVIRONMENT"),
    )

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=500,
    )

    metadatas = [{
        "video_url": video_url,
        "video_title": video_title,
    }]

    docs = splitter.create_documents([transcript], metadatas=metadatas)

    embeddings = OpenAIEmbeddings(
        openai_api_key=os.environ.get("OPENAI_API_KEY"), )
    Pinecone.from_documents(
        docs, embeddings, index_name=os.environ.get("PINECONE_INDEX")
    )


if __name__ == '__main__':
    with open('./scrapped_channels/ah3.csv', 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            video_id = row['url'].split('=')[-1]
            with open(f'./video_transcriptions/{video_id}.json', 'r') as json_file:
                data = json.load(json_file)
                transcript = data['text']
                store_transcript(
                    transcript, row['url'], row['title'])
