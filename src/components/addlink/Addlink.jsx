import React, { useEffect, useState } from "react";
import "./Addlink.css";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast,Bounce } from 'react-toastify';

function Addlink() {
  const navigate = useNavigate();
  const params = useParams();
  const [isActive, setisActive] = useState(false);
  const [title, settitle] = useState("");
  const [url, seturl] = useState("");
  const [icon, setIcon] = useState("");
  const [iconColor, setIconColor] = useState("");
  const [socialLinks, setSocialLinks] = useState("");
  
  useEffect(() => {
    if(JSON.parse(localStorage.getItem("user")).socialLinks) {
      setSocialLinks(JSON.parse(localStorage.getItem("user")).socialLinks);
    }
  }, [])
  
  const handleLinkToggle = (event) => {
    const linkToggle = document.getElementById("linkToggle");

    if(linkToggle.classList.contains("fa-toggle-on")) {
      toast.success('Save Link!', {
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
      linkToggle.classList.remove("fa-toggle-on");
      toast.warn('REmove Link!', {
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
      setisActive(false);
      handleDelete(event);
    }
    else {
      linkToggle.classList.add("fa-toggle-on");
      setisActive(true);
      handleUpdate(event);
    }
  }

  const handleDelete = async (event) => {
    event.preventDefault();

    let updatedArray = [...socialLinks];
    updatedArray.pop();

    let response = await fetch(`https://spark-backend-yyw3.onrender.com/api/v1/updateuser/${params.id}`, {
      method: "PUT",
      headers : {
        "Content-type" : "application/json"
      },
      body: JSON.stringify({username : JSON.parse(localStorage.getItem("user")).username, socialLinks : updatedArray})
    })

    setSocialLinks(updatedArray);

    response = response.json().then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data))
    })
  }

  const handleUpdate = async (event) => {
    event.preventDefault();

    let lastIndex = socialLinks[socialLinks.length - 1] + 1;

    let newItem = {
      id: lastIndex,
      name: title,
      url: url,
      icon: icon, 
      iconColor: iconColor
    }

    let updatedArray = [...socialLinks];
    updatedArray.push(newItem);

    let response = await fetch(`https://spark-backend-yyw3.onrender.com/api/v1/updateuser/${params.id}`, {
      method: "PUT",
      headers : {
        "Content-type" : "application/json"
      },
      body: JSON.stringify({username : JSON.parse(localStorage.getItem("user")).username, socialLinks : updatedArray})
    })

    setSocialLinks(updatedArray);

    response = response.json().then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data))
    })
  }

  return (
    <>
      <div className="add-link-main">
        <div className="add-links-btn">
          <button className="add-link-btnx">
            <i className="fa-solid fa-house"></i>Add Link
          </button>
          <button className="add-shop-btnx" onClick={() => navigate(`/dashboard/add-shops/${params.id}`)}>
            <i className="fa-solid fa-house"></i>Add Shop
          </button>
        </div>
        <div className="links-container">
          <h4 className="links-headingfour">Enter URL</h4>
          <div className="link-tittlemain">
          <div className="link-tittlecontainer">
            <div className="link-field">
                <input type="text" className="link-input" placeholder="Link-Tittle" value={title} onChange={(e) => settitle(e.target.value)}/>
            </div>
            <div className="tittle-saveicon">
            <i class="fa-solid fa-toggle-off " id="linkToggle" onClick={handleLinkToggle}></i>
            </div>
          </div>

          <div className="link-urlmain">
            <div className="link-urlcontainer">
              <input type="text" className="link-input" placeholder="Link-URL" value={url} onChange={(e) => seturl(e.target.value)} />
            </div>

            <div className="delete-icon">
              <div><i class="fa-regular fa-clone"></i></div>
              <div><i class="fa-regular fa-trash-can" onClick={() => {
                settitle("")
                seturl("")
              }}></i></div>
            </div>
          </div>
        </div>

        <div className="line-line"></div>
        <h3 className="links-headingfour">Application</h3>
        <div className="application-main">
            <div className="application-uppar">
                <div>
                  <i class="fa-brands fa-square-instagram" onClick={() => {
                     setIcon("square-instagram")
                     setIconColor("rgb(188, 17, 46)")
                     seturl("https://www.instagram.com/")
                     settitle("Instagram")
                  }}></i>
                  <div className="insta">Instagram</div>
                </div>
                <div>
                  <i class="fa-brands fa-square-facebook" onClick={() => {
                    setIcon("square-facebook")
                    setIconColor("blue")
                    seturl("https://www.facebook.com/")
                    settitle("facebook")
                  }}></i>
                  <div className="facebook">Facebook</div>
                </div>
                <div>
                  <i class="fa-brands fa-youtube" onClick={() => {
                    setIcon("youtube");
                    setIconColor("red");
                    seturl("https://www.youtube.com/")
                    settitle("YouTube")
                  }}></i>
                  <div className="youtube">Youtube</div>
                </div>
                <div>
                  <i class="fa-brands fa-x-twitter" onClick={() => {
                    setIcon("x-twitter")
                    setIconColor("black")
                    seturl("https://www.x.com/")
                    settitle("X")
                }}></i>
                  <div className="youtube">X</div>
                </div>
            </div>
        </div>
        </div> 
      </div>
      <ToastContainer />
    </>
  );
}

export default Addlink;
