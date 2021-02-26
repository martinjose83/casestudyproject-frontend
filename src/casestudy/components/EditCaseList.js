import React from 'react';

import EditCaseItem from './EditCaseItem';
import './CaseList.css';
import edit_logo from "../../images/editlogo.png";

const EditCaseList = props => {
    if (props.items.length === 0) {
        //return message if no case study in the list
        return (
            <div className="center">
                <h2>No cases found.</h2>
            </div>
        );
    }
    // return the list of case study card items
    return (
        <div>
            <ul className="cases-list">
                {props.items.map(cases => (
                    <EditCaseItem
                        id={cases.project_id}
                        image={edit_logo}
                        project_name={cases.project_name}
                        client_name={cases.client_name}
                    />
                ))}
            </ul>
        </div>
    );
};

export default EditCaseList;
