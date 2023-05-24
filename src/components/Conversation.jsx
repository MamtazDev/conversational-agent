/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";

import aiFace from "../assets/ai-face.png";
import user from "../assets/user.png";
import send from "../assets/send.png";
import liked from "../assets/liked.png";
import like from "../assets/like.png";
import disliked from "../assets/disliked.png";
import dislike from "../assets/dislike.png";
import load from "../assets/loading.png";

const Conversation = ({
  display,
  setDisplay,
  vaasId,
  setVaasId,
  initialAnswer,
  setinitialAnswer,
  loading,
  setLoading,
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

  const resizeTextHandler = () => {
    setNewVassHistory("");
    // textareaRef.current.onChange()
    const calculatedHeight = 1 * lineHeight;

    textareaRef.current.style.overflowY = "auto";
    textareaRef.current.style.height = `${1 * lineHeight}px`;

    // if (textareaRef.current) {
    //   const rowCount = textareaRef.current.value.split("\n").length;
    //   const calculatedHeight = rowCount * lineHeight;

    //   if (rowCount > maxRows) {
    //     textareaRef.current.style.overflowY = "auto";
    //     textareaRef.current.style.height = `${maxRows * lineHeight}px`;
    //   } else {
    //     textareaRef.current.style.overflowY = "hidden";
    //     textareaRef.current.style.height = `${calculatedHeight}px`;
    //   }
    // }
  };

  const HistoryHandler = () => {
    setLoading(true);
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
        setNewVassHistory("");
        setLoading(false);
      });

    resizeTextHandler();
  };
  const lastElement = history[history.length - 1];

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

          {loading ? (
            <p>
              <img width={30} height={30} src={load} alt="" />
            </p>
          ) : (
            initialAnswer && (
              <p
                dangerouslySetInnerHTML={{
                  __html: initialAnswer,
                }}
              />
            )
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

                  {loading ? (
                    <p>
                      <img width={30} height={30} src={load} alt="" />
                    </p>
                  ) : (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: chat[1],
                      }}
                    />
                  )}

                  {/* <p
                    dangerouslySetInnerHTML={{
                      __html: chat[1],
                    }}
                  /> */}

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

// -pera 2. the text area does not scroll when a new question/asnwer appears -- the last question and answer should always be visible without scrolling

// -D 3. the user input area should resize to one line after the send button (when multiline question is asked). Currently it resizes only on the next question.

// -D 4. Short / detailed drop down does not appear to be working

// -D 5. there floating icon at the bottom right does not have cursor indication it is clickable

// -D 6. the links at the bottom have a cursor indication they are clickable but do nothing (I'll send you the links

// 7. the links in the text should open in a new tab (so that the conversaiton context is not lost)

// -wip 8. I could not see the spinner -- I'll make one of the euestions take more time so we test the spinner for waiting

// -D 9. the links in the asnwer are not really visible with the color of the background. Let's make them more visible
