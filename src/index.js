import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 下面這兩行的意思是：找到那個叫 'root' 的箱子，把 App 放進去
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);