import AlexCard from "~/components/AlexCard";
import BrandonCard from "~/components/BrandonCard";
import Chat from "~/components/Chat";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  return (
    <div className="mx-auto mt-10 flex w-full max-w-5xl flex-col md:flex-row">
      <div className="flex w-full flex-row md:w-1/3 md:flex-col">
        <AlexCard />
        <BrandonCard />
      </div>
      <div className="w-full md:w-2/3">
        <Chat />
      </div>
    </div>
  );
};

export default Home;
