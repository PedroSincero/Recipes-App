import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Menu from '../../components/Menu';

export default function ExploreDrinksFood() {
  const location = useLocation();
  const nameTitle = () => {
    if (location.pathname === '/explorar/bebidas') {
      return (
        <Header title="Explorar Bebidas" />
      );
    }
    if (location.pathname === '/explorar/comidas') {
      return (
        <Header title="Explorar Comidas" />
      );
    }
  };

  return (
    <>
      <h1>Tela de explorar bebidas ou comidas</h1>
      {nameTitle()}
      <Menu />
    </>
  );
}
