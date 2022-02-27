import React, { useState, useRef } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { isEmail } from 'validator';

import AuthService from '../services/auth.service';

const required = (value) => {
  if (!value) {
    return (
      <div className="form__alert" role="alert">
        To pole jest wymagane!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="form__alert" role="alert">
        To nie jest poprawny email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="form__alert" role="alert">
        Nazwa użytkownika musi zawierać między 3, a 20 znaki.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="form__alert" role="alert">
        Haslo musi zawierać między 6, a 40 znaków.
      </div>
    );
  }
};

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState('');

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage('');
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, email, password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="form">
      <img
        src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
        alt="profile-img"
        className="form__image"
      />

      <Form onSubmit={handleRegister} ref={form}>
        {!successful && (
          <div>
            <div className="form__field">
              {/* <label htmlFor='username'>Nazwa użytkownika</label> */}
              <Input
                type="text"
                className="form__input"
                placeholder="Nazwa użytkownika"
                name="username"
                value={username}
                onChange={onChangeUsername}
                validations={[required, vusername]}
              />
            </div>

            <div className="form__field">
              {/* <label htmlFor='email'>Email</label> */}
              <Input
                type="text"
                className="form__input"
                name="email"
                placeholder="Email"
                value={email}
                onChange={onChangeEmail}
                validations={[required, validEmail]}
              />
            </div>

            <div className="form__field">
              {/* <label htmlFor='password'>Hasło</label> */}
              <Input
                type="password"
                className="form__input"
                name="password"
                placeholder="Hasło"
                value={password}
                onChange={onChangePassword}
                validations={[required, vpassword]}
              />
            </div>

            <div className="form__log-in">
              <button className="button form__button">Zarejestruj</button>
            </div>
          </div>
        )}

        {message && (
          <div className="form-group">
            <div
              className={successful ? 'form__alert--positive' : 'form__alert'}
              role="alert"
            >
              {message}
            </div>
          </div>
        )}
        <CheckButton style={{ display: 'none' }} ref={checkBtn} />
      </Form>
    </div>
  );
};

export default Register;
