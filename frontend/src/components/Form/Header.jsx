
import React from "react";


export const Header = React.memo(function Header (props) {
    return <>
    <div className="flex flex-col content-center justify-center mx-auto mb-5 w-5/6 sm:mb-8">
        <div className="font-bold text-2xl text-center">
            {props.title}
        </div>
        <div className="text-center text-gray-500">
            {props.desc}
        </div>
    </div>
    </>
})