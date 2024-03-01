import React from "react";
import DropZone from "@/components/DropZone";

import { auth } from "@clerk/nextjs";
import DashBoardComponent from "@/components/DashBoardComponent";

const Dashboard = () => {
  const { userId } = auth();

  return (
    <div>
      <DropZone />
      <DashBoardComponent userId={userId} />
    </div>
  );
};

export default Dashboard;
