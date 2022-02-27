import React, { useState, useRef } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
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

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const currentUserId = AuthService.getCurrentUserId();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage('');
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          props.history.push(`/user/${currentUserId}`);
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="form">
        <img
          src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
          alt="profile-img"
          className="form__image"
        />
        <Form onSubmit={handleLogin} ref={form}>
          <div className="form__field">
            <Input
              type="text"
              className="form__input"
              name="username"
              id="username"
              placeholder="Nazwa użytkownika"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
            <Input
              type="password"
              className="form__input"
              name="password"
              value={password}
              placeholder="Hasło"
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          {message && (
            <div className="form__alert" role="alert">
              {message}
            </div>
          )}
          <div className="form__log-in">
            <button className="button form__button" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Zaloguj</span>
            </button>
          </div>
          <CheckButton style={{ display: 'none' }} ref={checkBtn} />
        </Form>
      </div>
    </>
  );
};

export default Login;
