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
    <div className="flex flex-col sm:flex-row sm:justify-between items-center py-4 sm:w-full">
      <div className="flex items-center sm:justify-between w-full sm:w-9/12">
        <div className="w-12 h-10 sm:w-13 sm:h-11 rounded-full bg-gray-800 text-white flex items-center justify-center text-sm sm:text-lg font-semibold mr-4">
          {user.firstname.charAt(0).toUpperCase() + user.lastname.charAt(0).toUpperCase()}
        </div>           
        <div className="flex flex-row sm:flex-col w-full sm:w-11/12 justify-between items-center sm:justify-end">
          <div className="text-left sm:w-full font-semibold text-lg text-gray-800">{user.username}</div>
          <div className="text-right sm:w-full sm:text-left text-md text-gray-600">{user.firstname + " " + user.lastname}</div>
        </div>
      </div>
      <div className="w-full sm:w-3/12 pt-2">
        <SubmitButton onClick={handleClick} title="Send Money" />
      </div>
    </div>
  );
});
