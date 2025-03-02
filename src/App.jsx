import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import About from "./components/about/About";
import Dashboard from "./components/dashboard/Dashboard";
import Addlink from "./components/addlink/Addlink";
import Addshop from "./components/addshop/Addshop"
import { useEffect, useState } from "react";
import Setting from "./pages/setting/Setting";
import Appearance from "./pages/appearance/Appearance";
import Linkpage from "./pages/linkpage/Linkpage";
import Analytics from "./pages/analytics/Analytics";
import Userprofile from "./components/userprofile/Userprofile";
import Forgetpassword from "./components/forgetpassword/Forgetpassword"

function App() {
  const [isUserLoggedIn, setisUserLoggedIn] = useState(false);
  useEffect(() => {
    let data = localStorage.getItem("user");

    if (data) {
      setisUserLoggedIn(true);
    }
  }, []);

  return (
    <>
      {
      isUserLoggedIn ? 
          <Routes>
            <Route exact path='/dashboard' element={<Dashboard/>}>
              <Route exact path='setting/:id' element={<Setting />} />
              <Route exact path="appearance" element={<Appearance />} />
              <Route exact path="" element={<Linkpage />} />
              <Route exact path="analytics" element={<Analytics />} />
              <Route exact path="add-links/:id" element={<Addlink />} />
              <Route exact path="add-shops/:id" element={<Addshop />} />
            </Route>
            <Route exact path='/about' element={<About />} />
            <Route exact path="/:username" element={<Userprofile/>}/>
            <Route path="*" element={<Navbar userLoggedIn = {isUserLoggedIn} />} />
          </Routes>     
         :
         <Routes>
          <Route exact path='/signup' element={<Signup/>} />
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/forgotpassword' element={<Forgetpassword />} />
          <Route exact path="/:username" element={<Userprofile/>}/>
          <Route path='*' element={<Navbar/>} />  
        </Routes>
    }



    </>
  );
}

export default App;
