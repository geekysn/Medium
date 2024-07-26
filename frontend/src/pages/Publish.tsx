import axios from "axios";
import AppBar from "../components/AppBar";
import { BACKEND_URL } from "../config";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const Publish = () => {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");

    return (
        <div>
            <AppBar/>
            <div className="flex justify-center">
                <div className="max-w-screen-lg w-full mt-16">
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Title"
                    />
                    <TextEditor
                        title={title}
                        content={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}

interface TextEditorProps {
    title: string;
    content: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextEditor = ({ title, content, onChange }: TextEditorProps) => {
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const res = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content,
            },{
                headers:{
                    Authorization: localStorage.getItem("token")
                }
            });
            alert("Blog posted successfully!");
            navigate(`/blog/${res.data.id}`)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert("Error posting blog: " + error.message);
            } else {
                alert("An unexpected error occurred.");
            }
        }
    };

    return (
        <div>
            <textarea
                id="message"
                onChange={onChange}
                value={content}
                rows={4}
                className="mt-10 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your thoughts here..."
            ></textarea>
            <button
                onClick={handleSubmit}
                type="submit"
                className="mt-12 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
            >
                Post Blog
            </button>
        </div>
    );
}

export default Publish;
