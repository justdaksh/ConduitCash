import { useSetRecoilState } from "recoil";
import { SubmitButton } from "../Form/SubmitButton";
import { sendToAtom } from "../../state/atom";
import { useNavigate } from "react-router-dom";
import React from "react";

export const UserComponent = React.memo(function UserComponent({ user, id }) {
  const navigate = useNavigate();
  const setReceiver = useSetRecoilState(sendToAtom);
  const handleClick = () => {
    setReceiver(id);
    navigate("/send");
  };
  return (
    <div className="flex justify-between items-center p-5">
      <div className="flex items-center justify-center">
        <div className="p-2 rounded-full bg-slate-400 mr-3">
          {user.firstname.charAt(0).toUpperCase() +
            user.lastname.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="font-medium text-xl">{user.username}</div>
          <div className="text-md">{user.firstname + " " + user.lastname}</div>
        </div>
      </div>
      <div className="">
        <SubmitButton onClick={handleClick} title="Send Money" />
      </div>
    </div>
  );
});
