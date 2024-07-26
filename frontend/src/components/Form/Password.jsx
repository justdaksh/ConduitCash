import React from "react";
import { Label } from "./Label";

export const Password = React.memo(function Password(props) {
  const InputStyle =
    "bg-gray-100 text-gray-900 placeholder-gray-400 border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-sm rounded-lg block px-5 py-2.5";

  return (
    <>
      <Label label={props.label} id={props.id} />
      <input
        type="password"
        id={props.id}
        className={InputStyle}
        onChange={props.onChange}
        required
      />
    </>
  );
});
