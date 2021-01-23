import './Tab.css';

function Tab(props) {
    const {tabName, index, activeTab, handleTab} = props;
    return (
      <div className={`tab ${activeTab === index ? 'active' : ''}`} 
      onClick={() => {
        handleTab(index);
      }} >
       {tabName}
      </div>
    );
  }
  
export default Tab;