import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const DataContext = createContext(null);

export const DataProvider = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [email, setEmail] = useState("test@mail.com");
  const [location, setLocation] = useState("");
  const [userBlog, setUserBlog] = useState([]);
  const [userSignup, setUserSignup] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [oneBlog, setOneBlog] = useState([]);
  const [oneBlogValue, setOneBlogValue] = useState(false);
  const [openEditor, setOpenEditor] = useState(false);

  const userBlogFunction = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8082/v1/blog/email/${email}`
      );
      if (res.status === 200) setUserBlog(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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
    getLocation();
  }, []);

  return (
    <DataContext.Provider
      value={{
        openEditor, setOpenEditor,
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
