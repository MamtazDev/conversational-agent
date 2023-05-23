/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";

import aiFace from "../assets/ai-face.png";
import user from "../assets/user.png";
import send from "../assets/send.png";
import liked from "../assets/liked.png";
import like from "../assets/like.png";
import disliked from "../assets/disliked.png";
import dislike from "../assets/dislike.png";

const Conversation = ({
  display,
  setDisplay,
  vaasId,
  setVaasId,
  initialAnswer,
  setinitialAnswer,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [vassHistory, setVaasHistory] = useState([]);
  const [history, setHistory] = useState([]);
  const [newVassHistory, setNewVassHistory] = useState("");
  const [apiKey, setApiKey] = useState("test-x0848bd789fjk13");
  const [text, setText] = useState("why are you");
  const textareaRef = useRef(null);

  const maxRows = 4; // Maximum number of rows allowed
  const lineHeight = 20; // Line height of the textarea

  const handleChange = (event) => {
    setText(event.target.value);
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

  const HistoryHandler = () => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "VAAS-API-Key": "test-x0848bd789fjk13",
      },
      body: JSON.stringify({
        vaas_sid: vaasId,
        question: text,
      }),
    };
    fetch("https://testenv.innobyteslab.com/vaas/history/", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data.history);
        setHistory(data.history);
      });
  };

  const updateData = (apiUrl, successMessage, errorMessage) => {
    fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "VAAS-API-Key": apiKey,
      },
      body: JSON.stringify({ data: newVassHistory }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(successMessage, data);
        setVaasHistory(data.history);
        setNewVassHistory("");
      })
      .catch((error) => {
        console.error(errorMessage, error);
      });
  };

  const handleLikeDislike = (feedback) => {
    const vaasSid = vaasId;
    const question = "who are you";
    const answer = "anything goes here";

    const apiUrl = `https://testenv.innobyteslab.com/vaas/?vaas_sid=${vaasSid}&question=${question}&answer=${answer}&feedback=${feedback}`;
    const successMessage = feedback ? "Like success:" : "Dislike success:";
    const errorMessage = feedback ? "Like error:" : "Dislike error:";

    updateData(
      // "https://testenv.innobyteslab.com/vaas/history/",
      apiUrl,
      successMessage,
      errorMessage
    );

    // Update the UI state
    setIsLiked(feedback);
    setIsDisliked(!feedback);
  };

  return (
    <div className="conversation">
      <div className="container">
        <div className="answer">
          <img src={aiFace} alt="" />
          {initialAnswer && (
            <p
              dangerouslySetInnerHTML={{
                __html: initialAnswer,
              }}
            />
          )}
          <div className="reaction">
            <img
              onClick={() => handleLikeDislike(true)}
              src={isLiked ? liked : like}
              alt=""
            />
            <img
              onClick={() => handleLikeDislike(false)}
              src={isDisliked ? disliked : dislike}
              alt=""
            />
          </div>
        </div>
        <div className="chatting">
          {history?.length > 0 &&
            history?.map((chat, index) => (
              <div key={index}>
                <div className="question">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: chat[0],
                    }}
                  />
                  <img src={user} alt="" />
                </div>
                <div className="answer">
                  <img src={aiFace} alt="" />
                  <p
                    dangerouslySetInnerHTML={{
                      __html: chat[1],
                    }}
                  />

                  <div className="reaction">
                    <img
                      onClick={() => handleLikeDislike(true)}
                      src={isLiked ? liked : like}
                      alt=""
                    />
                    <img
                      onClick={() => handleLikeDislike(false)}
                      src={isDisliked ? disliked : dislike}
                      alt=""
                    />
                  </div>
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
            <button onClick={HistoryHandler}>
              <img src={send} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;

// Looks good Mamtaz! Thank you.

// A few comments:
// 1. this appears to take the entire page -- but it's supposed to just be on overlay at
// the bottom of an existing page.
// 2. the user picture is supposed to be a simple icon
// 3. the chat icon on the bototm right opens everything (not just the text input box)
//  but the entire thing (see https://testenv.innobyteslab.com/static/converse.html)
//

// border: 1px solid whitesmoke;
// background: white;
// padding: 20px;
// border-radius: 10px;
// box-shadow: 0px 0px 16px -4px rgba(0,0,0,0.75);
// -webkit-box-shadow: 0px 0px 16px -4px rgb(243 243 243 / 28%);
// -moz-box-shadow: 0px 0px 16px -4px rgba(0,0,0,0.75);
