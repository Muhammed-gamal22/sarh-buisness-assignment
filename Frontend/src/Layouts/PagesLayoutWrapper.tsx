import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

const PagesLayoutWrapper = () => {
  return (
    <div className="min-h-screen bg-background font-body">
      <Sidebar />
      <main className="mr-64 p-6 lg:p-8 transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
};

export default PagesLayoutWrapper;