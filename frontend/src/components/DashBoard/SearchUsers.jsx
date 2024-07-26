import React, { useState } from "react";
import { SimpleInput } from "../Form/SimpleInput";
import { SearchComponent } from "./SearchComponent";
import { SubmitButton } from "../Form/SubmitButton";
import axios from "axios";

export const SearchUsers = React.memo(function SearchUsers() {
  const [Query, setIsQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const handleChange = (event) => {
    const { value } = event.target;
    setIsQuery(value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.get(
      `http://localhost:8000/api/v1/user/bulk?filter=${Query}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    setFilter(response.data.users);
    setIsLoading(false);
  };
  return (
    <>
      <div className="flex flex-col p-5 mt-24 rounded-lg shadow-xl shadow-black/50 backdrop-blur-sm bg-white">
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center"
        >
          <div className="font-bold text-2xl">Search Users</div>
          <div className="ml-5">
            <SimpleInput
              style="filterStyle"
              placeholder="Enter username"
              id="friends"
              onChange={handleChange}
            />
          </div>
          <div className=" ml-2">
            <SubmitButton title="Go" />
          </div>
        </form>
        <div>{!isLoading && <SearchComponent filter={filter} />}</div>
      </div>
    </>
  );
});
