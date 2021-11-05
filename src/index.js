import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Graph from './routes/graph';
import Media from './routes/media';
import Clipboard from './routes/clipboard';

ReactDOM.render(
  <BrowserRouter>
    <App />
    <Routes>
      <Route path="/" element={<Graph />} />
      <Route path="/graph" element={<Graph />} />
      <Route path="media" element={<Media />} />
      <Route path="clipboard" element={<Clipboard />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);