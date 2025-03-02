import React from "react";
import "./Navbar.css";
import dashboardimg from "../../assets/dashboardimg.png";
import girl from "../../assets/girl.png";
import boy from "../../assets/boy.png";
import bubble from "../../assets/bubble.png";
import { useNavigate } from "react-router-dom";
function Navbar({userLoggedIn}) {
  const navigate = useNavigate();

  return (
    <>
      <div className="nav-container">
        <div className="nav-left">
          <p className="nav-icon">
            <i
              className="fa-solid fa-fire-flame-curved"
              style={{ color: "#28A263", fontSize: "1.5rem" }}
            ></i>
          </p>
          <h3 className="signup-heading-logospark">SPARK</h3>
          <div className="arrow"></div>
          <p className="marketplace">Marketplace</p>
        </div>
        <div className="nav-right">

        <button className="admit-btn">Admin</button>
          <button className="nav-btn" onClick={() => navigate(userLoggedIn ? "/dashboard" : "/signup")}>
            {userLoggedIn ? "Dashboard" : "Sign up free"}
          </button>
          <p className="hamburger"><i class="fa-solid fa-bars"></i></p>
        </div>
      </div>

      <div className="hero-section">
        <div className="hero-left">
          <div className="hero-container">
            <h1 className="hero-heading">
              The easiest place to update and share your Connection
            </h1>
            <p className="hero-para">
              Help your followers discover everything you’re sharing all over
              the internet, in one simple place. They’ll thank you for it!
            </p>
            <div className="hero-btn">
              <button className="hero-btns" style={{cursor: "pointer"}} onClick={() => navigate(userLoggedIn ? "/dashboard" : "/signup")} >{userLoggedIn ? "Go to Dashboard" : "Get your free SPARk"}</button>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-img">
            <img src={dashboardimg} alt="" className="dashboardimg" />
          </div>
        </div>
      </div>
      <div className="mobile-view">
<h1 className="mobile-viewheading">The best in the class product for you today!</h1>
<p className="mobile-viewpara">This is a placeholder for your testimonials and what your client has to say, put them here and make sure its 100% true and meaningful.</p>
      </div>

      <div className="grid-overlap">
        <div className="grid-left">
          <div class="grid-container2">
            <div class="box box1">
              <p>$10</p>
            </div>
            <div class="box box2">
              <p>$20</p>
            </div>
            <div class="box box3">
              <p>$40</p>
            </div>
            <div class="box box4">
              <p>$30</p>
            </div>
            <div class="box box5">
              <div className="dollar">
                <p className="dollar-para">$</p>
              </div>
              <p className="dollar-money">$4,560</p>
              <p className="rev">Revenue</p>
            </div>
            <p className="grid-para">
              Sell products and collect payments. It’s monetization made simple.
            </p>
          </div>
        </div>
        <div className="grid-right">
          <div className="right-container">
            <h1 className="right-heading">
              Analyze your audience and keep your followers engaged
            </h1>
            <p className="right-para">
              Track your engagement over time, monitor revenue and learn what’s
              converting your audience. Make informed updates on the fly to keep
              them coming back.
            </p>
          </div>
        </div>
      </div>

      <div className="img-collect">
        <div className="heading-left">
          <div className="heading-container">
            <h1>Share limitless content in limitless ways</h1>
            <p>
              Connect your content in all its forms and help followers find more
              of what they’re looking for. Your TikToks, Tweets, YouTube videos,
              music, articles, recipes, podcasts and more… It all comes together
              in one powerful place
            </p>
          </div>
        </div>
        <div className="img-right">
          <div className="right-container2">
            <div className="right-imgall">
              <img src={bubble} alt="" className="right-img1" />
              <img src={girl} alt="" className="right-img2" />
              <img
                src={boy}
                alt=""
                className="right-img3"
              />
            </div>

            <div className="right-para2">
              <p>Share your content in limitless ways on your Spark</p>
            </div>
          </div>
        </div>
      </div>

      <div className="customer">
        <div className="customer-left">
          <div className="customer-heading">
            <h1>
              Here's what our <span>customer</span> has to says
            </h1>
            <button>Read customer stories</button>
          </div>
        </div>
        <div className="customer-right">
          <div className="right-icon">
            <p>
              <i
                class="fa-solid fa-snowflake"
                style={{ color: "#28A263", fontSize: "1.5rem" }}
              ></i>
            </p>
            <p>
              [short description goes in here] lorem ipsum is a placeholder text
              to demonstrate.
            </p>
          </div>
        </div>
      </div>

      <div className="layout-mainnav">
        <div className="layoutnav">
          <div className="itemnav itemnav1">
            <p className="item-paranav">Amazing too!! Saved me months</p>
            <p className="item-paranav2">
              This is a placeholder for your testimoniala and what your client
              has to say,put them here and make sure its 100% true and
              meaningful.
            </p>
            <div className="circlenav">
              <div className="cirnav">
                <p className="circlenav1">Jhon Master</p>
                <p className="circlenav2">Director,Spark.com</p>
              </div>
            </div>
          </div>
          <div className="itemnav itemnav2">
            <p className="item-paranav">Amazing too!! Saved me months</p>
            <p className="item-paranav2">
              This is a placeholder for your testimoniala and what your client
              has to say,put them here and make sure its 100% true and
              meaningful.
            </p>
            <div className="circlenav">
              <div className="cirnav">
                <p className="circlenav1">Jhon Master</p>
                <p className="circlenav2">Director,Spark.com</p>
              </div>
            </div>
          </div>
          <div className="itemnav itemnav3">
            <p className="item-paranav">Amazing too!! Saved me months</p>
            <p className="item-paranav2">
              This is a placeholder for your testimoniala and what your client
              has to say,put them here and make sure its 100% true and
              meaningful.
            </p>
            <div className="circlenav">
              <div className="cirnav">
                <p className="circlenav1">Jhon Master</p>
                <p className="circlenav2">Director,Spark.com</p>
              </div>
            </div>
          </div>
          <div className="itemnav itemnav4">
            <p className="item-paranav">Amazing too!! Saved me months</p>
            <p className="item-paranav2">
              This is a placeholder for your testimoniala and what your client
              has to say,put them here and make sure its 100% true and
              meaningful.
            </p>
            <div className="circlenav">
              <div className="cirnav">
                <p className="circlenav1">Jhon Master</p>
                <p className="circlenav2">Director,Spark.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="integration">
        <h1>All Link Apps and Integrations</h1>
        <div className="integration-main">
          <div className="integration1">
            <div className="inte-space">
              <p className="inte-para1">Audiomack</p>
              <p className="inte-para2">
                Add an Audiomack player to your Linktree
              </p>
            </div>
            <div className="inte-space">
              <p className="inte-para1">Books</p>
              <p className="inte-para2">Promote books on your Linktree</p>
            </div>
            <div className="inte-space">
              <p className="inte-para1">Clubhouse</p>
              <p className="inte-para2">
                Let your community in on the conversation
              </p>
            </div>
          </div>
          <div className="integration2">
            <div className="inte-space">
              <p className="inte-para1">Bandsintown</p>
              <p className="inte-para2">
                Drive ticket sales by listing your events
              </p>
            </div>
            <div className="inte-space">
              <p className="inte-para1">Buy Me A Gift</p>
              <p className="inte-para2">
                Let visitors support you with a small gift
              </p>
            </div>
            <div className="inte-space">
              <p className="inte-para1">Community</p>
              <p className="inte-para2">Build an SMS subscriber list</p>
            </div>
          </div>
          <div className="integration3">
            <div className="inte-space">
              <p className="inte-para1">Bonfire</p>
              <p className="inte-para2">Display and sell your custom merch</p>
            </div>
            <div className="inte-space">
              <p className="inte-para1">Cameo</p>
              <p className="inte-para2">
                Make impossible fan connections possible
              </p>
            </div>
            <div className="inte-space">
              <p className="inte-para1">Contact Details</p>
              <p className="inte-para2">
                Easily share downloadable contact details
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="footer-container">
          <div className="footer-uppar">

            {
              userLoggedIn ? 
              null 
              :
              <div className="footer-btn">
                <button className="footer-btn1" style={{cursor: 'pointer'}} onClick={() => navigate("/login")}>Log in</button>
                <button className="footer-btn2" style={{cursor : 'pointer'}} onClick={() => navigate('/signup')}>Sign up free</button>
              </div>
            }

            <div className="footer-content">
              <div className="footer1">
                <p className="footer-para">About Speak</p>
                <p className="footer-para">Careers</p>
                <p className="footer-para" style={{ marginLeft: "1.8rem" }}>
                  Term and Conditions
                </p>
              </div>
              <div className="footer2">
                <p className="footer-para">Blog</p>
                <p className="footer-para" style={{ marginLeft: "1.8rem" }}>
                  Getting Started
                </p>
                <p className="footer-para" style={{ marginLeft: "1.8rem" }}>
                  Privacy Policy
                </p>
              </div>
              <div className="footer3">
                <p className="footer-para">Press</p>
                <p className="footer-para" style={{ marginLeft: "1.6rem" }}>
                  Feature and How-Tos
                </p>
                <p className="footer-para">Cookie Notic</p>
              </div>
              <div className="footer4">
                <p className="footer-para">Social Good</p>
                <p className="footer-para">Faq</p>
                <p className="footer-para" style={{ marginLeft: "4.8rem" }}>
                  Trust Center
                </p>
              </div>
              <div className="footer5">
                <p className="footer-para">Contact</p>
                <p className="footer-para" style={{ marginLeft: "1rem" }}>
                  Report a Violation
                </p>
              </div>
            </div>
          </div>
          <div className="footer-down">
            <div className="down-content">
              <p>
                We acknowledge the Traditional Custodians of the land on which
                our office stands, The Wurundjeri people of the Kulin Nation,
                and pay our respects to Elders past, present and emerging.
              </p>
            </div>
            <div className="down-icon">
              <p>
                <i
                  class="fa-brands fa-twitter"
                  style={{ color: "black", fontSize: "1.5rem" }}
                ></i>
              </p>
              <p>
                <i
                  class="fa-brands fa-instagram"
                  style={{ color: "black", fontSize: "1.5rem" }}
                ></i>
              </p>
              <p>
                <i
                  class="fa-brands fa-youtube"
                  style={{ color: "black", fontSize: "1.5rem" }}
                ></i>
              </p>
              <p>
                <i
                  class="fa-brands fa-tiktok"
                  style={{ color: "black", fontSize: "1.5rem" }}
                ></i>
              </p>
              <p>
                <i
                  class="fa-solid fa-fire-flame-curved"
                  style={{ color: "black", fontSize: "1.5rem" }}
                ></i>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
