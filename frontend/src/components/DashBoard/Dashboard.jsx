import React from "react";
import { DashBar } from "./DashBar";
import { SearchUsers } from "./SearchUsers";

export const Dashboard = React.memo(function Dashboard() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="max-w-7xl mx-auto space-y-6">
        <DashBar />
        <SearchUsers />
      </div>
    </div>
  );
});
