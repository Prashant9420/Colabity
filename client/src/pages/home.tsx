import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AnimBg from '../components/animatedBg/AnimBg.tsx'
import { logoutUser } from "../features/user/authSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state: any) => state.auth.user);
  const loading = useSelector((state: any) => state.auth.loading);
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const createNewRoom = (e: any) => {
    e.preventDefault();
    const newId = uuid();
    setRoomId(newId);
    toast.success("New room created");
  };
  const joinRoom = () => {
    try {
      
      if (roomId === "" || username === "") {
        toast.error("Room-ID or Username can't be empty");
        return;
      }
      navigate(`/editor/${roomId}`, {
        state: {
          username,
          roomId,
        },
      });
    } catch (error) {
      toast.error("something went wrong");
    }  
  };

  const handleEnter = (e: any) => {
    if (e.code === "Enter") joinRoom();
  };
  const handleLogout = async () => {
    const res = await dispatch<any>(logoutUser());
    console.log(res);
    if (res.payload?.data.success === true) {
      toast.success("Logged Out!");
      return;
    }
    navigate("/login");
    // toast.error("your Access token has expired! Please login again.");
  };

  useEffect(() => {
    if (localStorage.getItem("justLoggedIn") === "1") {
      toast.success(`Welcome ${user?.user.username}`);
      localStorage.removeItem("justLoggedIn");
    }
    if (location.state?.fromEditor) {
      console.log("from editor", location.pathname);
      // navigate(location.pathname,{ state: { fromEditor: false }})
    }
    setUsername(user?.user.username);
  }, [user]);
  return (
    <div className="flex h-screen items-center justify-center bg-neutral">
      <AnimBg/>
      {(loading) ? (
        <div className=" bg-black bg-opacity-50 fixed w-screen h-screen flex justify-center">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : null}
      <button
        onClick={handleLogout}
        className=" border-none bg-primary fixed right-0 top-0 m-4 font-bold text-base-100 w-20 h-10 rounded-md hover:bg-secondary transition-transform duration-300 ease-in-out active:scale-[0.9]"
      >
        LOGOUT
      </button>
      <div className="relative bg-primary p-[20px] rounded-md w-[500px] max-w-[90%] shadow-lg transition-shadow duration-1000 hover:shadow-secondary">
        <img src="/logo.png" className=" h-32" />
        <h4 className="mb-6 mt-2 font-bold text-base-100">
          Paste invitation ROOM ID
        </h4>
        <div className="flex flex-col">
          <input
            type="text"
            className="bg-neutral p-2 mb-2 outline-none rounded-md text-[white] border-none"
            placeholder="Room-ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            onKeyUp={handleEnter}
          />
          <input
            type="text"
            className="bg-neutral p-2 mb-2 outline-none rounded-md text-[white] border-none"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyUp={handleEnter}
          />
          <button
            onClick={joinRoom}
            className=" border-none bg-base-100 ml-auto font-bold text-primary hover:text-secondary w-20 h-10 rounded-md hover:bg-[#161616] transition-transform duration-300 ease-in-out active:scale-[0.9]"
          >
            JOIN
          </button>
          <span className="ml-auto text-neutral mr-auto mt-3">
            don't have an invite? create a &nbsp;
            <a
              href=""
              onClick={createNewRoom}
              className=" text-neutral border-b-2 border-neutral hover:border-accent hover:text-accent"
            >
              new room
            </a>
          </span>
        </div>
      </div>
      <footer className="fixed bottom-0 text-primary mb-2">
        <h4>
          Built by Prashant Pal &nbsp;
          <a
            href="https://github.com/Prashant9420/Colabity"
            className=" text-secondary border-b-2 border-secondary hover:text-accent hover:border-accent"
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
