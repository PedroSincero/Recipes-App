import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

import './Menu.css';

export default function Menu() {
  const history = useHistory();
  return (
    <div className="footer">
      <Button variant="danger" type="button" onClick={ () => history.push('/bebidas') }>
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="go to drinks session"
        />
      </Button>
      <Button variant="danger" type="button" onClick={ () => history.push('/explorar') }>
        <img
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="go to explore session"
        />
      </Button>
      <Button variant="danger" type="button" onClick={ () => history.push('/comidas') }>
        <img
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="go to foods session"
        />
      </Button>
    </div>
  );
}
