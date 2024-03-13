import { io } from "socket.io-client";

export const initSocket = async () => {
  const options = {
    "force new connection": true,
    reconnectionAttempt: 1,
    timeout: 10000,
    transports: ["websocket"],
  };
  console.log(import.meta.env.VITE_SERVER_URL,options)
  return io(import.meta.env.VITE_SERVER_URL,options);
};
