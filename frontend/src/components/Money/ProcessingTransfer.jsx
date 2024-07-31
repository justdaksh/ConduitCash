import React from "react";
import { SubmitButton } from "../Form/SubmitButton";

export const ProcessingTransfer = React.memo(function ProcessingTransfer({
  sentMoney,
  receiverName,
  isTransferring,
  error,
  amount,
}) {
  return (
    <>
      {sentMoney ? (
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4">
            <svg
              className="w-full h-full text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-700 mb-2">
            Payment Successful!
          </h2>
          <p className="text-green-600 mb-4">{`₹${amount} sent to ${receiverName}`}</p>
          <div className="text-sm font-medium text-green-600 mt-4">
            Redirecting to dashboard shortly...
          </div>
        </div>
      ) : isTransferring ? (
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your transfer...</p>
        </div>
      ) : (
        <div>
          <SubmitButton title="Initiate Transfer" />
          {error !== null && (
            <div className="mt-4 text-sm font-medium text-center text-gray-600 bg-gray-100 p-3 rounded-lg">
              {error}
            </div>
          )}
        </div>
      )}
    </>
  );
});
