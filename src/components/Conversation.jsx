import aiFace from "../assets/favicon.png";
import user from "../assets/user.png";
import send from "../assets/send.png";

const Conversation = () => {
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
              </div>
              <div className="question">
                <p>Do you provide me consulting services? Which ones?</p>
                <img src={user} alt="" />
              </div>
            </div>
          ))}
        </div>

        <div className="user_input">
          <textarea placeholder="Type your question here.... (Scribe tu pregunta aqui....)"></textarea>

          <button>
            <img src={send} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
