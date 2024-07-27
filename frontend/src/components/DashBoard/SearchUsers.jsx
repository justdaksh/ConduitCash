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
      `${import.meta.env.VITE_API_BASE_URL}user/bulk?filter=${Query}`,
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
    <div className="bg-white rounded-xl shadow-lg p-6">
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h2 className="font-bold text-2xl text-gray-800 mb-4 md:mb-0">Search Users</h2>
          <div className="flex w-full md:w-auto">
            <div className="flex-grow mr-2">
            <SimpleInput
              placeholder="Enter username"
              id="friends"
              onChange={handleChange}
            />
            </div>
            <SubmitButton 
              title="Search" 
              className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition duration-300"
            />
          </div>
        </div>
      </form>
      {!isLoading && <SearchComponent filter={filter} />}
    </div>
  );
});
