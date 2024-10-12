import React, { useContext } from "react";
import "./Homepage.style.css";
import { DataContext } from "../context/context";

function Homepage() {
  const data = useContext(DataContext);

  return (
    <div className="homepage">
      <div>
        <button
          className="homeButton"
          onClick={() => data.setOnHomePage(false)}
        >
          {" "}
          Create Your Blog{" "}
        </button>
      </div>
      <div>
        {data.allBlogs.length !== 0 ? (
          <>
            <div className="allTitle">All Users Blogs</div>
            {data.allBlogs.map((item, ind) => {
              return (
                <div className="homepageTitle" key={ind}>
                  {item.title}
                </div>
              );
            })}
          </>
        ) : (
          <>Login And Create Blog Post</>
        )}
      </div>
    </div>
  );
}

export default Homepage;
