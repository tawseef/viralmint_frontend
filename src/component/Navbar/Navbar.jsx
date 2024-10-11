import { useContext } from "react";
import "./Navbar.style.css";
import { DataContext } from "../context/context";
import { enqueueSnackbar } from "notistack";

function Navbar() {
  const data = useContext(DataContext);

  const handleLogout = () => {
    data.setEmail(false);
    data.setIsLoggedIn(false);
    localStorage.clear();
    enqueueSnackbar("Logout Successfully", { variant: "success" });
  };

  return (
    <>
      <div className="navDiv">
        <div className="contentNav">The Blog App</div>
        <div>
          <button className="submitBtn logoutBtn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
