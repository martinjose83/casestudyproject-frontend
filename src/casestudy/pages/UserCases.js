import React from 'react';
import axios from "../../axios";
import CaseList from "../components/CaseList";
import Axios from "axios";
import {Button} from "react-bootstrap";
import "./UserCases.css";
import DraftCases from "./DraftCases";
import PublishedCases from "./PublishedCases";

export default class UserCases extends React.Component {
   constructor(props){
        super(props);
        this.state={ data: '', isDraftCases:true};
    }
    render(){
        let isDraftCases = false;
        return (
            <div>
                <div className="toggleBtns">
                    <div className="btnsDiv">
                        <Button onClick={() => {this.setState({isDraftCases:true})}} className="usercasesBtn" id="draftBtn" >DRAFT CASE STUDIES</Button>
                    </div>
                    <div className="btnsDiv">
                        <Button onClick={() => {this.setState({isDraftCases:false})}} className="usercasesBtn" id="publishedBtn" >PUBLISHED CASE STUDIES</Button>
                    </div>
                </div>
                {this.state.isDraftCases ? <DraftCases/>:<PublishedCases/>}
            </div>
        );

    };


}

