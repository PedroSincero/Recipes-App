import React from 'react';
import HeaderWithButton from '../../components/HeaderWithButton';
import Menu from '../../components/Menu';
import Search from '../../components/Search';

export default function RecipesPrincipal() {
  return (
    <>
      <HeaderWithButton title="Comidas" />
      <Search />
      <h1>Tela principal de receitas</h1>
      <Menu />
    </>
  );
}
