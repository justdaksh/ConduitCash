import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import useSWR, { mutate } from "swr";
import { balanceAtom } from "../../state/atom";
import { fetcher } from "../../helpers/fetcher";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

  
 export const BalanceComponent = React.memo(function BalanceComponent() {
    const [balance, setBalance] = useRecoilState(balanceAtom);
    const { data, error } = useSWR(`${import.meta.env.VITE_API_BASE_URL}account/balance`, fetcher);
  
    useEffect(() => {
      if (data) {
        setBalance(data.balance);
      } else if (error) {
        console.error("SWR Error:", error);
        setBalance("Connection Error");
      }
    }, [data, error, setBalance]);
  
    const refreshBalance = () => {
      mutate();
    };
  
    return (
      <div className="flex flex-col sm:flex-row items-center bg-gray-100 rounded-lg px-4 py-2 w-full sm:w-auto my-4 sm:my-0">
          <div className="font-semibold text-gray-700 mr-2">Your Balance:</div>
          <div className="flex justify-center">
        {balance !== null ? (
                <div className="text-xl font-bold text-gray-800">₹{balance}</div>
            ) : (
                <Skeleton />
            )}
        <button
          onClick={refreshBalance}
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
      </div>
    );
  });
  