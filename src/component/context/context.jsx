import { createContext, useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../api_url";

export const DataContext = createContext(null);

export const DataProvider = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [userBlog, setUserBlog] = useState([]);
  const [userSignup, setUserSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [oneBlog, setOneBlog] = useState([]);
  const [oneBlogValue, setOneBlogValue] = useState(false);
  const [openEditor, setOpenEditor] = useState(false);
  const [allBlogs, setAllBlogs] = useState([]);
  const [onHomePage, setOnHomePage] = useState(true);

  const userBlogFunction = async () => {
    try {
      const res = await axios.get(`${API_URL}/v1/blog/email/${email}`);
      if (res.status === 200) setUserBlog(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const allBlogFunction = async () => {
    try {
      const res = await axios.get(`${API_URL}/v1/blog/all`);
      console.log(res.data);
      if (res.status === 200) setAllBlogs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setEmail(true);
      setOnHomePage(false);
    }
    const getLocation = async () => {
      try {
        const response = await axios.get("https://api.ipgeolocation.io/ipgeo", {
          params: {
            apiKey: "1a306612106b470b8bf0b705ba5e28b1",
          },
        });
        if (response.data.ip)
          setLocation(response.data.country_name.toLowerCase());
      } catch (error) {
        console.log(error);
      }
    };
    allBlogFunction();
    getLocation();
  }, []);

  return (
    <DataContext.Provider
      value={{
        onHomePage,
        setOnHomePage,
        allBlogs,
        setAllBlogs,
        openEditor,
        setOpenEditor,
        oneBlog,
        setOneBlog,
        oneBlogValue,
        setOneBlogValue,
        userSignup,
        setUserSignup,
        userBlogFunction,
        isLoggedIn,
        setIsLoggedIn,
        title,
        setTitle,
        content,
        setContent,
        email,
        setEmail,
        location,
        setLocation,
        userBlog,
        setUserBlog,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
