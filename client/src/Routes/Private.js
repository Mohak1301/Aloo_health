import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const authCheck = async () => {
      const token = localStorage.getItem("auth");
      console.log("Token:", token);
      if (token) {
        try {
          const res = await axios.get(`http://localhost:5000/server/api/auth/user-auth`, {
            headers: {
              Authorization: `${localStorage.getItem("auth")}`, 
            },
          });
          console.log("Response:", res.data);
          if (res.data.ok) {
            setOk(true);
          } else {
            setOk(false);
          }
        } catch (error) {
          console.error("Error during authentication check:", error);
          setOk(false);
        }
      } else {
        setOk(false);
      }
    };

    authCheck();
  }, []); // Empty dependency array to run only once on mount

  return ok ? <Outlet /> : <Spinner />;
}
