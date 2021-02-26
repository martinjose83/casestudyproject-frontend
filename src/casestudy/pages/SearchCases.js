import React from 'react';
import CaseList from "../components/CaseList";

let CASES = [];
export default class SearchCases extends React.Component{
    constructor(props){
        super(props);
        this.state={data: ''};
    }
    render(){
        CASES=[];
        Array.from(this.state.data).map((val)=> {
            CASES.push(
                {
                    project_id: val._id,
                    project_name: val.project_name,
                    client_name: val.client_name
                });
        })
        return  <CaseList items={CASES}/>;
    };
}

