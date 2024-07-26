import React from "react";

export const Label = React.memo(function Label(props) {
  return (
    <>
      <div>
        {props.label && (
          <label
            htmlFor={props.id}
            className="block my-3 text-sm font-medium text-gray-900"
          >
            {props.label}
          </label>
        )}
      </div>
    </>
  );
});
