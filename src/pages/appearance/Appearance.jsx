import React, { useEffect, useState } from "react";
import "./Appearance.css";
import NavRightShare from "../../components/navrightshare/NavRightShare";
import MobileLayout from "../mobilelayout/MobileLayout";
import black from "../../assets/air-black.png";
import gray from "../../assets/air-gray.png";
import smoke from "../../assets/air-smoke.png";
import snow from "../../assets/air-snow.png";
import blue from "../../assets/mineral-blue.png";
import green from "../../assets/mineral-green.png";
import orange from "../../assets/mineral-orange.png";
import Topsidebar from "../../components/topsidebar/Topsidebar"
import { ToastContainer, toast,Bounce } from 'react-toastify';

function Appearance() {
  const [buttonDesign, setButtonDesign] = useState("")
  const [layoutDesign, setlayoutDesign] = useState("")
  const [fontColor, setfontColor] = useState("")
  const [fontType, setFontType] = useState("")
  const [buttonFontColor, setbuttonFontColor] = useState("")
  const [buttonColor, setbuttonColor] = useState("")
  const [theme, settheme] = useState("")
  const [profile, setProfile] = useState("")  

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    if(data) {
      setButtonDesign(data.buttonType);
      setlayoutDesign(data.layoutType);
      settheme(data.theme);
      setbuttonColor(data.buttonColor);
      setfontColor(data.fontColor);
      setbuttonFontColor(data.buttonFontColor);
      setFontType(data.font);
    }
  }, [buttonDesign, layoutDesign, theme, buttonColor, buttonFontColor, fontColor, fontType])

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch(`https://spark-backend-yyw3.onrender.com/api/v1/updateuser/${JSON.parse(localStorage.getItem("user"))._id}`, {
      method: "PUT",
      headers : {
        "Content-type" : "application/json"
      }, 
      body: JSON.stringify({username: JSON.parse(localStorage.getItem("user")).username, theme: theme, layoutType: layoutDesign, buttonType: buttonDesign, buttonColor: buttonColor, buttonFontColor: buttonFontColor, fontColor: fontColor, font: fontType})
    })

    response = await response.json();
    toast.success('Save Successfully!', {
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
  }

  return (
    <>
      <div className="appearnce-box">
        <NavRightShare />
        <Topsidebar/>
        <div className="user-apearnce">
          <div className="apearnce-left">
          <MobileLayout key={buttonDesign + layoutDesign + theme + profile + buttonColor + buttonFontColor + fontColor + fontType} buttonColor={buttonColor} buttonFontColor={buttonFontColor} fontType={fontType} fontColor={fontColor} buttons={buttonDesign} layout={layoutDesign} theme={theme} profile = {JSON.parse(localStorage.getItem("user")).profile}/>

          </div>
          <div className="apearnce-right">
            <h3>Layout</h3>
            <div className="layout">
              <div className="layout-uppar">
                <div className="stack" onClick={() => setlayoutDesign("stack")}>
                  <div className="stack1"></div>
                  <div className="stack2"></div>
                  <div className="stack3"></div>
                </div>
                <div className="grid" onClick={() => setlayoutDesign("grid")}>
                    <div className="grid1"></div>
                    <div className="grid2"></div>
                    <div className="grid3"></div>
                    <div className="grid4"></div>
                </div>
                <div className="craousal" onClick={() => setlayoutDesign("craousal")}>
                  <div className="craousal1"></div>
                  <div className="craousal2"></div>
                </div>
              </div>
              <div className="layout-down">
                <p>Stack</p>
                <p>Grid</p>
                <p>Carousel</p>
              </div>
            </div>
            <div className="button">
              <h3 style={{ marginTop: "1rem" }}>Button</h3>
              <div className="btn-layout">
                <p>Fill</p>
                <div className="fill">
                  <div className="fill1" onClick={() => setButtonDesign("fill1")}></div>
                  <div className="fill2" onClick={() => setButtonDesign("fill2")}></div>
                  <div className="fill3" onClick={() => setButtonDesign("fill3")}></div>
                </div>
                <p>Outline</p>
                <div className="outline">
                  <div className="outline1" onClick={() => setButtonDesign("outline1")}></div>
                  <div className="outline2" onClick={() => setButtonDesign("outline2")}></div>
                  <div className="outline3" onClick={() => setButtonDesign("outline3")}></div>
                </div>
                <p>Hard shadow</p>
                <div className="hard-shadow">
                  <div className="hard-shadow1" onClick={() => setButtonDesign("hard-shadow1")}></div>
                  <div className="hard-shadow2" onClick={() => setButtonDesign("hard-shadow2")}></div>
                  <div className="hard-shadow3" onClick={() => setButtonDesign("hard-shadow3")}></div>
                </div>
                <p>Soft shadow</p>
                <div className="soft-shadow">
                  <div className="soft-shadow1" onClick={() => setButtonDesign("soft-shadow1")}></div>
                  <div className="soft-shadow2" onClick={() => setButtonDesign("soft-shadow2")}></div>
                  <div className="soft-shadow3" onClick={() => setButtonDesign("soft-shadow3")}></div>
                </div>
                <p>Special</p>
                <div className="special">
                  <div className="special1" onClick={() => setButtonDesign("special1")}></div>
                  <div className="special2" onClick={() => setButtonDesign("special2")}></div>
                  <div className="special3" onClick={() => setButtonDesign("special3")}></div>
                </div>
                <div className="design">
                  <div className="design1" onClick={() => setButtonDesign("design1")}></div>
                  <div className="design2" onClick={() => setButtonDesign("design2")}></div>
                  <div className="design3" onClick={() => setButtonDesign("design3")}></div>
                </div>
                <p>Button color</p>
                <div className="button-color">
                  <div className="button-colorshow" style={{backgroundColor: buttonColor}}></div>
                  <div className="button-color2">
                    <h6 style={{ paddingLeft: "0.6rem" }}>Button color</h6>
                    <h6 style={{ paddingLeft: "0.6rem" }}><input type="text" placeholder="#ffffff" value={buttonColor} onChange={(e) => setbuttonColor(e.target.value)}/></h6>
                  </div>
                </div>

                <p>Button font color</p>
                <div className="button-color">
                  <div className="button-font" style={{backgroundColor: buttonFontColor}}></div>
                  <div className="button-color2">
                    <h6 style={{ paddingLeft: "0.6rem" }}>Button font color</h6>
                    <h6 style={{ paddingLeft: "0.6rem" }} ><input placeholder="#000000" type="text" value={buttonFontColor} onChange={(e) => {setbuttonFontColor(e.target.value)}} /></h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="font">
              <h3>Fonts</h3>
              <div className="font-design">
                <p>Font</p>
                <div className="font-colorselect">
                  <div className="font-colorshow" style={{fontFamily: fontType}}>Aa</div>
                  <div className="font-color2">
                    <h6 style={{ paddingLeft: "0.6rem" }}><input type="text" value={fontType} onChange={(e) => setFontType(e.target.value)} placeholder="DM Sans" /></h6>
                  </div>
                </div>
                <p>Color</p>
                <div className="color">
                  <div className="button-font" style={{backgroundColor: fontColor}}></div>
                  <div className="color2">
                    <h6 style={{ paddingLeft: "0.6rem" }}>color</h6>
                    <h6 style={{ paddingLeft: "0.6rem" }}><input placeholder="#ffffff" type="text" value={fontColor} onChange={(e) => {setfontColor(e.target.value)}} /></h6>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
            <div className="theme">
              <h3>Theme</h3>
              <div className="theme-layout">
                <div className="theme-uppar">
                  <img src={snow} alt="" className="theme-uppar1" onClick={() => settheme("air-snow")}/>
                  <img src={gray} alt="" className="theme-uppar1" onClick={() => settheme("air-gray")}/>
                  <img src={smoke} alt="" className="theme-uppar1" onClick={() => settheme("air-smoke")}/>
                  <img src={black} alt="" className="theme-uppar1" onClick={() => settheme("air-black")}/>
                </div>
                <div className="theme-colorname">
                  <p>Air-snow</p>
                  <p>Air-gray</p>
                  <p>Air-smoke</p>
                  <p>Air-black</p>
                </div>

                <div className="theme-uppar2">
                  <img src={blue} alt="" className="theme-uppar5" onClick={() => settheme("mineral-blue")}/>
                  <img src={green} alt="" className="theme-uppar6" onClick={() => settheme("mineral-green")}/>
                  <img src={orange} alt="" className="theme-uppar7" onClick={() => settheme("mineral-orange")}/>
                </div>
                <div className="theme-colorname2">
                  <p>Mineral-blue</p>
                  <p>Mineral-green</p>
                  <p>Mineral-orange</p>
                </div>
              </div>
            </div>
            <div className="layout-savebtn">
              <button onClick={handleSubmit}>Save</button>
            </div>
          </div>
        </div>
        <div className="mobile-appearlayoout">
          <MobileLayout key={buttonDesign + layoutDesign + theme} buttons={buttonDesign} layout={layoutDesign} theme={theme} />
          
          </div>
      </div>
      <ToastContainer/>
    </>
  );
}

export default Appearance;
