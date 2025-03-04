import React from "react";
import "./Topsidebar.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
function Topsidebar() {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const data = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (data) {
      setname(data.firstname + " " + data.lastname);
    }
  }, []);
  const handleSignout = () => {
    toast.success("Logout Sucessfully", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <div className="top-bar">
        <div className="top-bardiv1" onClick={() => navigate("/")}>
          <p>
            {" "}
            <i
              className="fa-solid fa-fire-flame-curved"
              style={{ color: "#28A263", fontSize: "1.5rem" }}
            ></i>
          </p>
          <h3>Spark</h3>
        </div>
        <div className="top-bardiv2" onClick={handleSignout}>
          <div className="top-username">

            <img src={ data?data.profile:null} alt="" />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Topsidebar;
