import { useState } from "react";
import { lazy } from "react";
import Client from "../components/Client";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import Hamburgur from "../components/Hamburger"
import { useNavigate } from "react-router-dom";
const Editor = lazy(() => import("../components/Editor/Editor"));

const EditorPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLeftColumn, setShowLeftColumn] = useState(true);
  const [clients, setClients] = useState([
    { socketId: 1, username: location.state.username },
    { socketId: 1, username: "dewansh pal" },
  ]);
  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(location.state.roomId);
    toast.success("Copied !!");
  };
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `${showLeftColumn ? 230 : 0}px 1fr`,
        transition: "200ms all",
      }}
    >
      <div
        onClick={() => setShowLeftColumn(!showLeftColumn)}
        className={`rounded-full p-1 mt-2 z-10 fixed ${
          showLeftColumn ? "ml-44" : "ml-0"
        } transition-all duration-200`}
      >
        <Hamburgur isOpen={showLeftColumn} />
      </div>
      <div className="flex flex-col items-center h-screen">
        <div className="bg-primary p-4 w-full">
          <img src="/logo.png" alt="logo" className="h-12" />
        </div>
        <h3 className="mr-auto ml-3 mt-3 mb-3">
          <strong>Sharing with...</strong>
        </h3>
        <div className=" grid grid-cols-2 h-max gap-2 rounded-[25px] overflow-x-hidden">
          {clients.map((client, key) => (
            <Client
              username={client.username}
              socketId={client.socketId}
              key={key}
            />
          ))}
        </div>
        <div className="flex flex-col w-52 mt-auto ml-auto mr-auto">
          <button
            className="btn btn-success mb-4 mt-4 text-white"
            onClick={handleCopyRoomId}
          >
            COPY Room-ID
          </button>
          <button className="btn btn-outline btn-error mb-4" onClick={()=>{localStorage.setItem("meetingJustLeft","1");navigate('/',{state:{from:"meeting"}});}}>LEAVE</button>
        </div>
      </div>
      <div className="pt-4 pl-10 w-full overflow-hidden h-full bg-neutral text-xl">
        <Editor />
      </div>
    </div>
  );
};

export default EditorPage;
