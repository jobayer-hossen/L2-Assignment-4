import { Outlet } from "react-router";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
