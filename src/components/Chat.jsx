
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { socket } from "../utils/socket";


function Chat() {
  const { user } = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [author, setAuthor] = useState({});
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [newMsg, setNewMsg] = useState();
  const [msg, setMsg] = useState("");
  const [userFiltered, setUserFiltered] = useState("");

  useEffect(() => {
    if (user) {
      setIsAdmin(user?.role ? true : false) 

      setAuthor({
        authorId: user?.id,
        authorName: user?.name
      })
      
   
      if (user?.role === 'admin') {

        socket.on("user connected", (user) => {
         if (user.username.authorName !== 'Admin') setUsers(users => users?.concat(user));
        });
  
        socket.on("users", (users) => {
          users.forEach((user) => {
            if (user.username.authorName !== 'Admin') setUsers(users => users?.concat(user));
          });
        });
      } else {
        socket.on("user connected", (user) => {
          if (user.username.authorName === 'Admin') setUsers(users => users?.concat(user));
          setSelectedUser({userId: user.userId, userName:'Ecotienda'})
         });
   
        socket.on("users", (users) => {
          users.forEach((user) => {
            if (user.username.authorName === 'Admin') {
              setUsers(users => users?.concat(user))
              setSelectedUser({userId: user.userId, userName:'Ecotienda'})
            };
          });
        });
      }

      socket.on("private-message", ({ msg, from }) => {
        for (let i = 0; i < users.length; i++) {
          const user = users[i];
          if (user.userId ===  from) {
            user.messages.push({
              msg,
              fromSelf: false
            });
          }
        }
        setNewMsg(msg)
      });

      
    socket.on("user-disconnected", ({userId}) => {
      const newUsers = users.filter(user => user.userId !==userId)
      setUsers(newUsers)
      });

    } 

    return () => {
      socket.off('private-message');
      socket.off('users');
    };
  }, [ user , userFiltered]);


  useEffect(() => {
    let [current] = users.filter(user => user.userId === selectedUser?.userId)
    setUserFiltered(current)
  }, [newMsg, selectedUser ])
  



  const handleOpenChat = () => {
    setIsOpen(true)
    socket.auth = { author };
    socket.connect();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (msg === "") {
      alert("Ingrese un mensaje para enviar")
    } else if(!selectedUser ){
      user?.role === 'admin'&& alert("seleccione conversación! ")
      user?.role !== 'admin'&& alert("ahora no hay nadie en línea! ")
     } else {
      socket.emit("private-message", {  msg,  to: selectedUser?.userId}); 
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (user.userId ===  selectedUser.userId) {
          user.messages.push({
            msg,
            fromSelf: true,
          });
        }
      }
      // let [current] = users.filter(user => user.userId === selectedUser?.userId)
      // setUserFiltered(current)
      setMsg('')
    }
  };

  
  return (
    
    <>
    {!isOpen ?
      <button className="fixed bottom-0 right-0 m-6 w-10 h-10 bg-gray-800 hover:bg-gray-500 rounded-full p-2" type="button" onClick={handleOpenChat}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </button>
      :
      <div className="fixed bottom-0 right-0 m-6">
        <div className="w-80 h-96 flex flex-col border shadow-md bg-white">
          <div className="flex items-center justify-between border-b p-2">
            {/* <!-- user info --> */}
            {isAdmin ?
              (
                <div className="pl-2">
                  <select name="select"  
                  onChange={(e)=>{
                    const selectedUser = JSON.parse(e.target.value)
                    setSelectedUser(selectedUser)}} 
                    defaultValue="1">
                    <option value="1" disabled >Seleccione una conversación</option>
                    {users.map(user =>
                      (<option 
                        key={user.userId}
                        value={JSON.stringify({userId: user.userId, userName:user.username?.authorName})}
                        >
                          {user.username?.authorName}
                        </option>)
                    )}
                  </select>
                  <div className="flex items-center">
                    {users.length > 0 ?
                      (<>
                        <div className="rounded-full m-1 bg-green-500 h-2 w-2" />
                        <div className="text-xs text-gray-600">Usuarios conectados</div>
                      </>)
                      :
                      (<>
                        <div className="rounded-full m-1 bg-red-500 h-2 w-2" />
                        <div className="text-xs text-gray-600">No hay usuarios conectados </div>
                      </>)
                    }

                  </div>
                </div>
              )
              :
              (
                <div className="pl-2 flex items-center">
                  <div className={`rounded-full m-1 ${users.length > 0 ? 'bg-green-500' : 'bg-red-500'} h-2 w-2`} />
                  <p className="font-semibold">Centro de ayuda </p>
                </div>
              )
            }
            {/* <!-- end user info --> */}
            {/* <!-- chat box action --> */}
            <div>
              <button className="inline-flex hover:bg-indigo-50 rounded-full p-2" type="button" onClick={(e) => setIsOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 px-4 py-4 overflow-y-auto">
          {selectedUser &&
            userFiltered?.messages?.map( message =>{
              if(message.fromSelf){
                return (
                <div className="flex items-center flex-row-reverse mb-4">
                <div className="flex-none flex flex-col items-center space-y-1 ml-4">
                  <div className="rounded-full w-10 h-10 bg-gray-200" />
                    <p className="block text-xs hover:underline">{user?.name}</p>
                  </div>
                <div className="flex-1 bg-indigo-100 text-gray-800 p-2 rounded-lg mb-2 relative">
                  <div>{message.msg}</div>
                  {/* <!-- arrow --> */}
                  <div className="absolute right-0 top-1/2 transform translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-100"></div>
                  {/* <!-- end arrow --> */}
                </div>
              </div>
            )
              }else {
                return(

              <div className="flex items-center mb-4">
              <div className="flex-none flex flex-col items-center space-y-1 mr-4">
              <div className="rounded-full w-10 h-10 bg-gray-200" />
                <a href="#" className="block text-xs hover:underline">{selectedUser.userName }</a>
              </div>
              <div className="flex-1 bg-indigo-400 text-white p-2 rounded-lg mb-2 relative">
                <div>{message.msg}</div>
                <div className="absolute left-0 top-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-400"></div>
              </div>
            </div> 
                )

              }
          })
          }
           
          </div>

          <div className="flex items-center border-t p-2">   
            <div className="w-full mx-2">
              <input 
                className="w-full rounded-full border border-gray-200 p-1" 
                type="text" 
                placeholder="Aa" 
                autoFocus 
                onChange={(e) => setMsg(e.target.value)}
                value={msg}/>
            </div>

            {/* <!-- chat send action --> */}

              <button className="inline-flex hover:bg-indigo-50 rounded-full p-2" type="button"  onClick={(e) => handleSubmit(e)}>
              <svg
                  className="w-6 h-6 transform rotate-45 -mt-px"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  ></path>
                </svg>
              </button>

            {/* <!-- end chat send action --> */}
          </div>
        </div>
      </div>

    }
  </>

  );
}

export default Chat;