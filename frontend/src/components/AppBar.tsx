import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

const AppBar = () => {
  return (
    <div className="border-b flex justify-between px-10 py-4">
        <Link to={'/'}>
            <div className="text-3xl font-bold flex flex-col justify-center cursor-pointer">
                Medium
            </div>
        </Link>
        <div className="flex">
            <Link to={"/publish"}>
                <button className="mr-8 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-200">
                    <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                    Write
                    </span>
                </button>
            </Link>
            <Avatar name="Snehil" size={10}/>
        </div>
    </div>
  )
}

export default AppBar