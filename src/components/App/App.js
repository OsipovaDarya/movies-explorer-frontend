
import React from 'react';
import Main from '../Main/Main';
import { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import ErrorResult from '../ErrorResult/ErrorResult';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';




function App() {

  const [loggedIn, setLoggedIn] = useState(false);






  return (
    <div className="App">
      <Routes>
        <Route exact path="/"
          element={
            <>
              <Header loggedIn={loggedIn} />
              <Main loggedIn={loggedIn} />
              <Footer />
            </>}
        />
        <Route path='/movies'
          element={
            <>
              <Header loggedIn={true} />
              <Movies loggedIn={loggedIn} />
              <Footer />
            </>}
        />
        <Route path='/saved-movies'
          element={
            <>
              <Header loggedIn={true} />
              <SavedMovies loggedIn={loggedIn} />
              <Footer />
            </>}
        />
        <Route path='/profile' element={
          <>
            <Header loggedIn={true} />
            <Profile
              loggedIn={loggedIn}

            />
          </>
        }
        />

        <Route path='/signup' element={<Register />} />
        <Route path='/signin' element={<Login />} />

        <Route path="*" element={<ErrorResult />}></Route>
      </Routes>
    </div>
  );
}

export default App;
