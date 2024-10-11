import { useState, useEffect, useContext } from "react";
import { DataContext } from "../context/context";
import "./blogDashboard.style.css";
import axios from "axios";
import Blog_Card from "../blogCard/Blog_Card";
import EditorBox from "../editor/Editor";
import { enqueueSnackbar } from "notistack";
import API_URL from "../api_url";
        

function BlogDashboard() {
  const data = useContext(DataContext);

  useEffect(() => {
    data.userBlogFunction();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/v1/blog/new`, {
        email: data.email,
        content: data.content,
        title: data.title,
        location: data.location,
      });
      if (res.status === 200) {
        data.userBlogFunction();
        data.setContent("");
        data.setTitle("");
        enqueueSnackbar("Blog Created Successfully", { variant: 'success' })
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetAll = async () => {
    try {
      const res = await axios.get(`${API_URL}/v1/blog/all`);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard">
      {data.openEditor ? (
        <EditorBox />
      ) : (
        <>
          <div>
            <h1>Create a Blog Post</h1>
            <form className="addBlog" onSubmit={(e) => handleSubmit(e)}>
              <input
                className="inputBox"
                value={data.title}
                onChange={(e) => data.setTitle(e.target.value)}
                placeholder="Enter Title"
                required
              />
              <textarea
                className="inputArea"
                value={data.content}
                onChange={(e) => data.setContent(e.target.value)}
                placeholder="Enter Content"
                required
              />
              <button type="submit" className="formbtn">
                {" "}
                Submit{" "}
              </button>
            </form>
            <button onClick={handleGetAll}> Get All BLOG </button>
          </div>
          <div  className="blogDisplay">
            <div>
              <h1>User's Blog</h1>
            </div>
            <div>
              {data.userBlog.length !== 0 ? (
                <div>
                  <Blog_Card blog={data.userBlog} />
                </div>
              ) : (
                <h2>Please create a Blog Post</h2>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default BlogDashboard;
