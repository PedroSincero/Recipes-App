import React from 'react';
import { useLocation } from 'react-router-dom';
import BtnExpFood from '../../components/BtnExpFood';
import BtnExpDrink from '../../components/BtnExpDrink';
import Header from '../../components/Header';
import Menu from '../../components/Menu';

export default function ExploreDrinksFood() {
  const location = useLocation();
  const nameTitle = () => {
    if (location.pathname === '/explorar/bebidas') {
      return (
        <>
          <Header title="Explorar Bebidas" />
          <BtnExpDrink />
        </>
      );
    }
    if (location.pathname === '/explorar/comidas') {
      return (
        <>
          <Header title="Explorar Comidas" />
          <BtnExpFood />
        </>
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
