import { SignupInput } from "@saurabhthedev/medium-common"
import axios from "axios"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"


const Auth = ({type}: {type: "signup" | "signin"}) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name:"",
        email:"",
        password:""
    })
    async function sendRequest(){
        try {
            const res = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup": "signin"}`,postInputs);
            const jwt = res.data.token;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch (error) {
            alert("Error while signing up");
        }
    }
    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>

                    <div className="px-10 mb-4">
                        <div className=" text-3xl font-bold ">
                            { type === "signup" ? "Create your account" : "Log In to your account"}
                        </div>
                        <div className=" text-slate-500">
                            {type === "signup" ? "Already have an account?": "Don't have an account?"}
                                <Link className="pl-2 underline" to={ type === "signup" ? "/signin": "/signup"}>
                                    {type === "signup" ? "Log In" : "Sign Up"}
                                </Link>
                                                            
                        </div>
                    </div>
                    <div>
                        {type === "signup" ? <LabeledInput label="Name" placeholder="Enter your name..." onchange={(e)=>{
                            setPostInputs(c =>({
                                ...c, 
                                name:e.target.value
                            }))
                        }}/> : null}
                        <LabeledInput label="username" placeholder="Enter your username..." onchange={(e)=>{
                            setPostInputs(c =>({
                                ...c, 
                                email:e.target.value
                            }))
                        }}/>
                        <LabeledInput label="password" placeholder="Enter your password..." type="password" onchange={(e)=>{
                            setPostInputs(c =>({
                                ...c, 
                                password:e.target.value
                            }))
                        }}/>
                        <br />
                        <button onClick={sendRequest} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign Up": "Sign In"}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface LabeledInputType{
    label: string,
    placeholder: string,
    type?: string,
    onchange: (e: ChangeEvent<HTMLInputElement>)=>void
}

function LabeledInput({label, placeholder, onchange, type}: LabeledInputType){
    return(
        <div>
            <label className="block mb-2 text-sm font-semibold text-gray-900 mt-4 ">{label}</label>
            <input onChange={onchange} type={type || "text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
    )
}

export default Auth