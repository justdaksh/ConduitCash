import { useRecoilValue } from "recoil";
import { UserComponent } from "./UserComponent";
import { usernameAtom } from "../../state/atom";

export const SearchComponent = ({ filter }) => {
  const username = useRecoilValue(usernameAtom);
  return (
    <div className="divide-y divide-gray-200">
      {filter == null || filter.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-12 w-12 mb-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
          <div className="text-lg font-medium">No users found</div>
          <div className="text-sm mt-2">Try a different search term</div>
        </div>
      ) : (
        filter
          .filter((user) => user.username !== username)
          .map((user) => (
            <UserComponent key={user._id} id={user._id} user={user} />
          ))
      )}
    </div>
  );
};
