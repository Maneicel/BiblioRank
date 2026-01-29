import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import BookSub from './page/bookSub';
import BookResult from './page/bookResult';
import Header from './page/Header';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        <Route index element={<BookResult/>}/>
        <Route path="/book_sub" element={<BookSub/>}/>

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
