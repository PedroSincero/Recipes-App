import React from 'react';

export default function Login() {
  return (
    <div>

      <label htmlFor="email">
        Email
        <input type="" data-testid="" />
      </label>
      <label htmlFor="password">
        Senha
        <input type="" data-testid="" />
      </label>

      <button type="button" data-testid="">Entrar</button>

    </div>
  );
}
