import Image from "next/image";

const BrandonCard = () => (
  <div className="m-4 max-w-sm overflow-hidden rounded text-center shadow-lg">
    <Image
      width={150}
      height={150}
      className="mx-auto rounded-full"
      src="/alex_hormozi.jpeg"
      alt="Hormozi AI"
    />
    <div className="px-6 py-4">
      <div className="mb-2 text-xl font-bold">
        Hey, I&apos;m Brandon Hancock
      </div>
      <p className="text-base text-gray-700">
        I created this Chat Bot so that you can experiment with new technologies
        like ChatGPT, LangChain, & Pinecone.
      </p>
    </div>
  </div>
);

export default BrandonCard;
