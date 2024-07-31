import React, { useEffect, useState } from "react";
import { SimpleInput } from "../Form/SimpleInput";
import { SearchComponent } from "./SearchComponent";
import useSWR from "swr";
import { fetcher } from "../../helpers/fetcher";
import zod from "zod";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const querySchema = zod
  .string()
  .regex(/^[a-zA-Z0-9]*$/, "Only numbers or alphabets are allowed");

export const SearchUsers = React.memo(function SearchUsers() {
  const [query, setQuery] = useState("");
  const [isError, setIsError] = useState(null);
  const [filter, setFilter] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    try {
      querySchema.parse(value);
      setQuery(value);
      setIsError(null);
    } catch (e) {
      setIsError(e.errors[0].message);
    }
  };

  let { data, error, isValidating } = useSWR(
    query
      ? `${import.meta.env.VITE_API_BASE_URL}user/bulk?filter=${query}`
      : `${import.meta.env.VITE_API_BASE_URL}user/bulk`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setFilter(data.users);
    }
    if (error) {
      setIsError(error.message);
    }
  }, [data, error]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setQuery("");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h2 className="font-bold text-2xl text-gray-800 mb-4 md:mb-0">
            Search Users
          </h2>
          {isError && <div className="text-red-500 text-center">{isError}</div>}
          <div className="flex w-full md:w-auto">
            <div className="flex-grow mr-2">
              <SimpleInput
                placeholder="Enter username"
                id="friends"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </form>
      {!isValidating ? (<SearchComponent filter={filter} />):(<Skeleton height={45} />)}
    </div>
  );
});
