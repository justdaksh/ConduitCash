import { useRecoilValue } from "recoil";
import { firstnameAtom, lastnameAtom, usernameAtom } from "../../state/atom";
import { BalanceComponent } from "./BalanceComponent";
import { Logout } from "../Auth/Logout";

export function DashBar() {
  const firstname = useRecoilValue(firstnameAtom);
  const lastname = useRecoilValue(lastnameAtom);
  const username = useRecoilValue(usernameAtom);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center">
        <div className="hidden md:block font-bold text-2xl text-gray-800">
          ConduitCash
        </div>
        <div className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
        </div>
        <div className="flex-1 flex justify-center">
          <BalanceComponent />
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:block font-semibold text-xl text-gray-700">
            Hello, {username}
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center text-lg font-semibold">
            {firstname.substring(0, 1).toUpperCase() +
              lastname.substring(0, 1).toUpperCase()}
          </div>
          <div>
            <Logout />
          </div>
        </div>
      </div>
    </div>
  );
}
