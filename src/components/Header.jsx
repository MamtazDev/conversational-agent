import logo from "../assets/logo.png";
import close from "../assets/close.png";
import arrow from "../assets/down-arrow.png";
import { useState } from "react";

const Header = ({ display, setDisplay,setText,responseHandeler,
  setResponseHandeler }) => {
  const [dropdown,setDropdown]=useState("Short Response")

  const handleDropDown=(content)=>{
    setDropdown(content)

    if(content==="Detailed Response"){
      setText("Please provide me detail answer")
      setResponseHandeler("dt")
    }
    if(content==="Short Response"){
      setText("Please provide me short answer")
      setResponseHandeler("sh")
    }
  }
  return (
    <div className="header">
      <div className="container">
        <nav className="navbar navbar-expand-lg ">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img src={logo} alt="" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <div className="ms-auto header_buttons">
                <div className="dropdown">
                  <button
                    className="btn dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                   {dropdown}{" "}
                    <img style={{ marginLeft: "10px" }} src={arrow} alt="" />
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      {dropdown ==="Short Response"?<a className="dropdown-item" href="#" onClick={()=>handleDropDown("Detailed Response")}>
                      Detailed Response
                      </a>
                      :
                      <a className="dropdown-item" href="#" onClick={()=>handleDropDown("Short Response")}>
                      Short Response
                      </a>}
                      
                    </li>
                  </ul>
                </div>
                <button onClick={() => setDisplay(false)} className="close_btn">
                  <img src={close} alt="" />
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
