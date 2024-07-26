import axios from "axios";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { balanceAtom, tokenAtom, userNameSelector } from "../state/atom";

export function DashBar() {
  const [balance, setBalance] = useRecoilState(balanceAtom);
  const token = useRecoilValue(tokenAtom);
  const username = useRecoilValue(userNameSelector);

  useEffect(() => {
    if (token) {
      fetchBalance(token).then((bal) => setBalance(bal));
    }
  }, [token, setBalance]);

  return (
    <>
      <div className="flex justify-between items-center p-5 rounded-lg shadow-xl shadow-black/50 backdrop-blur-sm bg-white">
        <div className="font-bold text-2xl">Paytm App</div>
        <div className="items-center">
          {balance !== null ? (
            <BalanceComponent />
          ) : (
            <div>Loading balance...</div>
          )}
        </div>
        <div className="flex justify-between items-center">
          <div className="font-semibold text-xl mr-3">Hello, {username}</div>
          <div className="p-3 rounded-full bg-slate-400">
            {username.substring(0, 2).toUpperCase()}
          </div>
        </div>
      </div>
    </>
  );
}

function BalanceComponent() {
  const balance = useRecoilValue(balanceAtom);
  return (
    <>
      <div className="flex">
        <div className="font-bold text-xl mr-1">Your Balance :</div>
        <div className="text-xl font font-medium">{balance}</div>
      </div>
    </>
  );
}

async function fetchBalance() {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/v1/account/balance",
      {
        headers: {
            Authorization: localStorage.getItem("token") || null ,
        },
      }
    );
    return response.data.balance;
  } catch (error) {
    console.error("Axios Error:", error);
    return "Connection Error";
  }
}
