import { useEffect, useState } from 'react';
import './App.css';
import SideBar from './components/SideBar.jsx';
import TaskViewer from './components/TaskViewer.jsx';

function App() {
  const [count, setCount] = useState({ total: 0, importantTaskCount: 0, notImportantTaskCount: 0 });
  const [activeMenu, setActiveMenu] = useState('');

  function setData(data) {
    setActiveMenu(data)
  }

  return (
    <>
      <div className='app-layout'>
        <SideBar count={count} propName={setData} />
        <TaskViewer setCount={setCount} activeMenu={activeMenu} />
      </div>
    </>
  );
}

export default App;
