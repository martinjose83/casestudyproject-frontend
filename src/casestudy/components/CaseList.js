import React from 'react';
import CaseItem from './CaseItem';
import './CaseList.css';
import logo from "../../images/ibmlogo.jpg"

const CaseList = props => {
    //return message if no case study in the list
    if (props.items.length === 0) {
        return (
            <div className="center">
                <h2>No cases found.</h2>
            </div>
        );
    }
    // return the list of case study card items
    return (
        <div id="listdiv">
            <ul className="cases-list case-item-color">
                {props.items.map(cases => (
                    <CaseItem
                        id={cases.project_id}
                        image={logo}
                        project_name={cases.project_name}
                        client_name={cases.client_name}
                    />
                ))}
            </ul>
        </div>
    );
};

export default CaseList;
