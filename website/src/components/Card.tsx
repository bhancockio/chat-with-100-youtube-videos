import Image from "next/image";

const Card = () => (
  <div className="m-4 max-w-sm overflow-hidden rounded text-center shadow-lg">
    <Image
      width={200}
      height={200}
      className="mx-auto rounded-full"
      src="/alex_hormozi.jpeg"
      alt="Hormozi AI"
    />
    <div className="px-6 py-4">
      <div className="mb-2 text-xl font-bold">Hey, I&apos;m Hormozi AI</div>
      <p className="text-base text-gray-700">
        I was trained on over 100 YouTube videos from Alex Hormozi. Ask me any
        question you&apos;d like!
      </p>
    </div>
  </div>
);

export default Card;
