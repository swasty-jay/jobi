import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const AppLayout = () => {
  return (
    <div>
      <header className="mb-12">
        <Navbar />
      </header>

      <main>{<Outlet />}</main>

      <footer>footer here</footer>
    </div>
  );
};

export default AppLayout;
