import { useState } from "react";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const createNewRoom = (e: any) => {
    e.preventDefault();
    const newId = uuid();
    setRoomId(newId);
    toast.success("New room created");
  };
  const joinRoom = () => {
    alert(username + " is Joining room with id: " + roomId);
  };
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-primary-50 p-[20px] rounded-md w-[500px] max-w-[90%] shadow-lg transition-shadow duration-1000 hover:shadow-primary-100">
        <img src="/logo.png" className=" h-32" />
        <h4 className="mb-6 mt-2 font-bold text-primary-400">
          Paste invitation ROOM ID
        </h4>
        <div className="flex flex-col">
          <input
            type="text"
            className="bg-primary-300 p-2 mb-2 outline-none rounded-md text-[white] border-none"
            placeholder="Room-ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <input
            type="text"
            className="bg-primary-300 p-2 mb-2 outline-none rounded-md text-[white] border-none"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            onClick={joinRoom}
            className=" border-none bg-primary-400 ml-auto font-bold text-primary-50 hover:text-primary-100 w-20 h-10 rounded-md hover:bg-[#161616] transition-transform duration-300 ease-in-out active:scale-[0.9]"
          >
            JOIN
          </button>
          <span className="ml-auto mr-auto mt-3">
            don't have an invite? create a &nbsp;
            <a
              href=""
              onClick={createNewRoom}
              className=" text-primary-300 border-b-2 hover:text-primary-200"
            >
              new room
            </a>
          </span>
        </div>
      </div>
      <footer className="fixed bottom-0 text-primary-50 mb-2">
        <h4>
          Built by Prashant Pal &nbsp;
          <a
            href="https://github.com/prashant9420"
            className=" text-primary-100 border-b-2 hover:text-primary-200"
            target="_blank"
          >
            github
          </a>
        </h4>
      </footer>
    </div>
  );
};

export default Home;
