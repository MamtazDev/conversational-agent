/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";

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

  const chatContainerRef = useRef(null);

  const maxRows = 4; // Maximum number of rows allowed
  const lineHeight = 20; // Line height of the textarea

  const handleChange = (event) => {
    setText(event.target.value);
    setNewVassHistory(event.target.value);
    adjustTextareaHeight();
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const chatContainer = chatContainerRef.current;
      const lastChatMessage = chatContainer.lastElementChild;
      if (lastChatMessage) {
        lastChatMessage.scrollIntoView({ behavior: "smooth" });
      }
    }
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

        const habijabi = document.getElementById("nipa");
        habijabi.scrollTo({ bottom: 0, right: 0, behavior: "smooth" });
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

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const sanitizeData = (data) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "text/html");
    const aTags = doc.getElementsByTagName("a");
    for (let i = 0; i < aTags.length; i++) {
      aTags[i].setAttribute("target", "_blank");
    }
    return doc.body.innerHTML;
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
                  __html: sanitizeData(initialAnswer),
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
        <div ref={chatContainerRef} className="chatting">
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

                  {loading && lastElement === chat ? (
                    <p>
                      <img width={30} height={30} src={load} alt="" />
                    </p>
                  ) : (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: sanitizeData(chat[1]),
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
