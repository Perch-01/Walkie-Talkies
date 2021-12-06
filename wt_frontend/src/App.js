import Routes from '../src/router';
import React, { useEffect } from 'react';
import './App.css';
function App() {
  useEffect(() => {
    document.title = "Walkie Talkies"
  }, []);
  return (
    <div id={"container"}>
      <img
        draggable={"false"}
        src={'./backgroundLeft.svg'}
        id={"backgroundLeft"}
        alt={''}
      />
      <Routes />
    </div>
  );
}

export default App;
