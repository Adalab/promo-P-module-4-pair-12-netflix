import React, { useState } from 'react';
import '../stylesheets/SignUp.scss';

const SignUp = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // events
  const handleName = (ev) => {
    setName(ev.target.value);
  };

  const handleEmail = (ev) => {
    setEmail(ev.target.value);
  };

  const handlePassword = (ev) => {
    setPassword(ev.target.value);
  };

  const handleForm = (ev) => {
    ev.preventDefault();
    // Enviamos los datos a App y este al API
    props.sendSingUpToApi({
      name: name,
      email: email,
      password: password,
    });
  };

  // render

  const renderErrorMessage = () => {
    // Si el API ha devuelto un error, APP lo guarda en el estado y nos lo pasa
    if (props.signUpErrorMessage !== '') {
      return (
        <p className="border--medium border--warning mt-1">
          Error en el registro:{' '}
          <span className="text--bold">{props.signUpErrorMessage}</span>
        </p>
      );
    }
  };

  return (
    <section className="main__section3">
      <h1 className="main__section3--title">Regístrate</h1>
      <form onSubmit={handleForm} className="main__section3--form">
        <label className="form__label display-block" htmlFor="name">
          Escribe tu nombre
        </label>
        <input
          className="form__input-text"
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleName}
        />
        <label className="form__label display-block" htmlFor="email">
          Escribe tu email
        </label>
        <input
          className="form__input-text"
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={handleEmail}
        />

        <label className="form__label display-block" htmlFor="password">
          Escribe tu contraseña
        </label>
        <input
          className="form__input-text"
          type="text"
          name="password"
          id="password"
          value={password}
          onChange={handlePassword}
        />

        <input
          className="form__btn display-block"
          type="submit"
          value="Registrar"
        />

        {renderErrorMessage()}
      </form>
    </section>
  );
};

export default SignUp;
