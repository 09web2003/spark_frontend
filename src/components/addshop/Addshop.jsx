import React, { useEffect, useState } from "react";
import "./Addshop.css";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast ,Bounce} from 'react-toastify';


function Addshop() {
  const navigate = useNavigate();
  const params = useParams();
  const [isActive, setIsActive] = useState(false);
  const [shopLinks, setShopLinks] = useState([]);
  const [name, setname] = useState("");
  const [url, seturl] = useState("");

  useEffect(() => {
    if(JSON.parse(localStorage.getItem("user")).shopLinks) {
      setShopLinks(JSON.parse(localStorage.getItem("user")).shopLinks);
    }
  }, [])

  const handleShopToggle = (event) => {
    const shopToggle = document.getElementById("shopToggle");

    if(shopToggle.classList.contains("fa-toggle-on")) {
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
      shopToggle.classList.remove("fa-toggle-on")
      toast.warn('Remove Link!', {
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
      setIsActive(false);
      handleDelete(event);
    }
    else {
      shopToggle.classList.add("fa-toggle-on")
      setIsActive(true);
      handleUpdate(event);
    }
  }

  const handleDelete = async (event) => {
    event.preventDefault();

    let updatedArray = [...shopLinks];
    updatedArray.pop();

    let response = await fetch(`https://spark-backend-yyw3.onrender.com/api/v1/updateuser/${params.id}`, {
      method: "PUT",
      headers : {
        "Content-type" : "application/json"
      },
      body: JSON.stringify({username : JSON.parse(localStorage.getItem("user")).username, shopLinks : updatedArray})
    })

    setShopLinks(updatedArray);

    response = response.json().then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data))
    })
  }

  const handleUpdate = async (event) => {
    event.preventDefault();

    let lastIndex = shopLinks[shopLinks.length - 1].id + 1;

    let newItem = {
      id : lastIndex,
      name : name, 
      url : url
    }

    let updatedArray = [...shopLinks];
    updatedArray.push(newItem);

    let response = await fetch(`https://spark-backend-yyw3.onrender.com/api/v1/updateuser/${params.id}`, {
      method: "PUT",
      headers : {
        "Content-type" : "application/json"
      },
      body: JSON.stringify({username : JSON.parse(localStorage.getItem("user")).username, shopLinks : updatedArray})
    })

    setShopLinks(updatedArray);

    response = response.json().then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data))
    })
  }

  return (
    <>
      <div className="add-link-main">
        <div className="add-links-btn">
          <button className="add-link-btn" onClick={() => navigate(`/dashboard/add-links/${params.id}`)}>
            <i className="fa-solid fa-house"></i>Add Link
          </button>
          <button className="add-shop-btn">
            <i className="fa-solid fa-house"></i>Add Shop
          </button>
        </div>
        <div className="links-container">
          <h4 className="links-headingfour">Enter URL</h4>
          <div className="link-tittlemain">
            <div className="link-tittlecontainer">
              <div className="link-field">
                <input
                  type="text"
                  className="link-input"
                  placeholder="Link-Tittle"
                  onChange={(e) => setname(e.target.value)}
                  value={name}
                />
              </div>
              <div className="tittle-saveicon">
                <i id="shopToggle" className="fa-solid fa-toggle-off" onClick={handleShopToggle}></i>
              </div>
            </div>
            <div className="link-urlmain">
              <div className="link-urlcontainer">
                <input
                  type="text"
                  className="link-input"
                  placeholder="Link-URL"
                  value={url}
                  onChange={(e) => seturl(e.target.value)}
                />
              </div>
              <div className="delete-icon">
                <div>
                  <i className="fa-regular fa-clone"></i>
                </div>
                <div>
                  <i className="fa-regular fa-trash-can"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
}

export default Addshop;
