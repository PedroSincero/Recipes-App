import React from 'react';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Search from '../../components/Search';

export default function RecipesPrincipal() {
  return (
    <>
      <Header title="Comidas" />
      <Search />
      <h1>Tela principal de receitas</h1>
      <Menu />
    </>
  );
}
