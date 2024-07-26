import React from "react";
import { SimpleInput } from "./Form/SimpleInput";
import { FriendComponent } from "./FriendComponent";

export const SearchFriends = React.memo(function SearchFriends() {
  return (
    <>
      <div className="flex flex-col p-5 mt-24 rounded-lg shadow-xl shadow-black/50 backdrop-blur-sm bg-white">
        <div className="font-bold text-xl">Search Users</div>
        <div>
            <SimpleInput label="" id="friends" />
        </div>
        <div>
            <FriendComponent/>
        </div>
      </div>
    </>
  );
});
