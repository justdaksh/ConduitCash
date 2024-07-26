import React, { useState } from "react";
import { Header } from "../Form/Header";
import { SimpleInput } from "../Form/SimpleInput";
import { SubmitButton } from "../Form/SubmitButton";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { sendAmountAtom, sendToAtom } from "../../state/atom";
import { useNavigate } from "react-router-dom";

export const SendMoney = React.memo(function SendMoney() {
  const [sentMoney, setSentMoney] = useState(false);
  const [residualBalance, setResidualBalance] = useState(null);
  const [amount, setAmount] = useRecoilState(sendAmountAtom);

  const to = useRecoilValue(sendToAtom);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const value = event.target.value;
    setAmount(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!amount || parseInt(amount) <= 0) {
      console.error("Invalid amount");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}account/transfer`,
        {
          to: to,
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
      if (error.response && error.response.data) {
        setResidualBalance(error.response.data.message);
      }
    }
  };

  return (
    <>
      <div className="h-lvh flex flex-col items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900">
        <form
          onSubmit={handleSubmit}
          className="rounded-lg shadow-xl shadow-black/50 backdrop-blur-sm p-5 bg-white"
        >
          <div>
            <Header
              title="Send Money"
              desc="Enter amount to send in their account"
            />
          </div>
          <div>
            <SimpleInput
              type="number"
              placeholder="Enter amount"
              id="amount"
              value={amount}
              onChange={handleChange}
            />
          </div>
          <div className="mt-3">
          {sentMoney ? (
            <>
              <SubmitButton title="Sent!" />
              <div className="mt-4 text-sm font-medium text-gray-500">
                Redirecting to dashboard shortly...
              </div>
            </>
          ) : (
            <>
              <SubmitButton title="Initiate Transfer!" />
              {residualBalance !== null && (
                <div className="mt-4 text-sm font-medium text-center text-wrap text-gray-500">
                  {residualBalance}.
                </div>
              )}
            </>
          )}
          </div>
        </form>
      </div>
    </>
  );
});
