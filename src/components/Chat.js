
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import io from 'socket.io-client';
const socket = io('http://localhost:8080');
// socket.connect();

function Chat() {
    const {user} = useContext(AuthContext)    
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);
 const [author, setAuthor] = useState({});


  useEffect(() => {
      
    setAuthor({
      authorId: user?.id, 
      authorName: user?.name
    })

    socket.on('messages', (msg)=>{
      setChat(msg)
    })

    return () => {
       socket.off('messages');
    };
  }, [msg]);

  const handleSubmit = (e) => {
    
    e.preventDefault();

    if (msg === "") {
      toast("Enter a message.", {
        duration: 4000,
        style: {},
        className: "",
        icon: "⚠️",
        role: "status",
        ariaLive: "polite",
      });
  
    } else {
      socket.emit("new-message", { ...author, msg });
      // setChat([...chat, { ...author, msg }]);
      setMsg("");
    }
  };


  return (
    <div className="flex w-screen main-chat lg:h-screen bg-gray-900 divide-solid">
      <div className="flex w-full lg:w-5/6 lg:h-5/6 lg:mx-auto lg:my-auto shadow-md">
 
        
        <div className="flex flex-col flex-grow lg:max-w-full bg-purple-50">
          {/* Messages */}
          <p className="font-black mt-4 mb-2 pl-4 lg:pl-8 text-2xl">
            Help Chat
          </p>
          <div
            id="msg"
            className="h-5/6 overflow-y-auto pl-4 lg:pl-8 pt-4 mb-2 lg:mb-0"
          >
            <ul className="w-full lg:w-96">
              {chat.map((el, index) =>
              (
                <li
                  key={index}
                  className="w-screen break-words pr-6 lg:pr-0 lg:w-full"
                >
                  {el.authorId === user?.id ? (
                    <p className="text-base font-semibold text-purple-900 rounded py-1">
                       {`${el.authorName}: ${el.msg}`}
                  </p>                 
                  ) : (
                    <p className="text-base font-semibold text-red-900 rounded py-1">
                    { `${el.authorName}: ${el.msg}`}
                    </p>
                  )}
                </li>
              )      
      
              )}

            </ul>
          </div>
          <form className="">
          
            <div className="w-full flex p-4 lg:p-8 bg-purple-50">
              {" "}
              <div className="flex relative w-full lg:w-5/6">
               
                <input
                  type="text"
                  className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-1 lg:px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none"
                  name="message"
                  onChange={(e) => setMsg(e.target.value)}
                  value={msg}
                />
              </div>
              <div className=" w-1/6">
                <button
                  className="ml-8 flex-shrink-0 bg-green-400 text-gray-700 text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2"
                  onClick={(e) => handleSubmit(e)}
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Chat;