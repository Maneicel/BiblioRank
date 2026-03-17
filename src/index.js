import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
<<<<<<< HEAD
import BookSub from './pages/BookSub';
import BookResult from './pages/BookResult';
import Header from './pages/Header';
import UserMain from './pages/UserMain';
import SignUpCard from './pages/login/SignUpCard';
=======
import BookSub from './page/bookSub';
import BookResult from './page/bookResult';
import Header from './page/Header';
>>>>>>> c331326f55cad6ff24acb8720841fb504131bc51

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        <Route index element={<BookResult/>}/>
        <Route path="/book_sub" element={<BookSub/>}/>

<<<<<<< HEAD
        <Route path="/user_main" element={<UserMain/>}/>
        <Route path="/sign_up" element={<SignUpCard/>}/>

=======
>>>>>>> c331326f55cad6ff24acb8720841fb504131bc51
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
