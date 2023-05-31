import { useEffect, useState } from "react";
import "./App.css";
import Conversation from "./components/Conversation";
import Footer from "./components/Footer";
import Header from "./components/Header";
import messenger from "./assets/ai-face.png";
import ModalExample from "./Moda";

function App() {
  const [display, setDisplay] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [config, setConfig] = useState([]);
  const [vaasId, setVaasId] = useState(null);
  const [initialAnswer, setinitialAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const [text, setText] = useState("");
  const [responseHandeler, setResponseHandeler] = useState();

  const initialApi = (Base_api) => {
    setInitialLoading(true);
    fetch("https://testenv.innobyteslab.com/vaas/", {
      headers: {
        "VAAS-API-Key": "test-x0848bd789fjk13",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data,"initial api");
        setVaasId(data.vaas_sid);
        setClicked(true);
        setinitialAnswer(data.answer);
        setInitialLoading(false);
      });
  };

  const chatHandler = () => {
    const url = "https://testenv.innobyteslab.com/vaas/";
    if (!clicked) {
      initialApi(url);
    }
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
              initialLoading={initialLoading}
              text={text}
              setText={setText}
              responseHandeler={responseHandeler}
              setResponseHandeler={setResponseHandeler}
              history={history}
              setHistory={setHistory}
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


      {/* <ModalExample/> */}
    </div>
  );
}

export default App;
