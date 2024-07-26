import { UserComponent } from "./UserComponent";

export const SearchComponent = ({ filter }) => {
  return (
    <>
      <div className="p-5 divide-y divide-solid">
        {filter == null || filter.length === 0 ? (
          <>
            <div className="flex items-center justify-center mt-10">
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
                  d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                />
              </svg>

              <div className="text-lg">No user found</div>
            </div>
          </>
        ) : (
          filter.map((user) => (
            <UserComponent key={user._id} id={user._id} user={user} />
          ))
        )}
      </div>
    </>
  );
};
