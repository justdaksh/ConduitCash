import React, { useEffect, useState } from "react";
import axios from "axios";
import { DashBar } from "./DashBar";
import { SearchFriends } from "./SearchFriends";

export const Dashboard = React.memo(function Dashboard() {
  return (
    <>
      <div className="h-lvh p-5 bg-gradient-to-br from-gray-700 to-gray-900">
        <DashBar />
        <SearchFriends />
      </div>
    </>
  );
});

