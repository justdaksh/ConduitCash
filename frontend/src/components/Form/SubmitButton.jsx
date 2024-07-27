
import React from "react";

export const SubmitButton = React.memo(function SubmitButton ({ title, onClick, type = "submit" }) {
    return <>
    <div className="">
        <button
          onClick={onClick}
          type={type}
          className="text-white bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center  hover:bg-gray-700 transition duration-300"
        >
        {title}
        </button>
    </div>
    </>
})