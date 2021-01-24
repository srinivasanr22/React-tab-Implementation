import "./Tab.css";
import { AiFillCloseCircle } from "react-icons/ai";

function Tab(props) {
  const { tabName, index, activeTab, setActiveTab, removeAddedTab } = props;
  return (
    <>
      <div className={`tab ${activeTab === index ? "active" : ""}`}>
        <span
          onClick={() => {
            setActiveTab(index);
          }}
        >
          {tabName}
        </span>
        {index > 2 ? (
          <span className="close-icon">
            <AiFillCloseCircle onClick={() => removeAddedTab(index)} />
          </span>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Tab;