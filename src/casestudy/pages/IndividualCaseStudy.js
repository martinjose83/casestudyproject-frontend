import React, {useEffect, useState} from 'react';
import axios from "../../axios";
import {saveAs} from "file-saver";
import './IndiView.css';
import MgrPrev from "../components/MgrPrev";

export default class IndividualCaseStudy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: '',csID:''};

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        const caseId = this.props.match.params.CaseId;
        this.setState({csID: caseId});
        axios.post("view-by-id1", {params: {_id: caseId}}).then((res) => {
            this.setState(res.data[0]);
        });
    }

    exporttoPdf = () =>{
        axios.post(`create-pdf`, this.state )
            .then(()=> axios.get(`fetch-pdf`,{responseType: 'blob'}))
            .then((res)=>{
                const pdfBlob =new Blob([res.data],{type:'application/pdf'});
                saveAs(pdfBlob,this.state.project_name+'.pdf');

                //Success message added
                let warning_msg = document.getElementById('warning_msg');
                warning_msg.innerHTML = "PDF file generated successfully!!";
                warning_msg.className = 'pdf-msg';
            })
    }

    render() {


        return (
            <div>


                <div className="ibm-main-div1">

                    <div className="col-lg-3 mb-4 ">

                    </div>

                    <div className="row ibm-div-padding2">
                        <div className="col-lg-8 mb-4 ">
                            <h5 className="text-color-h1"> <span className="data">{this.state.project_name }</span>
                            </h5>
                            <h5 className="text-color-h5"> <span className="data"> {this.state.project_industry }</span>
                            </h5>
                        </div>
                    </div>

                    
                    <div className="row">
                        <div className="col-lg-8 mb-4 ">
                            <h2 className="text-color-h5"> Client Name: <span className="data">{this.state.client_name }</span>
                            </h2>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-8 mb-4 ">
                            <h2 className="text-color-h5"> Project Origin : <span className="data">{this.state.country }</span>
                            </h2>
                        </div>
                    </div>

                    <div className="row ">
                        <div className="col-lg-8 mb-4 ">
                            <h2 className="text-color-h5"> Project Date : <span className="data">{this.state.project_start_date}  {this.state.project_end_date }</span>
                            </h2>
                        </div>
                    </div>

                    {/*<div className="row">*/}
                    {/*    <div className="col-lg-8 mb-4  ">*/}
                    {/*        <h2 className="text-color-h5"> Project end date : <span className="data">{this.state.project_end_date }</span>*/}
                    {/*        </h2>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>


                {/*end of raw*/}
                <div className="row blue-middle-div">
                    <h2> Case Study Details<span><i className="fas fa-arrow-down white-arrow"/></span></h2>
                </div>

                <div className="ibm-div2 ">
                    <div className="col-lg-12 ibm-div-padding">
                        <h2 className="text-color-h2">Problem Space </h2>
                        <p id="para-padding">{this.state.problem_space}</p>
                    </div>

                    <div className="col-lg-12 ibm-div-padding">
                        <h2 className="text-color-h2">Impact</h2>
                        <p id="para-padding">{this.state.impact }</p>
                    </div>

                    <div className="col-lg-12 ibm-div-padding">
                        <h2 className="text-color-h2">Idea</h2>
                        <p id="para-padding" >{this.state.idea }</p>
                    </div>

                    <div className="col-lg-12 ibm-div-padding">
                        <h2 className="text-color-h2">Approach :</h2>
                        <p  id="para-padding">{this.state.approach }</p>
                    </div></div>
                <div className="alert-message error fade in hide span16" data-alert="alert" id="warning_msg"/>


                <div className="btn-section-indiView">
                    <button className="btn btn-primary btn-xl text-uppercase export-btn-indiView" onClick={this.exporttoPdf}>Export</button>
                    {/*<button type="button" className="close" data-dismiss="modal">&times;</button>*/}
                    {/*<MgrPrev caseId = {this.state.csID}/>*/}
                </div>


            </div>
            // end of main div
        );
    }
}
