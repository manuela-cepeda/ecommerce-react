

import { Outlet } from "react-router-dom";
import Login from "../components/Login";

export default function LoginPage() {
  return (

    <>
     <Login />
     <Outlet />
    </>
  )
}