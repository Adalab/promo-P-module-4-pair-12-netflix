import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Header.scss';

const Header = (props) => {
  const renderUnloggedUserLinks = () => {
    if (props.isUserLogged === false)
      return (
        <>
          <li className="header__navItem">
            <Link className="header__navLink" to="/login">
              Login
            </Link>
          </li>
          <li className="header__navItem">
            <Link className="header__navLink" to="/signup">
              Registro
            </Link>
          </li>
        </>
      );
  };

  const renderLoggedUserLinks = () => {
    if (props.isUserLogged === true)
      return (
        <>
          <li className="header__navItem">
            <Link className="header__navLink" to="/profile">
              Mi perfil
            </Link>
          </li>
          <li className="header__navItem">
            <Link className="header__navLink" to="/my-movies">
              Mis películas
            </Link>
          </li>
          <li className="header__navLink">
            <span className="header__navItem" onClick={props.logout}>
              Cerrar sesión
            </span>
          </li>
        </>
      );
  };

  return (
    <header className="header">
      <Link to="/">
        <h1 className="header__title">Netflix</h1>
      </Link>
      <nav>
        <ul className="header__menu">
          <li>
            <Link className="header__navLink" to="/">
              Inicio
            </Link>
          </li>
          {renderUnloggedUserLinks()}
          {renderLoggedUserLinks()}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
