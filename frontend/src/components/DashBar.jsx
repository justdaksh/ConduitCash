import axios from "axios";
import { useCallback, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { balanceAtom, firstnameAtom, lastnameAtom, usernameAtom } from "../state/atom";

export function DashBar() {
    const firstname = useRecoilValue(firstnameAtom);
    const lastname = useRecoilValue(lastnameAtom);
    const username = useRecoilValue(usernameAtom);

  return (
    <>
      <div className="flex justify-between items-center p-5 rounded-lg shadow-xl shadow-black/50 backdrop-blur-sm bg-white">
        <div className="font-bold text-2xl">Paytm App</div>
        <div className="items-center">
          <BalanceComponent />
        </div>
        <div className="flex justify-between items-center">
          <div className="font-semibold text-xl mr-3">Hello, {username}</div>
          <div className="p-3 rounded-full bg-slate-400">
            {firstname.substring(0,1).toUpperCase() + lastname.substring(0,1).toUpperCase()}
          </div>
        </div>
      </div>
    </>
  );
}

function BalanceComponent() {
  const [balance, setBalance] = useRecoilState(balanceAtom);
  const fetchBalance = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/account/balance",
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
    <>
      <div className="flex items-center">
        <div className="font-bold text-xl mr-1">Your Balance :</div>
        {balance !== null ? (
          <div className="text-xl font font-medium">{balance}</div>
        ) : (
          <div className="text-xl font font-medium">Loading...</div>
        )}
        <div
          className="ml-2 hover:bg-green-200 rounded-full"
          onClick={fetchBalance}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
