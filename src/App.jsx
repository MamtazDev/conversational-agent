import "./App.css";
import Conversation from "./components/Conversation";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <div className="virtual_agent">
      <Header />
      <div>
        <Conversation />
        <Footer />
      </div>
    </div>
  );
}

export default App;
