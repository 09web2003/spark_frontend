import React, { useEffect, useState } from "react";
import "./Showhidelink.css";

function Showhidelink({item}) {
  return (
    <>
      <div className="showhidebtn-main">
        <div className="showhidebtn">
            <h3>{item.name}</h3>
            <div className="link-addbtn">
                <p>{item.url}</p>
            </div>
        </div>
      </div>
    </>
  );
}

export default Showhidelink;
