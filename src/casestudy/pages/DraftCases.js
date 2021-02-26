import React from 'react';
import EditCaseList from "../components/EditCaseList";
import axios from "../../axios"

let CASES = [];
export default class DraftCases extends React.Component{
    constructor(props){
        super(props);
        this.state={ data: ''};
        this.componentDidMount=this.componentDidMount.bind(this);
    }

    //call this on page load
    componentDidMount() {
        console.log(localStorage.getItem('login-user'))
        //communicate with backend and get all the draft case studies for the user.
        axios.post(`view-your-cs-draft`,{params: {username: localStorage.getItem('login-user')}}).then((res) => {
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
                    client_name: val.client_name
                });
        })
        return  <EditCaseList items={CASES}/>;
    };
}

