import React from "react";
import { SubmitButton } from "../Form/SubmitButton";
import { useNavigate } from "react-router-dom";

export const Logout = React.memo(function Logout() {
    const navigate = useNavigate();
    return(
        <>
        <SubmitButton title="Logout" onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
        }}/>
        </>
    )
});