import { FaArrowLeft } from "react-icons/fa";
import './TopBar.css';

const TopBar = ({ title = "Profile setup", onBack }) => {
  return (
    <div className="topbar-container">
      <button className="back-button" onClick={onBack}>
        <FaArrowLeft size={18} />
      </button>
      <h3 className="topbar-title">{title}</h3>
    </div>
  );
};

export default TopBar;
