import React, { useState } from "react";
import { Header } from "../Form/Header";
import { SimpleInput } from "../Form/SimpleInput";
import { SubmitButton } from "../Form/SubmitButton";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  receiverAtom,
  sendAmountAtom,
  sendToAtom,
  usernameAtom,
} from "../../state/atom";
import { useNavigate } from "react-router-dom";

export const SendMoney = React.memo(function SendMoney() {
  const navigate = useNavigate();
  const [sentMoney, setSentMoney] = useState(false);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useRecoilState(sendAmountAtom);

  const receiverId = useRecoilValue(sendToAtom);
  const receiverName = useRecoilValue(receiverAtom);
  const username = useRecoilValue(usernameAtom);

  const handleChange = (event) => {
    const value = event.target.value;
    setAmount(value);
  };
  const validateAmount = (amount) => {
    if (!amount || parseInt(amount) <= 0) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateAmount(amount)) {
      setError("Invalid amount");
      const REDIRECT_DELAY = 2000;

      setTimeout(() => {
        setError("Redirecting to dashboard...");
      }, 1000);

      setTimeout(() => {
        navigate("/dashboard");
      }, REDIRECT_DELAY);

      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}account/transfer`,
        {
          to: receiverId,
          amount: amount,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response.data.success) {
        setSentMoney(true);
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (error) {
      console.error("Transfer failed:", error);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <Header
            title="Send Money"
            desc={`From ${username} to ${receiverName}`}
            className="text-center mb-6"
          />

          <div className="mb-6">
            <SimpleInput
              type="number"
              placeholder="Enter amount"
              id="amount"
              value={amount}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>

          {sentMoney ? (
            <div className="text-center">
              <SubmitButton
                title="Sent!"
                className="w-full py-3 px-6 text-lg font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-300 mb-4"
                disabled
              />
              <div className="text-sm font-medium text-gray-600">
                Redirecting to dashboard shortly...
              </div>
            </div>
          ) : (
            <div>
              <SubmitButton
                title="Initiate Transfer"
                className="w-full py-3 px-6 text-lg font-semibold text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-300 mb-4"
              />
              {error !== null && (
                <div className="mt-4 text-sm font-medium text-center text-gray-600 bg-gray-100 p-3 rounded-lg">
                  {error}
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
});
