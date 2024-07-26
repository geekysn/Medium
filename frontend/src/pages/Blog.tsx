import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import FullBlog from "../components/FullBlog";

function Blog() {
  const { id } = useParams()
  const {loading, blog} = useBlog({
    id: String(id)
  });
  if (loading) {
    return <div>
      <div className='flex space-x-2 justify-center items-center bg-white h-screen'>
        <span className='sr-only'>Loading...</span>
        <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
        <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
        <div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
      </div>
    </div>
  }
  //@ts-ignore
  return <FullBlog blog={blog}/>
}

export default Blog