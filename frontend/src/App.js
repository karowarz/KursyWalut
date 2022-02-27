import React, { useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './styles/App.scss';

import AuthService from './services/auth.service';

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import BoardUser from './components/BoardUser';
import BoardAdmin from './components/BoardAdmin';
import Calculator from './components/Calculator';
import EventBus from './common/EventBus';

const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [hamburgerOpen, setHamburgerOpen] = useState(true);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes('ROLE_ADMIN'));
    }

    EventBus.on('logout', () => {
      logOut();
    });

    return () => {
      EventBus.remove('logout');
    };
  }, []);

  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  };
  const logOut = () => {
    AuthService.logout();
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };
  const Hamburger = (props) => {
    return (
      <>
        <div className="hamburger" onClick={props.onClick}>
          <div
            className={`hamburger-burger ${
              hamburgerOpen ? 'burger1' : 'burger1--open'
            }`}
          ></div>
          <div
            className={`hamburger-burger ${
              hamburgerOpen ? 'burger2' : 'burger2--open'
            }`}
          ></div>
          <div
            className={`hamburger-burger ${
              hamburgerOpen ? 'burger3' : 'burger3--open'
            }`}
          ></div>
        </div>
      </>
    );
  };

  return (
    <>
      <nav className="navbar">
        <Link to={'/'} className="navbar-logo">
          <p className="navbar__logo">Kursy Walut</p>
        </Link>

        <div
          className={
            hamburgerOpen
              ? 'navbar__flexElements'
              : 'navbar__flexElements--open'
          }
        >
          <Link to={'/'} className="navbar-element">
            <p
              className={
                hamburgerOpen
                  ? 'navbar__text-1 navbar__text'
                  : 'navbar__text-1 navbar__text--open'
              }
            >
              Kursy Walut
            </p>
          </Link>

          <Link to={'/calculator'} className="navbar-element">
            <p
              className={hamburgerOpen ? 'navbar__text' : 'navbar__text--open'}
            >
              Kalkulator
            </p>
          </Link>

          {showAdminBoard && (
            <Link to={'/admin'} className="navbar-element">
              <p className="navbar__text">Panel Admina</p>
            </Link>
          )}

          {currentUser && (
            <Link to={'/user'} className="navbar-element">
              <p
                className={
                  hamburgerOpen ? 'navbar__text' : 'navbar__text--open'
                }
              >
                Panel Użytkownika
              </p>
            </Link>
          )}

          {currentUser ? (
            <a href="/login" className="navbar-element" onClick={logOut}>
              <p
                className={
                  hamburgerOpen ? 'navbar__text' : 'navbar__text--open'
                }
              >
                Wyloguj
              </p>
            </a>
          ) : (
            <>
              <Link to={'/login'} className="navbar-element">
                <p
                  className={
                    hamburgerOpen ? 'navbar__text' : 'navbar__text--open'
                  }
                >
                  Zaloguj
                </p>
              </Link>

              <Link to={'/register'} className="navbar-element">
                <p
                  className={
                    hamburgerOpen ? 'navbar__text' : 'navbar__text--open'
                  }
                >
                  Zarejestruj
                </p>
              </Link>
            </>
          )}
          <Hamburger onClick={toggleHamburger} />
        </div>
      </nav>
      <div className="">
        <Switch>
          <Route exact path={['/']} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route path="/user" component={BoardUser} />
          <Route path="/admin" component={BoardAdmin} />
          <Route path="/calculator" component={Calculator} />
        </Switch>
      </div>
    </>
  );
};

export default App;
