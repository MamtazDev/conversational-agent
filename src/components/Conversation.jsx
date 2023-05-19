
import aiFace from "../assets/favicon.png";
import user from "../assets/user.png";

const Conversation = () => {
  return (
    <div className="conversation">
      <div className="container">
        <div className="answer">
          <img src={aiFace} alt="" />
          <p>
            Welcome to VA Chat. I’m your personal assistant ot the company and
            its service. How may I help you today?
          </p>
        </div>
        <div className="question">
          <p>Do you provide me consulting services? Which ones?</p>
          <img src={user} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Conversation;
