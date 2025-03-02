import React from "react";
import "./Login.css";
import signimg from "../../assets/signimg.jpeg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  function signHandler() {
    navigate("/signup");
  }
  function forgetHandler(){
    navigate("/forgotpassword")
  }

  const handleLogin = async (e) => {
    e.preventDefault(); 

    try {
      const response = await fetch(`https://spark-backend-yyw3.onrender.com/api/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {

        toast.success("Login Sucessfully", {
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
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", JSON.stringify(data.token));
        navigate("/dashboard");
        window.location.reload();
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      toast.error('Something went wrong!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
      setError("An error occurred. Please try again later.");
    }
  };

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
            <h3 className="login-heading-logo">SPARK</h3>
          </div>
          <div>
            <h1 className="heading-login">Sign in to your Spark</h1>
          </div>
          <div className="form-centre-login">
            <form onSubmit={handleLogin}>
              <input
                type="text"
                className="input-form-login"
                placeholder="spark/email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
              />
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input-form-login"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="show-hide-btn"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <i className="fa-regular fa-eye"></i>
                  ) : (
                    <i className="fa-regular fa-eye-slash"></i>
                  )}
                </span>
              </div>

              <button type="submit" className="submit-btn-login">
                Log in
              </button>
            </form>
            <p className="forget-login" onClick={forgetHandler}>Forgot password?</p>
            <div className="ques">
              <span className="login-que">Don't have an account?</span>
              <span className="login-signup" onClick={signHandler}>
                Sign up
              </span>
            </div>
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

export default Login;
