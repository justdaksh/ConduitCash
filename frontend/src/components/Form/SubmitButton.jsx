
import React from "react";

export const SubmitButton = React.memo(function SubmitButton (props) {
    return <>
    <div className="">
        <button
          type="submit"
          className="text-white bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
        >
        {props.title}
        </button>
    </div>
    </>
})