import { useState } from "react";
import "./App.css";
import Conversation from "./components/Conversation";
import Footer from "./components/Footer";
import Header from "./components/Header";
import messenger from "./assets/ai-face.png";

function App() {
  const [display, setDisplay] = useState(false);
  return (
    <div>
      {
        display &&   <div className="virtual_agent">
        <Header display={display} setDisplay={setDisplay} />
        <div>
          <Conversation display={display} setDisplay={setDisplay} />
          <Footer />
        </div>
      </div>
      }
    
      <img
        onClick={() => {
          setDisplay(!display);
          // chatHandler();
        }}
        className="sms_icon img-fluid"
        src={messenger}
        alt=""
      />
    </div>
  );
}

export default App;
