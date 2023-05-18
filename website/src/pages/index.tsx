import { useState } from "react";
import AlexCard from "~/components/AlexCard";
import BrandonCard from "~/components/BrandonCard";
import Chat from "~/components/Chat";

const Home = () => {
  const [apiKey, setApiKey] = useState("test");
  return (
    <div className="mx-auto mt-10 flex w-full max-w-5xl flex-col md:flex-row">
      <div className="flex w-full flex-row md:w-1/3 md:flex-col">
        <AlexCard />
        <BrandonCard />
      </div>
      <div className="w-full md:w-2/3">
        <Chat apiKey={apiKey} />
      </div>
    </div>
  );
};

export default Home;
