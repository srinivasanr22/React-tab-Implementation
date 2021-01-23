import React, { useState } from "react";
import Tab from '../Tab/Tab';
import './TabsContainer.css';
const TAB_LIMIT = 10; // Maxlimit to add tabs.
const TAB_PREFIX = 'Tab'; // TabPrefix.
const tabList = ['Tab1', 'Tab2', 'Tab3']; // Default Tabs.
function TabsContainer() {
    // setting state for active tab.
    const [activeTab, handleTab] = useState(0);
    const [tabs, addTab] = useState(tabList);

    const addNewTab = () => {
        const tabLength = tabs.length + 1;
        if(tabLength < TAB_LIMIT) {
           const tabName = `${TAB_PREFIX}${tabLength}`;
           tabList.push(tabName);
        }
    }
     return (
      <div className="container">
         <div className="tabs-container">
            <div className="tab-header">
              {
                  tabs.map((item, index) => <Tab tabName={item} index={index} key={index} activeTab={activeTab} handleTab={handleTab}/>)
              }
              <div className={ tabList.length + 1 === TAB_LIMIT ? 'disable-add-icon' : ''}> + </div>
            </div>
            <div className="tab-content">
                 {`Active Content for Tab ${activeTab}`}
             </div>
         </div>
      </div>
    );
  }
  
export default TabsContainer;
  