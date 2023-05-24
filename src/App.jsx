import { useState } from "react";
import "./App.css";
import Conversation from "./components/Conversation";
import Footer from "./components/Footer";
import Header from "./components/Header";
import messenger from "./assets/ai-face.png";

function App() {
  const [display, setDisplay] = useState(false);
  const [vaasId, setVaasId] = useState(null);
  const [initialAnswer, setinitialAnswer] = useState(null);
  const [loading, setLoading] = useState(false);

  const initialApi = (Base_api) => {
    setLoading(true);
    fetch(Base_api, {
      headers: {
        "VAAS-API-Key": "test-x0848bd789fjk13",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Initial route: ", data.vaas_sid);
        setVaasId("Vas_id", data.vaas_sid);
        setinitialAnswer(data.answer);
        setLoading(false);
      });
  };

  const chatHandler = () => {
    const url = "https://testenv.innobyteslab.com/vaas/";
    initialApi(url);
  };
  return (
    <div>
      {display && (
        <div className="virtual_agent">
          <Header display={display} setDisplay={setDisplay} />
          <div>
            <Conversation
            loading={loading}
            setLoading={setLoading}
              display={display}
              setDisplay={setDisplay}
              vaasId={vaasId}
              setVaasId={setVaasId}
              initialAnswer={initialAnswer}
              setinitialAnswer={setinitialAnswer}
            />

            <Footer />
          </div>
        </div>
      )}

      <img
        onClick={() => {
          setDisplay(!display);
          chatHandler();
        }}
        className="sms_icon img-fluid"
        src={messenger}
        alt=""
      />
    </div>
  );
}

export default App;
