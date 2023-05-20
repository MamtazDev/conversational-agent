import aiFace from "../assets/ai-face.png";
import user from "../assets/user.png";
import send from "../assets/send.png";
import like from "../assets/like.png";
import dislike from "../assets/dislike.png";
import messenger from "../assets/ai-face.png";
import { useRef, useState } from "react";

const Conversation = () => {
  const [vassHistory, setVaasHistory] = useState([]);
  const [newVassHistory, setNewVassHistory] = useState("");
  const [display, setDisplay] = useState(false);
  const [text, setText] = useState("");

  const [vaasId, setVaasId] = useState(null);

  const textareaRef = useRef(null);

  const maxRows = 4; // Maximum number of rows allowed
  const lineHeight = 20; // Line height of the textarea

  const handleChange = (event) => {
    // setText(event.target.value);
    setNewVassHistory(event.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      const rowCount = textareaRef.current.value.split("\n").length;
      const calculatedHeight = rowCount * lineHeight;

      if (rowCount > maxRows) {
        textareaRef.current.style.overflowY = "auto";
        textareaRef.current.style.height = `${maxRows * lineHeight}px`;
      } else {
        textareaRef.current.style.overflowY = "hidden";
        textareaRef.current.style.height = `${calculatedHeight}px`;
      }
    }
  };

  const initialApi = () => {
    fetch("https://testenv.innobyteslab.com/vaas/", {
      headers: {
        "VAAS-API-Key": "test-x0848bd789fjk13",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setVaasId(data.vaas_sid);
      });
  };

  const chatHandler = () => {
    initialApi();
  };

  const handleUpdate = () => {
    const apiKey = "test-x0848bd789fjk13";
    // const vaasSid = "83b04e59fc7403b2848f279fa2722c73";
    const question = "why are you";

    fetch("https://testenv.innobyteslab.com/vaas/history/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "VAAS-API-Key": apiKey,
        "vaas_sid": vaasId,
        "question": question,
      },
      body: JSON.stringify({ data: newVassHistory }),
    })
      .then((response) => {
     
        console.log("Data updated successfully");
        setVaasHistory(newVassHistory); 
        setNewVassHistory(""); 
      })
      .catch((error) => {
     
        console.error("Error updating data:", error);
      });
  };

  return (
    <div className="conversation">
      <div className="container">
        {display && (
          <>
            <div className="chatting">
              {vassHistory.length &&
                vassHistory.map((chat, index) => (
                  <div key={index}>
                    <div className="answer">
                      <img src={aiFace} alt="" />
                      <p>{chat.answer}</p>
                      <div className="reaction">
                        <img src={like} alt="" />
                        <img src={dislike} alt="" />
                      </div>
                    </div>
                    <div className="question">
                      <p>{chat.question}</p>
                      <img src={user} alt="" />
                    </div>
                  </div>
                ))}
            </div>
            <div className="input_field">
              <div className="user_input">
                <textarea
                  ref={textareaRef}
                  value={newVassHistory}
                  onChange={handleChange}
                  placeholder="Type your question here.... (Scribe tu pregunta aqui....)"
                />

                <button onClick={handleUpdate}>
                  <img src={send} alt="" />
                </button>
              </div>
            </div>
          </>
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
    </div>
  );
};

export default Conversation;
