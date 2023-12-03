
import React from 'react';
import Main from '../Main/Main';
import { useState, useEffect } from 'react';
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
import { CurrentUserContext } from '../ErrorResult/Context/CurrentUserContext';
import Navigation from '../Navigation/Navigation';
import api from '../../utils/MainApi';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { useNavigate, Navigate } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRouts/ProtectedRouts';
import { isCompositeComponent } from 'react-dom/test-utils';




function App() {

  const [loggedIn, setLoggedIn] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);


  const [isEditInfoTooltip, setIsEditInfoTooltip] = useState(false);
  const [registrForm, setRegistrForm] = useState({ status: false, text: "" });
  const [renderingloading, setRenderingloading] = useState(false);

  const navigate = useNavigate();



  function handelRegistr(name, email, password, resetFormCallBack) {
    setRenderingloading(true);
    api.register(name, email, password)
      .then((res) => {
        if (res) {
          setIsEditInfoTooltip(true)
          setRegistrForm({
            status: true,
            text: 'Вы успешно зарегистрировались!',
          })
          resetFormCallBack()
          handleLogin(email, password, resetFormCallBack)
          navigate('/movies', { replace: true })
        }
      })
      .catch((err) => {
        console.log(err)
        setRegistrForm({
          status: false,
          text: 'Что-то пошло не так! Попробуйте ещё раз.',
        })
        setIsEditInfoTooltip(true);
      })
      .finally(() => setRenderingloading(false))
  }

  function handleLogin(email, password, resetFormCallBack) {
    setRenderingloading(true);
    api.login(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token)
        api.setAuthToken(data.token)
        resetFormCallBack();
        setLoggedIn(true)
        navigate("/movies", { replace: true })
      })
      .catch(() => {
        setRegistrForm({
          status: false,
          text: 'Не правильная почта или пароль',
        })
        setIsEditInfoTooltip(true);
      })
      .finally(() => setRenderingloading(false));
  }

  useEffect(() => {
    if (loggedIn) {
      setRenderingloading(true);
      Promise.all([api.getInfo(), api.getSavedMovies()])
        .then(([user, movies]) => {
          console.log(user, 'afsafsafasfasf')
          setCurrentUser(user);
          setSavedMovies(movies);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => { console.log("loggedIn::finally") });
    }
  }, [loggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      api
        .checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
          signOut();

        });
    } else
      setLoggedIn(false);
  }, []);


  function closeAllPopups() {
    setIsEditInfoTooltip(false)
    setRenderingloading(false)
  }

  function signOut() {
    setLoggedIn(false);
    setCurrentUser({});
    setSavedMovies([]);
    navigate('/');
    api.checkToken('');
    localStorage.clear();
  };



  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser, savedMovies, setSavedMovies }} >
      <div className="app">
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
              <ProtectedRoute loggedIn={loggedIn}>
                <>
                  <Header loggedIn={loggedIn} />
                  <Movies loggedIn={loggedIn} />
                  <Footer />
                </>
              </ProtectedRoute>
            }

          />
          <Route path='/saved-movies'

            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <>
                  <Header loggedIn={loggedIn} />
                  <SavedMovies loggedIn={loggedIn} />
                  <Footer />
                </>
              </ProtectedRoute>
            }

          />
          <Route path='/profile' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <>
                <Header loggedIn={loggedIn} />
                <Profile
                  onSignOut={signOut}
                  setIsEditInfoTooltip={setIsEditInfoTooltip}
                  setRegistrForm={setRegistrForm}
                />
                <InfoTooltip
                  onClose={closeAllPopups}
                  isOpen={isEditInfoTooltip}
                  registrForm={registrForm}
                ></InfoTooltip>
              </>
            </ProtectedRoute>
          }
          />

          <Route path='/signup' element={
            loggedIn ?
              <Navigate to='/movies' />
              :
              <Register
                renderingloading={renderingloading}
                handelRegistr={handelRegistr}
              />
          }
          />

          <Route path='/signin' element={
            loggedIn ?
              <Navigate to='/movies' />
              :
              <Login
                handleLogin={handleLogin}
                renderingloading={renderingloading}
              />
          }
          />
          <Route path="*" element={<ErrorResult />}></Route>
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
