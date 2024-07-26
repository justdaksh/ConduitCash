import React from "react";
import { DashBar } from "./DashBar";
import { SearchUsers } from "./SearchUsers";

export const Dashboard = React.memo(function Dashboard() {
  return (
    <>
      <div className="h-lvh p-5 bg-gradient-to-br from-gray-700 to-gray-900">
        <DashBar />
        <SearchUsers />
      </div>
    </>
  );
});
