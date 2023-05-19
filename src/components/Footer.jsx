import calender from "../assets/calender.png";
import text from "../assets/text.png";
import call from "../assets/call.png";
const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer_inner">
          <div className="btn_group">
            <button className="violet_btn">
              <img src={calender} alt="" />
              <span>Book an Appointment</span>
            </button>
            <button className="violet_btn">
              <img src={text} alt="" />
              <span>Text Us</span>
            </button>
            <button className="warning_btn">
              <img src={call} alt="" />
              <span>Quick Call</span>
            </button>
          </div>
          <p>Powered by Veryverse</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
