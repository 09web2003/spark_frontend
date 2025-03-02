import React, { useEffect, useRef, useState } from "react";
import "./Linkpage.css";
import MobileLayout from "../mobilelayout/MobileLayout";
import RightNav from "../../components/rightnav/RightNav";
import Topsidebar from "../../components/topsidebar/Topsidebar";
import { useNavigate } from "react-router-dom";
import Showhidelink from "../../components/showhidelink/Showhidelink";
import { ToastContainer, toast, Bounce } from "react-toastify";

function Linkpage() {
  const [BGcolor, setBGcolor] = useState("");
  const [username, setusername] = useState("");
  const [bio, setbio] = useState("");
  const [socialLinks, setsocialLinks] = useState([]);
  const [shopLinks, setshopLinks] = useState([]);
  const [currentActive, setcurrentActive] = useState("add-links");
  const [imageFile, setimageFile] = useState("");
  const [error, setError] = useState("");
  const [isActive, setIsActive] = useState(true);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setusername(JSON.parse(localStorage.getItem("user")).username);
      setimageFile(JSON.parse(localStorage.getItem("user")).profile);
      setBGcolor(JSON.parse(localStorage.getItem("user")).banner);
      if (JSON.parse(localStorage.getItem("user")).bio) {
        setbio(JSON.parse(localStorage.getItem("user")).bio);
      }
      if (JSON.parse(localStorage.getItem("user")).socialLinks) {
        setsocialLinks(JSON.parse(localStorage.getItem("user")).socialLinks);
      }
      if (JSON.parse(localStorage.getItem("user")).shopLinks) {
        setshopLinks(JSON.parse(localStorage.getItem("user")).shopLinks);
      }
    }

    setcurrentActive("add-links");
  }, []);

  const handleLinkShopToggle = (event) => {
    const link = document.getElementById("add-links");
    const shop = document.getElementById("add-shops");

    const unknown = document.getElementById(event.target.id);

    if (unknown === shop) {
      shop.classList.remove("add-shop");
      shop.classList.add("add-link");

      link.classList.remove("add-link");
      link.classList.add("add-shop");
      setIsActive(false)
    }
    if (unknown === link) {
      shop.classList.remove("add-link");
      shop.classList.add("add-shop");

      link.classList.remove("add-shop");
      link.classList.add("add-link");
      setIsActive(true)
    }

    setcurrentActive(event.target.id);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "note_image");
    data.append("cloud_name", "doqqdr0fm");

    let resultImage = await fetch(
      "https://api.cloudinary.com/v1_1/doqqdr0fm/image/upload",
      {
        method: "post",
        body: data,
      }
    );

    resultImage = await resultImage.json();

    let response = await fetch(`https://spark-backend-yyw3.onrender.com/api/v1/updateuser/${JSON.parse(localStorage.getItem("user"))._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ username: username, bio: bio, banner: BGcolor, socialLinks: socialLinks, shopLinks: shopLinks, profile: resultImage.secure_url })
    })

    if (response.message) {
      setError(response.message);
    } else {
      response = await response.json();
      toast.success("Saved!", {
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
      localStorage.setItem("user", JSON.stringify(response.data));
      window.location.reload();
    }
  };

  const previewImage = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setimageFile(reader.result);
    };
  };

  function addlinkshopHandler() {
    navigate(
      `${currentActive}/${JSON.parse(localStorage.getItem("user"))._id}`
    );
  }

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <div className="link-div">
        <RightNav />
        <Topsidebar />
        <div className="user-profile">
          <div className="user-left">
            <MobileLayout profile={imageFile} banner={BGcolor} />
          </div>
          <div className="user-right">
            <h3 className="user-heading">Profile</h3>
            <div className="bio">
              <div className="bio-uppar">
                <div className="img-show">
                  <img src={imageFile} alt="" />
                </div>
                <div className="addremove">
                  <input
                    type="file"
                    name="image"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={previewImage}
                  />
                  <button className="add-img" onClick={handleButtonClick}>
                    Pick an image
                  </button>
                  <button
                    className="remove-img"
                    onClick={() => setimageFile("")}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="bio-text">
                <div className="user-text">
                  <input
                    type="text"
                    placeholder="Profile tittle &#10;"
                    onChange={(e) => setusername(e.target.value)}
                    value={username}
                  ></input>
                  <span style={{ color: "red" }}>{error}</span>
                </div>
                <div className="user-bio">
                  <textarea
                    placeholder="Bio"
                    onChange={(e) => setbio(e.target.value)}
                    value={bio}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="add-btn">
              <div className="linkshop-btn">
                <button
                  className="add-link"
                  style={{ cursor: "pointer" }}
                  id="add-links"
                  onClick={handleLinkShopToggle}
                >
                  <i className="fa-solid fa-house"></i>Add Link
                </button>
                <button
                  className="add-shop"
                  style={{ cursor: "pointer" }}
                  id="add-shops"
                  onClick={handleLinkShopToggle}
                >
                  <i className="fa-solid fa-house"></i>Add Shop
                </button>
              </div>

              <div className="plus-add">
                <button
                  style={{ cursor: "pointer" }}
                  onClick={addlinkshopHandler}
                >
                  <span>+</span> Add
                </button>
              </div>
              <div className="show-hide-content">
                {
                  isActive ?
                    socialLinks && socialLinks.length ?
                      socialLinks.map((item, index) => {
                        return (
                          <Showhidelink key={index} item={item} />
                        )
                      })
                      :
                      null
                    :
                    shopLinks && shopLinks.length ?
                      shopLinks.map((item, index) => {
                        return (
                          <Showhidelink key={index} item={item} />
                        )
                      })
                      : null
                }
              </div>
            </div>
            <div className="custom-bg">
              <h3>Banner</h3>
              <div className="custom-colourdiv">
                <div className="user-bg" style={{ backgroundColor: BGcolor }}>
                  <img
                    src={JSON.parse(localStorage.getItem("user")).profile}
                    alt=""
                  />
                  <h3>@{username}</h3>
                  <p style={{ color: "#FFFFFFB8" }}>
                    <i
                      className="fa-solid fa-fire-flame-curved"
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                    /{username}
                  </p>
                </div>
                <h4>Custom Background Color</h4>
                <div className="three-color">
                  <div
                    className="brown"
                    onClick={() => setBGcolor("#342B26")}
                  ></div>
                  <div
                    className="gray"
                    onClick={() => setBGcolor("gray")}
                  ></div>
                  <div
                    className="black"
                    onClick={() => setBGcolor("#000000")}
                  ></div>
                </div>
                <div className="hexa-colour">
                  <div className="hexa-box"></div>
                  <p>#00000</p>
                </div>
              </div>
              <div className="save-btn">
                <button onClick={handleUpdate}>Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Linkpage;
