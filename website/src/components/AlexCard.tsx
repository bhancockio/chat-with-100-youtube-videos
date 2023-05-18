import Image from "next/image";

const AlexCard = () => (
  <div className="m-4 max-w-sm overflow-hidden rounded text-center shadow-lg">
    <Image
      width={150}
      height={150}
      className="mx-auto rounded-full"
      src="/alex_hormozi.jpeg"
      alt="Hormozi AI"
    />
    <div className="px-6 py-4">
      <div className="mb-2 text-xl font-bold">Hey, I&apos;m Hormozi AI</div>
      <p className="text-base text-gray-700">
        I was trained on Alex Hormozi&apos;s latest 100 YouTube videos. Ask me
        any question you&apos;d like!
      </p>
    </div>
  </div>
);

export default AlexCard;
