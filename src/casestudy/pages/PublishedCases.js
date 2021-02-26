import React from 'react';
import CaseList from "../components/CaseList";
import axios from "../../axios"


let CASES = [];
export default class PublishedCases extends React.Component{
    constructor(props){
        super(props);
        this.state={ data: ''};

        this.componentDidMount=this.componentDidMount.bind(this);
    }

    //call this on page load
    componentDidMount() {
        //communicate with backend, get all draft cases for the user

        axios.post(`view-your-cs-published`,{params: {username: localStorage.getItem('login-user')}}).then((res) => {
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
        return <CaseList items={CASES}/>;

    };


}

