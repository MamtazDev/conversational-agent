import logo from "../assets/ai-face.png";
import close from "../assets/close.png";
import arrow from "../assets/down-arrow.png";
import { useState } from "react";

const Header = ({
  config,
  display,
  setDisplay,
  setText,
  responseHandeler,
  setResponseHandeler,
}) => {
  const [dropdown, setDropdown] = useState("Short Response");

  const handleDropDown = (content) => {
    setDropdown(content);

    if (content === "Detailed Response") {
      setText("Please provide  detail answers");
      setResponseHandeler("dt");
    }
    if (content === "Short Response") {
      setText("Please provide  short answers");
      setResponseHandeler("sh");
    }
  };
  return (
    <div className="header">
      <div className="container">
        <nav className="navbar navbar-expand-lg ">
          <div className="container-fluid">
            <p
              style={{
                backgroundColor: config.title_bg_color
                  ? config.title_bg_color
                  : "white",
                fontSize: config.title_text_size
                  ? config.title_text_size
                  : "16px",
                color: config.title_text_color
                  ? config.title_text_color
                  : "#6242B5",
              }}
              className="navbar-brand"
              href="#"
            >
              <img
                width={50}
                style={{ marginRight: "16px" }}
                src={config.logo ? config.logo : logo}
                alt=""
              />
              {config.title ? config.title : "Virtual Assistant"}
            </p>
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
                      {dropdown === "Short Response" ? (
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => handleDropDown("Detailed Response")}
                        >
                          Detailed Response
                        </a>
                      ) : (
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => handleDropDown("Short Response")}
                        >
                          Short Response
                        </a>
                      )}
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
