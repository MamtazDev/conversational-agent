import { useState } from "react";
import "./App.css";
import Conversation from "./components/Conversation";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  const [display, setDisplay] = useState(false);
  return (
    <div className="virtual_agent">
      <Header display={display} setDisplay={setDisplay}/>
      <div>
        <Conversation display={display} setDisplay={setDisplay} />
        <Footer />
      </div>
    </div>
  );
}

export default App;
