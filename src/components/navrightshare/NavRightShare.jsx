import React, { useEffect, useState } from "react";
import "./NavRightShare"

function NavRightShare() {
  let data = JSON.parse(localStorage.getItem("user"));
  const [name, setname] = useState("");    

  useEffect(() => {
    if(data) {
      setname(data.firstname + " " + data.lastname);
    }
  }, [])
  
  return (
    <>
      <div className="link-nav">
        <div className="link-username">
          <p className="link-para1">
            <span>Hi,</span> {name}!
          </p>
          <p className="link-para2">
            Congratulations . You got a great response today .{" "}
          </p>
        </div>
      </div>
    </>
  );
}

export default NavRightShare;
