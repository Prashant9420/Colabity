import { useState, useRef, useEffect } from "react";
import { lazy } from "react";
import Client from "../components/Client";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Hamburgur from "../components/Hamburger";
import { useNavigate } from "react-router-dom";
import ACTIONS from "../utils/Actions";
// import { Navigate } from "react-router-dom";
import { initSocket } from "../utils/socket";
const Editor = lazy(() => import("../components/Editor/Editor"));

const EditorPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.auth.user);
  const [showLeftColumn, setShowLeftColumn] = useState(true);
  const socketRef = useRef(null as any);
  const [clients, setClients] = useState([] as any);
  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(location.state?.roomId);
    toast.success("Copied !!");
  };
  const handleErrors = (err: any) => {
    console.log(err);
    toast.error("error occured, please try again later.");
    navigate("/");
  };
  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      console.log(socketRef.current);
      socketRef.current.on("connect_error", (err: any) => handleErrors(err));
      socketRef.current.on("connect_failed", (err: any) => handleErrors(err));

      socketRef.current.emit(ACTIONS.JOIN, {
        username: location.state?.username,
        roomId: location.state?.roomId,
        avatar: user.user.avatar,
      });

      socketRef.current.on(
        ACTIONS.JOINED,

        ({
          socketId,
          username,
          clients,
        }: {
          socketId: any;
          username: any;
          avatar: any;
          clients: any;
        }) => {
          console.log("incomingSocketId", socketId);
          console.log("currentSocketId", socketRef.current.id);
          if (socketRef.current.id !== socketId) {
            toast.success(`${username} joined the meeting`);
          }
          setClients(clients);
        }
      );

      socketRef.current.on(
        ACTIONS.DISCONNECTED,
        ({ socketId, username }: { socketId: any; username: string }) => {
          setClients((prev: any) => {
            return prev.filter((client: any) => client.socketId != socketId);
          });
          toast.error(`${username} left the meeting`);
        }
      );

    };
    init();
    return () => {
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
      socketRef.current.disconnect();
    };
  }, []);

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
          <strong>Sharing with..</strong>
        </h3>
        <div className=" grid grid-cols-2 h-max gap-2 rounded-[25px] overflow-x-hidden">
          {clients &&
            clients.map((client: any, key: any) => (
              <Client
                username={client.username}
                socketId={client.socketId}
                avatar={client.avatar}
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

          <button
            className="btn btn-outline btn-error mb-4"
            onClick={() => {
              toast.success("Meeting Left");
              socketRef.current.disconnect();
              navigate("/", { state: { fromEditor: true } });
            }}
          >
            LEAVE
          </button>
        </div>
      </div>
      <div className="pt-4 pl-10 w-full overflow-hidden h-full bg-neutral text-xl">
        <Editor socketRef={socketRef} roomId={location.state?.roomId}/>
      </div>
    </div>
  );
};

export default EditorPage;
