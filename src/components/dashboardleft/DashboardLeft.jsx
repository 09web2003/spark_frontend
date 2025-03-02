import React, { useEffect, useState } from "react";
import "./DashboardLeft.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";

function DashboardLeft() {
  const navigate = useNavigate();
  const [name, setname] = useState("")  
  const data = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if(data) {
      setname(data.firstname + " " + data.lastname);
    }
    if(window.location.pathname === '/dashboard') {
      const linkActive = document.getElementById('dash-link1');
      if(linkActive) {
        linkActive.classList.add('active')
      }
    }
    if(window.location.pathname === '/dashboard/appearance') {
      const linkActive = document.getElementById('dash-link2');
      if(linkActive) {
        linkActive.classList.add('active')
      }
    }
    if(window.location.pathname === '/dashboard/analytics') {
      const linkActive = document.getElementById('dash-link3');
      if(linkActive) {
        linkActive.classList.add('active')
      }
    }
    if(window.location.pathname.startsWith("/dashboard/setting/")) {
      const linkActive = document.getElementById('dash-link4');
      if(linkActive) {
        linkActive.classList.add('active')
      }
    }
  }, [])

  const handleClassActive = (id) => {
    const activeId = document.getElementById(id)
    const elements = document.querySelectorAll('[class^=dash-link]')
    elements.forEach((element) => {
      element.classList.remove("active")
    })

    activeId.classList.add('active');
  }

  const handleSignout = () => {
    toast.success("Logout Sucessfully", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
    localStorage.clear();
    navigate("/")
    window.location.reload();
  }

  return (
    <>
      <div className="dash-spark" onClick={()=>navigate('/')}>
        <p>
          {" "}
          <i
            className="fa-solid fa-fire-flame-curved  firenav"
            
          ></i>
        </p>
        <h3>Spark</h3>
      </div>
      <div className="dash-links">
        <div className="dash-link1" id="dash-link1" onClick={(event) => {
            handleClassActive(event.currentTarget.id)
            navigate("/dashboard")
        }}>
          <p>
            <i className="fa-solid fa-display"></i>
          </p>
          <p>Links</p>
        </div>
        <div className="dash-link2" id="dash-link2" onClick={(event) => {
            handleClassActive(event.currentTarget.id)
            navigate('/dashboard/appearance')
        }}>
          <p>
            <i className="fa-regular fa-circle"></i>
          </p>
          <p>Appearance</p>
        </div>
        <div className="dash-link3" id="dash-link3" onClick={(event) => {
            handleClassActive(event.currentTarget.id)
            navigate('/dashboard/analytics')
        }}>
          <p>
            <i className="fa-solid fa-chart-pie"></i>
          </p>
          <p>Analytics</p>
        </div>
        <div className="dash-link4" id="dash-link4" onClick={(event) => {
            handleClassActive(event.currentTarget.id)
            navigate(`/dashboard/setting/${data._id}`)
        }}>
          <p>
            <i className="fa-solid fa-gear"></i>
          </p>
          <p>Settings</p>
        </div>
      </div>
      <div className="bottom-user" onClick={handleSignout}>
        <div className="left-username">
          <img src={data?data.profile:null} alt=""  />
          <p> {name}</p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default DashboardLeft;
