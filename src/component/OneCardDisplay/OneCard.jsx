import { useContext } from "react"
import "./OneCard.style.css"
import { DataContext } from "../context/context"

        

function OneCard() {
    const context = useContext(DataContext)
    console.log(context.oneBlog)

    const handleBack=()=>{
        context.setOneBlogValue(false)
        context.setBlogValue([])
    }

  return (
    <div> 
    <div onClick={handleBack} className="backDiv">Back</div>
      <div className="oneCardDisplayDiv">
        <div className="oneCardTitle">
          {context.oneBlog.title}
          </div>
        <div className="oneCardContent">
          {context.oneBlog.content}
          </div>
        </div>
        
    </div>
  )
}

export default OneCard