import LayoutSidebard from "@/layouts/LayoutSidebard";
import { Outlet } from "react-router";

const Dashboard = () => {
  return (
    <LayoutSidebard >
      <Outlet />
    </LayoutSidebard>
  );
};

export default Dashboard;