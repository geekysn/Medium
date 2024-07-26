import { Link } from "react-router-dom"

interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,
    id: string
}

const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate,
    id
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
        <div className=" p-4 border-b border-slate-200 w-screen max-w-screen-md cursor-pointer">
            <div className="flex items-center">
                <div className="flex flex-col justify-center">
                    <Avatar name={authorName} size={6}/>
                </div>
                <div className=" font-extralight pl-2 pr-2">{authorName}</div>
                <div><Circle/></div>
                <div className=" pl-2 font-thin text-slate-500">
                    {publishedDate}
                </div>
            </div>
            <div className="text-xl font-semibold pt-1">
                {title}
            </div>
            <div className="text-sm font-thin">
                {content.slice(0,150) + (content.length>150 ? ". ..." : ".")}
            </div>
            <div className=" text-slate-500 text-sm font-thin pt-2">
                {`${Math.ceil(content.length/100)} min read`}
            </div>
        </div>
    </Link>
  )
}

export function Circle(){
    return (
        <div className="w-1 h-1 rounded-full bg-slate-500"></div>
    )
}

export function Avatar({name, size = 6}: {name:string, size?: number}){
    return (
        <div>
            <div className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden bg-gray-100 rounded-full p-2`}>
                <span className="font-sm text-gray-600">{name[0]}</span>
            </div>
        </div>
    )
}

export default BlogCard