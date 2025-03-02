import React, { useEffect } from "react";
import "./Setting.css";
import NavRightShare from "../../components/navrightshare/NavRightShare";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import Topsidebar from "../../components/topsidebar/Topsidebar"


function Setting() {
  const params = useParams();
  const [formdata, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    cpassword: "",
    isvisible: false,
  });

  let data = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    setFormData({
      firstname : data.firstname,
      lastname : data.lastname,
      email: data.email,
      password : "",
      cpassword : "",
      isvisible: false
    })
  }, [])

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  async function submitHandler(event) {
    event.preventDefault();
    const validationErrors = validateForm(formdata);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {

      let result = fetch(`https://spark-backend-yyw3.onrender.com/updateuser/${params.id}`, {
        method: 'put',
        body: JSON.stringify({formdata}),
        headers: {
            'Content-Type': 'application/json'
        }
      }).then((result) => {
          
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
               setFormData({
                firstname: "",
                lastname: "",
                email: "",
                password: ""
              });
              setConfirmPassword("")
              setErrors({});      
              })

    }
  }
  function validateForm(data) {
    const errors = {};
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
    return errors;
  }

  function changeHandle(event) {
    const { type, checked, value, name } = event.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
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
                onChange={changeHandle}
                name="firstname"
                value={formdata.firstname}
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
                onChange={changeHandle}
                name="lastname"
                value={formdata.lastname}
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
                onChange={changeHandle}
                name="email"
                value={formdata.email}
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
                onChange={changeHandle}
                name="password"
                value={formdata.password}
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

              <button className="submit-btnsave">Save</button>
            </form>
          </div>
        </div>
      </div>
       <ToastContainer />
    </>
  );
}

export default Setting;
