import React from "react";
import { useNavigate } from "react-router-dom";

export const FormFooter = React.memo(function FormFooter (props) {
    const navigate = useNavigate();
    const handleclick = () => {
        navigate(`/${props.link}`);
    }
    return <>
        <div className="mt-6 text-center">
        <p className="text-gray-600">
          {props.text} {" "}
          <button 
            onClick={handleclick}
            className="text-gray-800 font-semibold hover:underline focus:outline-none"
          >
            {props.title}
          </button>
        </p>
        </div>
    </>
})