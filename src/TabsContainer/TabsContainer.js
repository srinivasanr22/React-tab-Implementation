import React, { useState } from "react";
import Tab from '../Tab/Tab';
import './TabsContainer.css';
import { FaAngleLeft, FaAngleRight, FaPlus } from 'react-icons/fa';

const TAB_LIMIT = 10; // Maxlimit to add tabs.
const TAB_PREFIX = 'Tab'; // TabPrefix.
const TAB_LIST = ['Tab1', 'Tab2', 'Tab3']; // Default Tabs.
const  TAB_TITLE_WIDTH = 930; // in px.
function TabsContainer() {
    // setting state for active tab.
    const [activeTab, handleTab] = useState(0);
    const [leftChevronIcon, setLeftChevronIcon] = useState(false);
    const [rightChevronIcon, setRightChevronIcon] = useState(false);
    const [tabs, setTabs] = useState(TAB_LIST);

    /***
     * This function will trigger when user click on the + icon.
     * LIMIT - Max user can add 10 tabs.
     */
    const addNewTab = () => {
        const tabLength = tabs.length;
        if(tabLength < TAB_LIMIT) {
           const tabName = `${TAB_PREFIX}${tabLength + 1}`;
           setTabs([...tabs, tabName]);
        }
    }

    /***
     * This function will trigger when user 
     * click on the remove icon from the tab.
     * @param{number} - index - Tab item to be removed.
     */
    const removeAddedTab = (index) => {
       console.log(index);
    }

     return (
      <div className="container">
         <div className="tabs-container">
            <div className="tabs-header">
              <FaAngleLeft  className={ leftChevronIcon ? 'icon' : 'icon disable-icon'}/>
              <div className="tab-title">
              {
                  tabs.map((item, index) => <Tab tabName={item} index={index} key={index} activeTab={activeTab} handleTab={handleTab}/>)
              }
              </div>
              <FaAngleRight  className={ rightChevronIcon ? 'icon' : 'icon disable-icon'}/>
               <FaPlus title="Max Tab limit 10" onClick={addNewTab}
                    className={ tabs.length === TAB_LIMIT ? 'icon disable-icon' : 'icon'}/>
            </div>
            <div className="tab-content">
                 {`Active Content for Tab ${activeTab + 1}`}
             </div>
         </div>
      </div>
    );
  }
  
export default TabsContainer;
  