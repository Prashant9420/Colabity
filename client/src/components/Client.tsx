import { useState } from "react";
import Avatar from "react-avatar";
const Client = ({ username,avatar }: any) => {
  const [userCss, setUserCss] = useState("font-bold");
  console.log(avatar)
  return (
    <div
      className="m-2 flex flex-col items-center justify-center"
      onMouseEnter={() => setUserCss("font-bold text-secondary")}
      onMouseLeave={() => setUserCss("font-bold")}
    >
      {(!avatar)?<Avatar name={username} round="14px" size="70" />:
      <Avatar src={avatar} round="14px" textSizeRatio={3} size="70" unstyled={false} />}
      <span className={userCss}>
        {(username.at(0).toUpperCase() + username.slice(1)).split(" ")[0]}
      </span>
    </div>
  );
};

export default Client;
