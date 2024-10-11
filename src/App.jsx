import { useContext } from "react";
import "./App.css";
import { DataContext } from "./component/context/context";
import Login from "./component/loginPage/Login";
import Signup from "./component/signUpPage/Signup";
import { SnackbarProvider } from "notistack";
import Navbar from "./component/Navbar/Navbar";
import OneCard from "./component/OneCardDisplay/OneCard";
import { PrimeReactProvider } from "primereact/api";
import BlogDashboard from "./component/blogDashboard/BlogDashboard"

function App() {
  const data = useContext(DataContext);

  return (
    <div>
      <PrimeReactProvider>
        <Navbar />
        <SnackbarProvider>
          {!data.isLoggedIn ? (
            <>{data.userSignup ? <Signup /> : <Login />}</>
          ) : (
            <>{data.oneBlogValue ? <OneCard /> : <BlogDashboard />}</>
          )}
        </SnackbarProvider>
      </PrimeReactProvider>
    </div>
  );
}

export default App;
