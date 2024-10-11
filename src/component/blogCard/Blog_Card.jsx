import { useContext } from "react";
import { DataContext } from "../context/context";
import axios from "axios";
import "./Blog_Card.style.css";
import DeleteIcon from "../../assets/Delete.svg";
import SearchIcon from "../../assets/Search.svg";
import EditIcon from "../../assets/Edit.svg";
import { enqueueSnackbar } from "notistack";

function Blog_Card(data) {
  const context = useContext(DataContext);

  const handleDeleteThisBlog = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8082/v1/blog/id/${id}`, {
        data: {
          email: context.email,
        },
      });
      if (res.status === 202) {
        context.userBlogFunction();
        enqueueSnackbar("Blog Deleted", { variant: "success" });
      } else {
        enqueueSnackbar("Internal Error", { variant: "error" });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Internal Error", { variant: "error" });
    }
  };

  const truncateContent = (content, maxLength = 100) => {
    return content.length > maxLength
      ? content.substring(0, maxLength) + "..."
      : content;
  };

  const handleViewCard = (item) => {
    context.setOneBlogValue(true);
    context.setOneBlog(item);
  };

  const handleEdit = (item) => {
    context.setOpenEditor(true);
    context.setOneBlog(item);
  };

  return (
    <div className="cardWrapper">
      {data.blog.length > 0
        ? data.blog.map((ele, ind) => (
            <div key={ind} className="cardContainer">
              <div className="flex-between">
                <div className="cardTitle">{ele.title.toUpperCase()}</div>
                <div>
                  <img
                    onClick={() => handleEdit(ele)}
                    className="expandImg"
                    alt="not found"
                    src={EditIcon}
                  />
                  <img
                    onClick={() => handleViewCard(ele)}
                    className="expandImg"
                    alt="dc"
                    src={SearchIcon}
                  />
                  <img
                    onClick={() => handleDeleteThisBlog(ele._id)}
                    alt="not found"
                    src={DeleteIcon}
                  />
                </div>
              </div>
              <hr />
              <div className="cardContent">
                {truncateContent(ele.content, 150)}
              </div>
            </div>
          ))
        : false}
    </div>
  );
}

export default Blog_Card;
