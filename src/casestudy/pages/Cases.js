import React from 'react';
import CaseList from "../components/CaseList";
import axios from "../../axios";
import "./ViewAllCases.css";

let CASES = [];
export default class Cases extends React.Component{
    constructor(props){
        super(props);
        this.state={ data: ''};
        this.componentDidMount=this.componentDidMount.bind(this);
    }

    //call this on page load
    componentDidMount() {
        //communicate with backend get all case studies
        axios.get(`view-all`).then((res) => {
            this.setState({data:res.data});
        });
    }

    render(){
        CASES=[];
        Array.from(this.state.data).map((val)=> {
            CASES.push(
                {
                    project_id: val._id,
                    project_name: val.project_name,
                    client_name:  val.client_name,
                });
        })
        return  <div ><h1 id="ibm-case-study-title">IBM Case Studies</h1><CaseList items={CASES}/></div>;

    };


}

