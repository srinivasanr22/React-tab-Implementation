import './App.css';
import TabsContainer from './TabsContainer/TabsContainer';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <span
          className="app-link"
        >
          Tabs Implementation with React
        </span>
      </header>
       <TabsContainer/>
    </div>
  );
}

export default App;
