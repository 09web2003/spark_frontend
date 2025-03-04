import React from "react";
import "./Forgetpassword.css";
import { useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import signimg from "../../assets/signimg.jpeg"
import { useNavigate } from "react-router-dom";

function Forgetpassword() {
  const [email, setemail] = useState("");
  const navigate = useNavigate();


  const forgetSubmitHandler = async (event) => {
    event.preventDefault();
    let response = await fetch(`https://spark-backend-yyw3.onrender.com/api/v1/forgotpassword`, {
      method: "POST",
      headers:{
        "Content-type" : "application/json"
      },
      body: JSON.stringify({email: email})
    })

    response = await response.json();

    if(response) {
      toast.success("Password has been sent through an email", {
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
    }
  }
  return (
    <>
      <div className="main-login">
        <div className="main-left-login">
          <div className="login-logo">
            <p>
              <i
                class="fa-solid fa-fire-flame-curved"
                style={{ color: "#28A263", fontSize: "1.5rem" }}
              ></i>
            </p>
            <h3 className="login-heading-logo" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>SPARK</h3>
          </div>
          <div>
            <h1 className="heading-login">Reset Password</h1>
          </div>
          <div className="form-centre-login">
            <form onSubmit={forgetSubmitHandler}>
              <input
                type="text"
                className="input-form-login"
                placeholder="spark/email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
              />

              <button type="submit" className="forget-submitbtn">
                Reset Password
              </button>
            </form>
          </div>
          <div className="form-footerlogin">
            <p className="form-footerlogin1">
              This site is protected by reCAPTCHA and the{" "}
              <span className="footer-onelogin">Google Privacy Policy</span> and{" "}
              <span className="footer-twologin">Terms of Service</span> apply
            </p>
          </div>
        </div>
        <div className="main-right">
          <img className="sign-img" src={signimg} alt="" />
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Forgetpassword;
