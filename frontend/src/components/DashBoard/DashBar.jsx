import axios from "axios";
import { useCallback, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  balanceAtom,
  firstnameAtom,
  lastnameAtom,
  usernameAtom,
} from "../../state/atom";

export function DashBar() {
  const firstname = useRecoilValue(firstnameAtom);
  const lastname = useRecoilValue(lastnameAtom);
  const username = useRecoilValue(usernameAtom);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center">
        <div className="font-bold text-2xl text-gray-800">Paytm App</div>
        <BalanceComponent />
        <div className="flex items-center space-x-4">
          <div className="font-semibold text-xl text-gray-700">
            Hello, {username}
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center text-lg font-semibold">
            {firstname.substring(0, 1).toUpperCase() +
              lastname.substring(0, 1).toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
}

function BalanceComponent() {
  const [balance, setBalance] = useRecoilState(balanceAtom);
  const fetchBalance = useCallback(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}account/balance`,
        {
          headers: {
            Authorization: localStorage.getItem("token") || null,
          },
        }
      );
      setBalance(response.data.balance);
    } catch (error) {
      console.error("Axios Error:", error);
      setBalance("Connection Error");
    }
  }, [setBalance]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return (
    <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
      <div className="font-semibold text-gray-700 mr-2">Your Balance:</div>
      {balance !== null ? (
        <div className="text-xl font-bold text-gray-800">₹{balance}</div>
      ) : (
        <div className="text-xl font-medium text-gray-500">Loading...</div>
      )}
      <button
        onClick={fetchBalance}
        className="ml-2 p-1 rounded-full hover:bg-gray-200 transition duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-5 w-5 text-gray-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </button>
    </div>
  );
}
