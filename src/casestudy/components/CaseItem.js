import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import Card from './Card';
import './CaseItem.css';

const CaseItem = props => {
  //split the project name and client name to fit on to the card
  function split_at_index(value,index)
  {
    return value.substring(0, index);
  }
  // return the case item tile/card for individual view.
  return (
      <li className="case-item">
        <Card className="case-item__content">
          <Link to={`indiView/${props.id}`}>
            <div className="case-item__image">
              <Icon image={props.image} alt={props.project_name} />
            </div>
            <div className="case-item__info">
              <h5 id="case-item-color">{split_at_index(props.project_name,13)}</h5>
              <h3 id="case-item-color-name">
                {split_at_index(props.client_name,18)}
              </h3>
            </div>
          </Link>
        </Card>
      </li>
  );
};

export default CaseItem;


