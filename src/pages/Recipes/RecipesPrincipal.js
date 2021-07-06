import React from 'react';
import { useLocation } from 'react-router-dom';
import HeaderWithButton from '../../components/HeaderWithButton';
import Menu from '../../components/Menu';

export default function RecipesPrincipal() {
  const location = useLocation();
  const nameTitle = () => {
    if (location.pathname === '/bebidas') {
      return (
        <HeaderWithButton title="Bebidas" />
      );
    }
    if (location.pathname === '/comidas') {
      return (
        <HeaderWithButton title="Comidas" />
      );
    }
  };

  return (
    <>
      {nameTitle()}
      <h1>Tela principal de receitas</h1>
      <Menu />
    </>
  );
}
