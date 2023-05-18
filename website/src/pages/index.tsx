import { useState } from "react";
import AlexCard from "~/components/AlexCard";
import BrandonCard from "~/components/BrandonCard";
import Chat from "~/components/Chat";
import { BiInfoCircle } from "react-icons/bi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [apiKey, setApiKey] = useState("");

  const handleInfoClick = () => {
    toast.info(
      "This application requires a personal API key to function properly. Please input your key into the input field."
    );
  };

  return (
    <div className="mx-auto mt-10 flex w-full max-w-5xl flex-col md:flex-row">
      <div className="flex w-full flex-row md:w-1/3 md:flex-col">
        <AlexCard />
        <BrandonCard />
      </div>
      <div className="w-full md:w-2/3">
        <div className="my-4 flex items-center">
          <label className="mr-2" htmlFor="apiKey">
            API Key:
          </label>
          <input
            id="apiKey"
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="rounded-md border border-gray-300 p-2"
          />
          <BiInfoCircle
            className="ml-2 cursor-pointer text-red-500"
            size={20}
            onClick={handleInfoClick}
          />
        </div>
        <Chat apiKey={apiKey} />
      </div>
    </div>
  );
};

export default Home;
