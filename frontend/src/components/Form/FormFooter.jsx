import React from "react";
import { useNavigate } from "react-router-dom";

export const FormFooter = React.memo(function FormFooter (props) {
    const navigate = useNavigate();
    const handleclick = () => {
        navigate(`/${props.link}`);
    }
    return <>
        <div className="flex justify-center mt-3">
        <div className="mr-1">
            {props.text}
        </div>
        <div onClick={handleclick} className="cursor-pointer">
            <span className="underline">
            {props.title}
            </span>
        </div>
        </div>
    </>
})