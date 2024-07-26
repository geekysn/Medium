import { Blog } from "../hooks"
import AppBar from "./AppBar"
import { Avatar } from "./BlogCard";

const FullBlog = ({blog}:{blog:Blog}) => {
  return (
    <div>
        <AppBar/>
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-24 w-full pt-12 max-w-screen-xl">
                <div className="col-span-8">
                    <div className="text-3xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Post on 2nd December 2023
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4">
                    Author
                    <div className="flex">
                        <div className="flex justify-center items-center ml-1"><Avatar name={blog.author.name === null ? "Anonymous" : blog.author.name} size={8}/></div>
                        <div className="ml-3">
                            <div className="text-xl font-bold">
                                {capitalizeFirstLetter(blog.author.name || "Anonymous") }
                            </div>
                            <div className="text-slate-500">
                                Random Catch phrase
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default FullBlog