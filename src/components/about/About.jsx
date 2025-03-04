import React, { useEffect, useState } from "react";
import "./About.css";
import signimg from "../../assets/signimg.jpeg";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";

function About() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [data, setdata] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setdata(JSON.parse(localStorage.getItem("user")));
  }, []);

  const btns = [
    "🏢 Business",
    "🎨 Creative",
    "📚 Education",
    "🎶 Entertainment",
    "👗 Fashion & Beauty",
    "🍕 Food & Beverage",
    "⚖️ Government & Politics",
    "🍎 Health & Wellness",
    "💓 Non-Profit",
    "💓 Other",
    "💻 Tech",
    "✈️ Travel & Tourism",
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = fetch(`https://spark-backend-yyw3.onrender.com/api/v1/updateuser/${data._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category: selectedCategory,
            username: username,
          }),
        }
      ).then((response) =>{
        if (response.status === 500) {
          setError("Username already exist. Try using another username!");
        }

        if (response && response.success === false && response.message) {
          setError(response.message);
          toast.error('Something went wrong', {
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
        } 
        else {
          const user = response.json().then((user) => {
            localStorage.setItem("user", JSON.stringify(user.data));

            toast.success("Saved Category", {
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
    
            navigate("/dashboard");
            window.location.reload()
          }
      )}});
    } 

    catch (error) {
      toast.error('Something went wrong', {
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
    }
  };

  return (
    <>
      <div className="main-about">
        <div className="main-left-about">
          <div className="about-logo">
            <p>
              <i
                className="fa-solid fa-fire-flame-curved"
                style={{ color: "#28A263", fontSize: "1.5rem" }}
              ></i>
            </p>
            <h3 className="about-heading-logo">SPARK</h3>
          </div>
          <div>
            <h1 className="heading-about">Tell us about yourself</h1>
            <p className="about-para">For a personalized Spark experience</p>
          </div>
          <div className="form-centre-about">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="input-form-about"
                placeholder="Tell us your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <span style={{ color: "red", marginLeft: "2em" }}>{error}</span>

              <div className="option-data">
                <h5 className="category">
                  Select one category that best describes your Linktree:
                </h5>
                <div className="cate-btn">
                  {btns.map((item, index) => (
                    <button
                      className="des-btn"
                      key={index}
                      id={"des-btn" + index}
                      onClick={() => handleCategorySelect(item)}
                      type="button" 
                      style={{cursor: "pointer"}}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <button className="submit-btn-about" type="submit">
                Continue
              </button>
            </form>
          </div>
        </div>
        <div className="main-right">
          <img className="sign-img" src={signimg} alt="" />
        </div>
      </div>
      <ToastContainer/>
    </>
  );
}

export default About;
