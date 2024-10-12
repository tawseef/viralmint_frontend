import { useContext } from "react";
import "./Navbar.style.css";
import { DataContext } from "../context/context";
import { enqueueSnackbar } from "notistack";

function Navbar() {
  const data = useContext(DataContext);

  const handleLogout = () => {
    localStorage.clear();
    data.setEmail(false);
    data.setIsLoggedIn(false);
    enqueueSnackbar("Logout Successfully", { variant: "success" });
  };

  return (
    <>
      <div className="navDiv">
        <div className="contentNav">The Blog App</div>
        <div>
          {data.email ? (
            <button className="submitBtn logoutBtn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            false
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
