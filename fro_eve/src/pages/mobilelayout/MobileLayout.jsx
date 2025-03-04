import React, { useState, useEffect } from "react";
import "../appearance/Appearance.css";
import "./MobileLayout.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";


function MobileLayout({ buttonColor, buttonFontColor, fontColor, fontType, buttons, layout, theme, profile, banner }) {
  const [data, setdata] = useState({});
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setdata(JSON.parse(localStorage.getItem("user")));
    }
  }, []);
  
  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)

      .then(() => {
        setCopied(true);
        toast.success("Copied", {
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
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        toast.error('Sonething went wrong', {
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
  };

  return (
    <>
      <div className={`user-mobile ${theme ? theme : null}`}>
        <div className="mobile-uppar" style={{backgroundColor: banner}}>
          <div className="share" onClick={copyToClipboard}>
            <p>
              <i class="fa-solid fa-arrow-up-from-bracket" style={{cursor:"pointer"}}></i>
            </p>
          </div>

          <div className="mobile-imguppar">
            <img src={profile} alt="" className="mobile-img" />
            <p className="mobile-para">@{data.username}</p>
          </div>
        </div>

        <div className="mobile-down">
          <div className="links-btn">
            <button className="link-user">link</button>
            <button className="link-shop">shop</button>
          </div>
          <div className={`${layout ? layout : "user-links"}`}>
            <div
              className={`linkButton ${buttons ? buttons : "link1"}`}
              style={{ width: "100%" , height: "fit-content", backgroundColor: buttonColor, color: (buttonFontColor ? buttonFontColor : null)}}
            >
              <p style={{fontFamily: (fontType ? fontType : "sans-serif"), color : (fontColor ? fontColor : null)}}><div className="circle"><i class="fa-brands fa-youtube brandsClass"></i></div>Latest YouTube video</p>
            </div>
            <div
              className={`linkButton ${buttons ? buttons : "link2"}`}
              style={{ width: "100%", height: "fit-content", backgroundColor: buttonColor, color: (buttonFontColor ? buttonFontColor : null) }}
            >
              <p style={{fontFamily: (fontType ? fontType : "sans-serif"), color : (fontColor ? fontColor : null)}}><div className="circle"><i class="fa-brands fa-square-instagram brandsClass"></i></div>Latest Instagram video</p>
            </div>
          </div>
          <div className="connected">
            <button className="connected-btn" onClick={() => navigate("/")}>
              Get Connected
            </button>
          </div>
          <div className="connected-footer">
            <i
              className="fa-solid fa-fire-flame-curved"
              style={{ color: "#28A263", fontSize: "1.5rem" }}
            ></i>
            <h3 className="con-heading">Spark</h3>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default MobileLayout;


