import { useEffect, useState } from "react";
import "./App.css";
import Conversation from "./components/Conversation";
import Footer from "./components/Footer";
import Header from "./components/Header";
import messenger from "./assets/ai-face.png";

function App() {
  const [display, setDisplay] = useState(false);
  const [config, setConfig] = useState([]);
  const [vaasId, setVaasId] = useState(null);
  const [initialAnswer, setinitialAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [responseHandeler, setResponseHandeler] = useState();

  const initialApi = (Base_api) => {
    setLoading(true);
    fetch(Base_api, {
      headers: {
        "VAAS-API-Key": "test-x0848bd789fjk13",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setVaasId("Vas_id", data.vaas_sid);
        setinitialAnswer(data.answer);
        setLoading(false);
      });
  };

  const chatHandler = () => {
    const url = "https://testenv.innobyteslab.com/vaas/";
    initialApi(url);
  };

  useEffect(() => {
    fetch("https://testenv.innobyteslab.com/vaas/config/", {
      headers: {
        "VAAS-API-Key": "test-x0848bd789fjk13",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setConfig(data);
      });
  }, []);

  return (
    <div>
      {display && (
        <div className="virtual_agent">
          <Header
            config={config}
            display={display}
            setDisplay={setDisplay}
            setText={setText}
            responseHandeler={responseHandeler}
            setResponseHandeler={setResponseHandeler}
          />
          <div>
            <Conversation
              config={config}
              loading={loading}
              setLoading={setLoading}
              display={display}
              setDisplay={setDisplay}
              vaasId={vaasId}
              setVaasId={setVaasId}
              initialAnswer={initialAnswer}
              setinitialAnswer={setinitialAnswer}
              text={text}
              setText={setText}
              responseHandeler={responseHandeler}
              setResponseHandeler={setResponseHandeler}
            />

            <Footer config={config} />
          </div>
        </div>
      )}

      <img
        width={60}
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
