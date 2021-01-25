import "./Tab.css";
import { AiFillCloseCircle } from "react-icons/ai";

function Tab(props) {
  const {
    tab,
    index,
    activeTab,
    setActiveTab,
    removeAddedTab,
    handleDrag,
    handleDrop
  } = props;
  return (
    <>
      <div
        draggable={true}
        className={`tab ${activeTab === index ? "active" : ""}`}
        id={tab.id}
        onDragOver={ev => ev.preventDefault()}
        onDragStart={handleDrag}
        onDrop={handleDrop}
      >
        <span
          onClick={() => {
            setActiveTab(index);
          }}
        >
          {tab.tabName}
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
