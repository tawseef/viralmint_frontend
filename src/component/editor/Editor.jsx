import React, { useContext, useState } from "react";
import { Editor } from "primereact/editor";
import { DataContext } from "../context/context";
import "./Editor.style.css";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import API_URL from "../api_url";

const EditorBox = () => {
  const [text, setText] = useState("");
  const data = useContext(DataContext);
  console.log(text);

  const renderHeader = () => {
    return (
      <span className="ql-formats">
        <button className="ql-bold" aria-label="Bold"></button>
        <button className="ql-italic" aria-label="Italic"></button>
        <button className="ql-underline" aria-label="Underline"></button>
      </span>
    );
  };

  const header = renderHeader();

  
  const handleUpdateBlog = async (id) => {
    try {
      const res = await axios.put(`${API_URL}/v1/blog/id/${id}`, {
        email: data.email,
        content: text,
      });
      if(res.status===200){
        enqueueSnackbar("Content Updated", { variant: 'success' })
        data.userBlogFunction()
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  const handleEdit = () => {
    if(text.trim().length>0){
      data.setOpenEditor(false)
      handleUpdateBlog(data.oneBlog._id)
    }
  }

  const handleBack = () => {
    data.setOpenEditor(false)
    data.setOneBlog([])
  }

  return (
    <div className="editCard">
      <h1>Edit Content</h1>
      <Editor
      // className="editor"
        value={data.oneBlog.content}
        onTextChange={(e) => setText(e.htmlValue)}
        style={{ height: "320px" }}
        headerTemplate={header}
      />
      <div className="btns">
      <div className="backDiv btn" onClick={handleBack}>Back</div>
      <div className="backDiv savebtn" onClick={handleEdit}>Save Content</div>

      </div>
    </div>
  );
};

export default EditorBox;
