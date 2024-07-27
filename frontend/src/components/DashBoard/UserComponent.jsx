import { useSetRecoilState } from "recoil";
import { SubmitButton } from "../Form/SubmitButton";
import { receiverAtom, sendToAtom } from "../../state/atom";
import { useNavigate } from "react-router-dom";
import React from "react";

export const UserComponent = React.memo(function UserComponent({ user, id }) {
  const navigate = useNavigate();
  const setReceivername = useSetRecoilState(receiverAtom);
  const setReceiver = useSetRecoilState(sendToAtom);
  const handleClick = () => {
    setReceiver(id);
    setReceivername(user.username);
    navigate("/send");
  };
  return (
    <div className="flex justify-between items-center py-4">
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-gray-800 text-white flex items-center justify-center text-lg font-semibold mr-4">
          {user.firstname.charAt(0).toUpperCase() + user.lastname.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="font-medium text-lg text-gray-800">{user.username}</div>
          <div className="text-sm text-gray-600">{user.firstname + " " + user.lastname}</div>
        </div>
      </div>
      <div>
        <SubmitButton onClick={handleClick} title="Send Money" />
      </div>
    </div>
  );
});
