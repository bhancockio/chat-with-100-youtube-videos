import Card from "~/components/Card";
import Chat from "~/components/Chat";

const Home = () => {
  return (
    <div className=" mx-auto  my-10 flex h-full max-w-5xl flex-row">
      <div className="w-1/3">
        <Card />
      </div>
      <div className="w-2/3">
        <Chat />
      </div>
    </div>
  );
};

export default Home;
