import { useState } from 'react';
import './App.css';
import SideBar from './components/SideBar.jsx';
import TaskViewer from './components/TaskViewer.jsx';

function App() {
  const [count, setCount] = useState({ total: 0, importantTaskCount: 0, notImportantTaskCount: 0 });
  const [activeMenu, setActiveMenu] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state

  function setData(data) {
    setActiveMenu(data);
  }

  function toggleSideBar(t) {
    setIsSidebarOpen(t); // Update state with the passed value (true/false)
  }

  return (
    <>
      <div className='app-layout'>
        <SideBar count={count} propName={setData} toggle={isSidebarOpen} />
        <TaskViewer setCount={setCount} activeMenu={activeMenu} toggleSideBar={toggleSideBar} />
      </div>
    </>
  );
}

export default App;
