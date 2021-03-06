import React, { useState, useRef } from "react";
import Tab from "../Tab/Tab";
import "./TabsContainer.css";
import { FaAngleLeft, FaAngleRight, FaPlus } from "react-icons/fa";

// some constants.
const TAB_LIMIT = 10; // Maxlimit to add tabs.
const TAB_PREFIX = "Tab"; // TabPrefix.
const TAB_LIST = [
  { tabName: "Tab1", order: 1, id: "tab_1" },
  { tabName: "Tab2", order: 2, id: "tab_2" },
  { tabName: "Tab3", order: 3, id: "tab_3" }
]; // Default Tabs.
const TAB_WIDTH = 175; // default tab width in px;

function TabsContainer() {
  // setting state for active tab.
  const [activeTab, setActiveTab] = useState(0);
  const [dragId, setDragId] = useState();
  const [leftChevronIcon, setLeftChevronIcon] = useState(false);
  const [rightChevronIcon, setRightChevronIcon] = useState(false);
  const [tabs, setTabs] = useState(TAB_LIST);
  const tabReference = useRef(null);

  /***
   * This function will trigger when user click on the + icon.
   * LIMIT - Max user can add 10 tabs.
   */
  const addNewTab = () => {
    const tabLength = tabs.length;
    if (tabLength < TAB_LIMIT) {
      const tabName = `${TAB_PREFIX}${tabLength + 1}`;
      const tabObj = {
        tabName: `${tabName}_cust`,
        order: tabLength + 1,
        id: `${tabName}_cust`
      };
      setTabs([...tabs, tabObj]);
      resetAccessToIcons();
    }
  };

  /***
   * This function will trigger when user
   * click on the remove icon from the tab.
   * After Removing set previous tab as active.
   * @param{number} - index - Tab item to be removed.
   */
  const removeAddedTab = index => {
    setTabs(tab => tab.filter((item, i) => i !== index));
    if (index === activeTab) {
      setActiveTab(prevState => prevState - 1);
    }
  };

  /**
   * This function will used to enable / disable
   * left / right chevron icons, based on the
   * element position.
   */
  const resetAccessToIcons = () => {
    const tabLength = tabs.length;
    if (TAB_WIDTH * tabLength > 750) {
      setRightChevronIcon(true);
    }
    // Enable / disable Chevron icons.
    if (!tabReference) {
      return;
    }
    // for left side icon
    const titleContainerWidth =
      tabReference && tabReference.current.offsetWidth;
    tabReference.current.scrollLeft > 0
      ? setLeftChevronIcon(true)
      : setLeftChevronIcon(false);
    // for right side icon
    const totalWidth = tabReference.current.scrollLeft + titleContainerWidth;
    if (tabReference.current.scrollWidth > tabReference.current.clientWidth) {
      const hasMaxLimit = Math.round(totalWidth / TAB_WIDTH) >= 10;
      hasMaxLimit ? setRightChevronIcon(false) : setRightChevronIcon(true);
    }
  };

  /**
   * This function will set the scroll position based on the interaction
   * either left side / right side.
   * @param {string} position - to figure-out the scroll position.
   */
  const moveElm = position => {
    if (tabReference) {
      if (position === "RIGHT") {
        tabReference.current.scrollLeft += TAB_WIDTH;
        resetAccessToIcons("LEFT_ICON");
      } else {
        tabReference.current.scrollLeft -= TAB_WIDTH;
        resetAccessToIcons("RIGHT_ICON");
      }
    }
  };

  /**
   * Function use to set the DragId for tab.
   * @param {event} ev.
   */
  const handleDrag = ev => {
    setDragId(ev.currentTarget.id);
  };

  /****
   * This function will trigger on Dropping the tabs.
   * it will be responsible to the tab order arrangements.
   */
  const handleDrop = ev => {
    const dragTab = tabs.find(tab => tab.id === dragId);
    const dropTab = tabs.find(tab => tab.id === ev.currentTarget.id);
    // Hold in variable current inter-changed tabs.
    const dragTabOrder = dragTab.order;
    const dropTabOrder = dropTab.order;
    // updating tab order.
    const newTabState = tabs.map(tab => {
      if (tab.id === dragId) {
        tab.order = dropTabOrder;
      }
      if (tab.id === ev.currentTarget.id) {
        tab.order = dragTabOrder;
      }
      return tab;
    });
    // update state.
    setTabs(newTabState);
  };

  return (
    <div className="container">
      <div className="tabs-container">
        <div className="tabs-header">
          <FaAngleLeft
            onClick={() => moveElm("LEFT")}
            className={leftChevronIcon ? "icon" : "icon disable-icon"}
          />
          <div
            ref={tabReference}
            className={`tab-title ${tabs.length >= 5 ? "flex-start" : ""}`}
          >
            {tabs
              .sort((cTab, nTab) => cTab.order - nTab.order)
              .map((item, index) => (
                <Tab
                  tab={item}
                  removeAddedTab={() => removeAddedTab(index)}
                  index={index}
                  key={index}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  handleDrag={handleDrag}
                  handleDrop={handleDrop}
                />
              ))}
          </div>
          <FaAngleRight
            onClick={() => moveElm("RIGHT")}
            className={rightChevronIcon ? "icon" : "icon disable-icon"}
          />
          <FaPlus
            title="Max Tab limit 10"
            onClick={addNewTab}
            className={tabs.length === TAB_LIMIT ? "icon disable-icon" : "icon"}
          />
        </div>
        <div className="tab-content">
          {tabs[activeTab] ? `Content for ${tabs[activeTab].tabName}` : ""}
        </div>
      </div>
    </div>
  );
}

export default TabsContainer;
