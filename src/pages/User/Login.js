import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import AppContext from '../../context/AppContext';
import logo2 from '../../images/logo2.png';
import '../../styles/login.css';

export default function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    user,
    setUser,
  } = useContext(AppContext);/*  */

  function handleEmail(e) {
    const typedEmail = e;
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(typedEmail);
    setUser(typedEmail);
    return setEmail(regex);
  }

  function handlePassword(e) {
    const typedPassword = e;
    const minLength = 6;
    let validPass = false;
    if (typedPassword.length > minLength) {
      validPass = true;
    }
    return setPassword(validPass);
  }

  // useEffect(() => {
  //   localStorage.setItem('mealsToken', 1);
  //   localStorage.setItem('cocktailsToken', 1);
  //   localStorage.setItem('user', JSON.stringify({ email: user }));
  // }, [user]);

  function setLocalStorage() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: user }));
    localStorage.setItem('doneRecipes', JSON.stringify([]));
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {},
      meals: {},
    }));
  }

  return (
    <div className="body">
      <img className="logo" src={ logo2 } alt="logo" />
      <div className="form">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text">Email</Form.Label>
            <Form.Control
              type="email"
              data-testid="email-input"
              placeholder="Digite seu Email"
              onChange={ ({ target }) => handleEmail(target.value) }
            />

          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="text">Password</Form.Label>
            <Form.Control
              type="password"
              data-testid="password-input"
              placeholder="Password"
              onChange={ ({ target }) => handlePassword(target.value) }
            />

          </Form.Group>

          <Link to="/comidas">
            <Button
              variant="secondary"
              className="button btn-block"
              type="button"
              data-testid="login-submit-btn"
              disabled={ !email + !password }
              value={ user }
              onChange={ (e) => setUser(e.target.value) }
              onClick={ setLocalStorage }
            >
              Entrar
            </Button>
          </Link>
        </Form>
      </div>
    </div>
  );
}
