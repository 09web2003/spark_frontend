import React, { useEffect, useState } from "react";
import "./Userprofile.css";
import { Link, useNavigate, useParams } from "react-router-dom";

function Userprofile() {
  const [data, setdata] = useState({});
  const [isActiveLink, setIsActiveLink] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let getData = async () => {
      let result = await fetch(
        `https://spark-backend-yyw3.onrender.com/api/v1/getprofile/${params.username}`,
        {
          method: "GET",
        }
      );

      result = await result.json();
      setdata(result);
    };

    getData();
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
      setIsActiveLink(false);
    }
    if (unknown === link) {
      shop.classList.remove("add-link");
      shop.classList.add("add-shop");

      link.classList.remove("add-shop");
      link.classList.add("add-link");
      setIsActiveLink(true);
    }
  };

  return (
    <>
      <div className="userprofile-main">
        <div className="userprofile-icon" onClick={() => navigate('/')}>
          <p>
            <i
              className="fa-solid fa-fire-flame-curved"
              style={{ color: "#28A263", fontSize: "2rem", cursor: "pointer" }}
            ></i>
          </p>
          <h3>Spark</h3>
        </div>
        <div
          className="banner"
          style={{ backgroundColor: data && data.banner ? data.banner : null }}
        >
          <div
            className="banner-img"
            style={{ backgroundColor: "white", borderRadius: "50%" }}
          >
            <img src={data.profile} alt="" />
          </div>
          <div className="banner-user">
            <h4 style={{ color: "white" }}>@{data.username}</h4>
          </div>
        </div>

        <div className="user-banner-links">
          <div
            className="linkshop-btn"
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
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

          <div
            className="show-links"
            style={{
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2rem",
            }}
          >
            {isActiveLink ? (
              data && data.socialLinks && data.socialLinks.length ? (
                data.socialLinks.map((item, index) => {
                  return (
                    <Link
                      to={item.url}
                      style={{
                        textDecoration: "none",
                        color: "black",
                        cursor: "pointer",
                        width: "50%",
                      }}
                    >
                      <div
                        className={`linkButton`}
                        style={{
                          width: "100%",
                          height: "fit-content",
                          backgroundColor: "#DDD6D6",
                          borderRadius: "60px",
                          padding: "0.5rem",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "sans-serif",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "5%",
                            fontSize: "2vw",
                            fontWeight: "700",
                          }}
                        >
                          <div className="circle">
                            <i
                              class={`fa-brands fa-${item.icon} brandsClass`}
                            ></i>
                          </div>
                          {item.name}
                        </p>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <h3>No Links to show!</h3>
              )
            ) : data && data.shopLinks && data.shopLinks.length ? (
              data.shopLinks.map((item, index) => {
                return (
                  <Link
                    to={item.url}
                    style={{
                      textDecoration: "none",
                      color: "black",
                      cursor: "pointer",
                      width: "50%",
                    }}
                  >
                    <div
                      className={`linkButton`}
                      style={{
                        width: "100%",
                        height: "fit-content",
                        backgroundColor: "#DDD6D6",
                        borderRadius: "60px",
                        padding: "0.5rem",
                      }}
                    >
                      <p
                        style={{
                          width: "100%",
                          fontFamily: "sans-serif",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "5%",
                          fontSize: "2vw",
                          fontWeight: "700",
                        }}
                      >
                        {item.name}
                      </p>
                    </div>
                  </Link>
                );
              })
            ) : (
              <h3>No Links to show!</h3>
            )}
          </div>
        </div>
        <div className="banner-footer">
          <div className="banner-abs">
            <div className="banner-button" onClick={() => navigate('/')}>
              <button>Get Connected</button>
            </div>
            <div className="banner-footer">
              <p>
                <i
                  className="fa-solid fa-fire-flame-curved"
                  style={{
                    color: "#28A263",
                    fontSize: "2rem",
                    cursor: "pointer",
                  }}
                ></i>
              </p>
              <h3 onClick={() => navigate('/')}>Spark</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Userprofile;
