import React, { useEffect } from "react";
import "./Setting.css";
import NavRightShare from "../../components/navrightshare/NavRightShare";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import Topsidebar from "../../components/topsidebar/Topsidebar"


function Setting() {
  const params = useParams();
  const [globalData, setGlobaldata] = useState({})
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [isSubmitting, setisSubmitting] = useState(false);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("user"));
    if(data) {
      setGlobaldata(data);
      setFirstname(data.firstname);
      setLastname(data.lastname);
      setemail(data.email);
    }
  }, [])

  async function submitHandler(event) {
    event.preventDefault();
    setisSubmitting(true);

    const validationErrors = validateForm(formdata);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
        let tempData = globalData;
        tempData.firstname = firstname
        tempData.lastname = lastname
        tempData.email = email

        let response = await fetch(`https://spark-backend-yyw3.onrender.com/api/v1/updateuser/${globalData._id}`, {
          method: 'PUT',
          headers: {
            "Content-type" : "application/json"
          },
          body: JSON.stringify({password : password})
        })

        response = await response.json();

        if(response.success) {
          toast.success("Sucessfully Saved ", {
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

          localStorage.setItem("user", JSON.stringify(tempData))
          setGlobaldata(tempData)
  
          setFirstname("")
          setLastname("")
          setemail("")
          setpassword("")
          setConfirmPassword("")
          setErrors({});    
        }  

    }
    setisSubmitting(false)
  }
  function validateForm() {
    const errors = {};
    if (!email.trim()) {
      errors.email = "Email is required*";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid*";
    }
    if (!password) {
      errors.password = "Password is required*";
    } else if (password.length < 8) {
      errors.password = "The password must be at least 8 characters long*";
    } else if (!/[a-z]/.test(password)) {
      errors.password =
        "Please choose a strong password that includes at least 1 lowercase letter*";
    } else if (!/[A-Z]/.test(password)) {
      errors.password =
        "Please choose a strong password that includes at least 1 uppercase letter*";
    } else if (!/[0-9]/.test(password)) {
      errors.password =
        "Please choose a strong password that includes at least 1 number*";
    } else if (!/[!@#$%^&*]/.test(password)) {
      errors.password =
        "Please choose a strong password that includes at least 1 special character (!@#$%^&*)*";
    }
    if (password !== confirmPassword) {
      errors.cpassword = "Passwords do not match*";
    }
    return errors;
  }

  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div className="update">
        <Topsidebar/>
        <NavRightShare />
        <div className="update-formsave">
          <h5 className="edit-profile">Edit Profile</h5>
          <div className="linesave"></div>
          <div className="submissionsave">
            <form onSubmit={submitHandler}>
              <label htmlFor="Fname" className="label-formsave">
                First name
              </label>
              <input
                type="text"
                id="Fname"
                className="input-formsave"
                onChange={(e) => setFirstname(e.target.value)}
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

              <label htmlFor="Lname" className="label-formsave">
                Last name
              </label>
              <input
                type="text"
                id="Lname"
                className="input-formsave"
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

              <label htmlFor="email" className="label-formsave">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="input-formsave"
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

              <label htmlFor="password" className="label-formsave">
                Password
              </label>
              <div className="password-showhide">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="input-formsave"
                onChange={(e) => setpassword(e.target.value)}
                name="password"
                value={password}
              />
              <span
                  className="show-hide-btnsave"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <i className="fa-regular fa-eye"></i>
                  ) : (
                    <i className="fa-regular fa-eye-slash"></i>
                  )}
                </span>
              </div>
              
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

              <label htmlFor="Cpassword" className="label-formsave">
                Confirm Password
              </label>
              <input
                type="password"
                id="Cpassword"
                className="input-formsave"
                onChange={(e)=>{setConfirmPassword(e.target.value)}}
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

              <button className="submit-btnsave">{isSubmitting ? "Saving..." : "Save"}</button>
            </form>
          </div>
        </div>
      </div>
       <ToastContainer />
    </>
  );
}

export default Setting;
