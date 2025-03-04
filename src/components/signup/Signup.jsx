import React, { useState } from "react";
import "./Signup.css";
import signimg from "../../assets/signimg.jpeg";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast,Bounce } from 'react-toastify';

function Signup() {
  const [firstname, setfirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isvisible, setIsvisible] = useState(false)
  const [isSubmitting, setisSubmitting] = useState(false)
  
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  async function submitHandler(event) {
    event.preventDefault();
    setisSubmitting(true);

    const validationErrors = validateForm({firstname: firstname, lastname: lastname, email: email, password: password, cpassword: confirmPassword, isvisible: isvisible});
    if (Object.keys(validationErrors).length > 0) {
      setisSubmitting(false)
      setErrors(validationErrors);
    } else {
      const response = await fetch("https://spark-backend-yyw3.onrender.com/api/v1/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({firstname : firstname, lastname: lastname, email: email, password: password}),
      })
        .then((response) => {
          response = response.json().then((response) => {
            if (!response.success) {
              console.log(response)
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

              throw new Error("Network response was not ok");
            } 
            else {
              localStorage.setItem("user", JSON.stringify(response.user));
              localStorage.setItem("token", JSON.stringify(response.token));

              toast.success("Signup Sucessfully", {
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
              
              setisSubmitting(false)
              navigate("/about");
              window.location.reload()
            }
          })
        })
        .catch((error) => {
          console.log(error)
          setErrors({ submit: "An error occurred while submitting the form." });
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
        });
      
      setisSubmitting(false)
      setfirstname("");
      setLastname("");
      setemail("");
      setpassword("");
      setConfirmPassword("");
      setIsvisible(false)
      setErrors({});
    }
  }

  function validateForm(data) {
    const errors = {};
    if (!data.firstname.trim()) {
      errors.firstname = "First name is required*";
    }
    if (!data.lastname.trim()) {
      errors.lastname = "Last name is required*";
    }
    if (!data.email.trim()) {
      errors.email = "Email is required*";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is invalid*";
    }
    if (!data.password) {
      errors.password = "Password is required*";
    } else if (data.password.length < 8) {
      errors.password = "The password must be at least 8 characters long*";
    } else if (!/[a-z]/.test(data.password)) {
      errors.password =
        "Please choose a strong password that includes at least 1 lowercase letter*";
    } else if (!/[A-Z]/.test(data.password)) {
      errors.password =
        "Please choose a strong password that includes at least 1 uppercase letter*";
    } else if (!/[0-9]/.test(data.password)) {
      errors.password =
        "Please choose a strong password that includes at least 1 number*";
    } else if (!/[!@#$%^&*]/.test(data.password)) {
      errors.password =
        "Please choose a strong password that includes at least 1 special character (!@#$%^&*)*";
    }
    if (data.password !== confirmPassword) {
      errors.cpassword = "Passwords do not match*";
    }
    if (!isvisible) {
      errors.isvisible = "You must agree to the terms and conditions*";
    }
    return errors;
  }

  function loginHandler() {
    navigate("/login");
  }

  return (
    <>
      <div className="main-signup">
        <div className="main-left">
          <div className="signup-logo">
            <p>
              <i
                className="fa-solid fa-fire-flame-curved"
                style={{ color: "#28A263", fontSize: "1.5rem" }}
              ></i>
            </p>
            <h3 className="signup-heading-logo2">SPARK</h3>
          </div>
          <div>
            <h1 className="heading">Sign up to your Spark</h1>
          </div>
          <div className="account">
            <div className="account-para-one">
              <p>Create an account</p>
            </div>
            <div className="account-para-two">
              <p onClick={loginHandler}>Sign in instead</p>
            </div>
          </div>
          <div className="form-centre">
            <form onSubmit={submitHandler}>
              <label htmlFor="Fname" className="label-form">
                First name
              </label>
              <input
                type="text"
                id="Fname"
                className="input-form"
                onChange={(e) => setfirstname(e.target.value)}
                name="firstname"
                value={firstname}
              />
              {errors.firstname && (
                <span
                  style={{
                    color: " #EE1D52",
                    display: "block",
                    fontSize: "0.7rem",
                    fontWeight: "600",
                    wordSpacing: "0.001rem",
                    marginBottom: "0.2rem",
                  }}
                >
                  {errors.firstname}
                </span>
              )}

              <label htmlFor="Lname" className="label-form">
                Last name
              </label>
              <input
                type="text"
                id="Lname"
                className="input-form"
                onChange={(e) => setLastname(e.target.value)}
                name="lastname"
                value={lastname}
              />
              {errors.lastname && (
                <span
                  style={{
                    color: " #EE1D52",
                    display: "block",
                    fontSize: "0.7rem",
                    fontWeight: "600",
                    wordSpacing: "0.001rem",
                    marginBottom: "0.2rem",
                  }}
                >
                  {errors.lastname}
                </span>
              )}

              <label htmlFor="email" className="label-form">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="input-form"
                onChange={(e) => setemail(e.target.value)}
                name="email"
                value={email}
              />
              {errors.email && (
                <span
                  style={{
                    color: " #EE1D52",
                    display: "block",
                    fontSize: "0.7rem",
                    fontWeight: "600",
                    wordSpacing: "0.001rem",
                    marginBottom: "0.2rem",
                  }}
                >
                  {errors.email}
                </span>
              )}

              <label htmlFor="password" className="label-form">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="input-form"
                onChange={(e) => setpassword(e.target.value)}
                name="password"
                value={password}
              />

              {errors.password && (
                <span
                  style={{
                    color: " #EE1D52",
                    display: "block",
                    fontSize: "0.7rem",
                    fontWeight: "600",
                    wordSpacing: "0.001rem",
                    marginBottom: "0.2rem",
                  }}
                >
                  {errors.password}
                </span>
              )}

              <label htmlFor="Cpassword" className="label-form">
                Confirm Password
              </label>
              <input
                type="password"
                id="Cpassword"
                className="input-form"
                onChange={(e) => setConfirmPassword(e.target.value)}
                name="cpassword"
                value={confirmPassword}
              />
              {errors.cpassword && (
                <span
                  style={{
                    color: " #EE1D52",
                    display: "block",
                    fontSize: "0.7rem",
                    fontWeight: "600",
                    wordSpacing: "0.001rem",
                    marginBottom: "0.2rem",
                  }}
                >
                  {errors.cpassword}
                </span>
              )}
              <input
                type="checkbox"
                id="checkbox"
                className="check"
                onChange={() => setIsvisible(!isvisible)}
                name="isvisible"
                checked={isvisible}
              />
              <span className="check-span">
                By creating an account, I agree to our{" "}
                <span className="check-one">Terms of use</span> and{" "}
                <span className="check-two">Privacy Policy</span>{" "}
              </span>
              {errors.isvisible && (
                <span
                  style={{
                    color: " #EE1D52",
                    display: "block",
                    fontSize: "0.7rem",
                    fontWeight: "600",
                    wordSpacing: "0.001rem",
                    marginBottom: "0.2rem",
                  }}
                >
                  {errors.isvisible}
                </span>
              )}

              <button className="submit-btn" >{isSubmitting ? "Creating an account..." : "Create an account"}</button>
            </form>
          </div>
          <div className="form-footersign">
            <p className="form-footersign">
              This site is protected by reCAPTCHA and the
              <span className="footer-onesign">Google Privacy Policy</span> and{" "}
              <span className="footer-twosign">Terms of Service</span> apply{" "}
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

export default Signup;
