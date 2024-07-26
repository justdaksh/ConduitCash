import axios from "axios"
import { SubmitButton } from "./Form/SubmitButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { sendToAtom } from "../state/atom";

async function fetchfriends() {
    try {

        const response =await axios.get("http://localhost:8000/api/v1/user/bulk",{
            headers: {
                Authorization: localStorage.getItem("token") || null }
        });
        return response.data;
    }catch (error) {
        console.error("Cant find token in localStorage",error)
    }
}


export const  FriendComponent = () => {
    const [friends,setfriends]= useState(null);

    useEffect(() => {
        fetchfriends().then(friends => setfriends(friends));
    }, []);
    if (!friends) {
        return <div>Loading...</div>;
    }

    return <>
    <div className="p-5 divide-y divide-solid">
        {friends.users.map((user)=>(
            <UserComponent key={user._id} id={user._id} user={user}/>
        ))} 
    </div>
    </>
}

const UserComponent = ({user,id}) => {
    const navigate = useNavigate();
    const setReceiver = useSetRecoilState(sendToAtom);
    const handleClick = (event) => {
        event.preventDefault();
        setReceiver(id);
        navigate("/send");
    }
    return (
        <div className="flex justify-between items-center p-5">
            <div className="flex items-center justify-center">
                <div className="p-2 rounded-full bg-slate-400 mr-3">
                    {user.firstname.charAt(0).toUpperCase() + user.lastname.charAt(0).toUpperCase()}
                </div>
                <div className="font-medium text-xl">
                    {user.username}
                </div>
            </div>
            <div className="">
                <SubmitButton onClick={handleClick} title="Send Money" />
            </div>
        </div>
    );
}