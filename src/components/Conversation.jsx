import aiFace from "../assets/ai-face.png";
import user from "../assets/user.png";
import send from "../assets/send.png";
import like from "../assets/like.png";
import dislike from "../assets/dislike.png";
import { useRef, useState } from "react";

const Conversation = () => {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  const maxRows = 4; // Maximum number of rows allowed
  const lineHeight = 20; // Line height of the textarea

  const handleChange = (event) => {
    setText(event.target.value);
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
  return (
    <div className="conversation">
      <div className="container">
        <div className="chatting">
          {[1, 2, 3, 4, 5, 6, 7, 5, 6, 7, 8, 9].map((chat, index) => (
            <div key={index}>
              <div className="answer">
                <img src={aiFace} alt="" />
                <p>
                  Welcome to VA Chat. I’m your personal assistant ot the company
                  and its service. How may I help you today? 
                </p>
                <div className="reaction">
                  <img src={like} alt="" />
                  <img src={dislike} alt="" />
                </div>
              </div>
              <div className="question">
                <p>Do you provide me consulting services? Which ones?</p>
                <img src={user} alt="" />
              </div>
            </div>
          ))}
        </div>
        <div className="input_field">
          <div className="user_input">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={handleChange}
              placeholder="Type your question here.... (Scribe tu pregunta aqui....)"
            />

            <button>
              <img src={send} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
