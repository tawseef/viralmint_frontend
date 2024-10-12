import { useContext, useEffect } from "react";
import "./App.css";
import { DataContext } from "./component/context/context";
import Login from "./component/loginPage/Login";
import Signup from "./component/signUpPage/Signup";
import { SnackbarProvider } from "notistack";
import Navbar from "./component/Navbar/Navbar";
import OneCard from "./component/OneCardDisplay/OneCard";
import { PrimeReactProvider } from "primereact/api";
import BlogDashboard from "./component/blogDashboard/BlogDashboard";
import Homepage from "./component/Homepage/Homepage";

function App() {
  const data = useContext(DataContext);
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      data.setEmail(true);
      data.setOnHomePage(false);
    }
  }, []);

  return (
    <div>
      <PrimeReactProvider>
        <Navbar />
        {data.onHomePage ? (
          <Homepage />
        ) : (
          <SnackbarProvider>
            {!data.isLoggedIn ? (
              <>{data.userSignup ? <Signup /> : <Login />}</>
            ) : (
              <>{data.oneBlogValue ? <OneCard /> : <BlogDashboard />}</>
            )}
          </SnackbarProvider>
        )}
      </PrimeReactProvider>
    </div>
  );
}

export default App;
