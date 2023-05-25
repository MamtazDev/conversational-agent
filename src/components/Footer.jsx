import calender from "../assets/calender.png";
import text from "../assets/text.png";
import call from "../assets/call.png";
const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer_inner">
          <div className="btn_group">
            <a
              target="_blank"
              href="https://squareup.com/appointments/book/fzx6h5zvy9re4e/LYG594QJD0CHT/services"
              rel="noreferrer"
            >
              <button className="violet_btn">
                <img src={calender} alt="" />
                <span>Book an Appointment</span>
              </button>
            </a>
            <button className="violet_btn">
              <img src={text} alt="" />
              <span>Text Us</span>
            </button>
            <button className="warning_btn">
              <img src={call} alt="" />
              <span>Quick Call</span>
            </button>
          </div>
          <p>
            Powered by{" "}
            <a target="_blank" href="https://www.veryverse.ai" rel="noreferrer">
              Veryverse
            </a>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
