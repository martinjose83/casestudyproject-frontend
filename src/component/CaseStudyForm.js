import React from 'react';

import axios from "../axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CaseStydyFormStyle.css";
import {saveAs} from "file-saver"
const ref = React.createRef();

export default class CaseStudyForm extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            project_name: '', client_name1:'',project_industry: '', country: '', city: '', client_name: '', client_code_name: '',
            client_phone: '', client_email: '', project_start_date: '',
            project_end_date: '', problem_space: '', approach: '', idea: '', impact: ''
        };

    }
    exporttoPdf = () =>{
this.setState({client_name1: this.state.client_code_name? this.state.client_code_name : this.state.client_name});
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
    checkForm(){
        if(this.checkFormFields()){
            this.addCaseStudy();
            let save_changed = document.getElementById('save_changed');
            save_changed.disabled = true;
            save_changed.style.backgroundColor="gray";
        }else{
            // alert("Please enter the values for the required filed!!");

            let warning_msg = document.getElementById('warning_msg');
             warning_msg.innerHTML = "Please add the required fields";
             warning_msg.className = 'error';
        }
    }
    checkFormPublish(){
        if(this.checkFormFields()){
            this.publishCaseStudy();
            let save_changed = document.getElementById('save_changed');
            let publish_changed = document.getElementById('publish_btn');
            save_changed.disabled = true;
            save_changed.style.backgroundColor="gray";
            publish_changed.disabled = true;
            publish_changed.style.backgroundColor="gray";

        }else{
            // alert("Please enter the values for the required filed!!");

            let warning_msg = document.getElementById('warning_msg');
            warning_msg.innerHTML = "Please add the required fields";
            warning_msg.className = 'error';
        }
    }

    checkFormFields(){

        //Validate the Project name field
            let project_name = document.getElementById('project_name').value;
            let project_name_msg = document.getElementById('project_name_msg');
            let valid = true;

            if (project_name==='') {
                project_name_msg.innerHTML = "Please enter case study name";
                project_name_msg.className = 'error';
                valid = false;
            }
            else {
                project_name_msg.innerHTML = "";
                project_name_msg.className = '';
            }

        //Validate the Project industry field
        let Project_industry = document.getElementById('Project_industry').value;
        let Project_industry_msg = document.getElementById('Project_industry_msg');

        if (Project_industry <= 1) {
            Project_industry_msg.innerHTML = "Please select an industry";
            Project_industry_msg.className = 'error';
        }
        else {
            Project_industry_msg.innerHTML = "";
            Project_industry_msg.className = '';
        }

        //Validate the country field
        let country = document.getElementById('country').value;
        let country_msg = document.getElementById('country_msg');

        if (country <= 1) {
            country_msg.innerHTML = "Please select an country";
            country_msg.className = 'error';
            valid = false;
        }
        else {
            country_msg.innerHTML = "";
            country_msg.className = '';
        }

        //Validate the country field
        let city = document.getElementById('city').value;
        let city_msg = document.getElementById('city_msg');

        if (city ==='') {
            city_msg.innerHTML = "Please select an city";
            city_msg.className = 'error';
            valid = false;
        }
        else {
            city_msg.innerHTML = "";
            city_msg.className = '';
        }

        //validate project start date
        let project_start_date = document.getElementById('project_start_date').value;
        let project_start_date_msg = document.getElementById('project_start_date_msg');

        if (project_start_date == null || project_start_date ===""){
            project_start_date_msg.innerHTML = "Please select project start date!";
            project_start_date_msg.className = 'error';
            valid = false;
        }  else {
            project_start_date_msg.innerHTML = "";
            project_start_date_msg.className = '';
        }

        //validate project end date
        let project_end_date = document.getElementById('project_end_date').value;
        let project_end_date_msg = document.getElementById('project_end_date_msg');

        if ((Date.parse(project_end_date) <= Date.parse(project_start_date))){
            project_end_date_msg.innerHTML = "project end date should be greater than project start date!";
            project_end_date_msg.className = 'error';
            valid = false;
        }  else {
            project_end_date_msg.innerHTML = "";
            project_end_date_msg.className = '';
        }

        return valid;
    }

    addCaseStudy() {
        axios.post(`create`, {
            project_name: this.state.project_name,
            project_industry: this.state.project_industry,
            country: this.state.country,
            city: this.state.city,
            client_name: this.state.client_name,
            client_code_name: this.state.client_code_name,
            client_Contact_name:this.state.client_Contact_name,
            client_phone: this.state.phone,
            client_email: this.state.email,
            project_start_date: this.state.project_start_date,
            project_end_date: this.state.project_end_date,
            problem_space: this.state.problem_space,
            approach: this.state.approach,
            idea: this.state.idea,
            impact: this.state.impact,
            status: "Draft",
            username: localStorage.getItem('login-user')



        }).then(() => {
            // alert('Case study saved successfully!!!!');
            let warning_msg = document.getElementById('warning_msg');
            warning_msg.innerHTML = "Congratulation Case study saved successfully!!";
            warning_msg.className = 'success';
        });
    }
    publishCaseStudy(){
        axios.post(`create`, {
            project_name: this.state.project_name,
            project_industry: this.state.project_industry,
            country: this.state.country,
            city: this.state.city,
            client_name: this.state.client_name,
            client_code_name: this.state.client_code_name,
            client_Contact_name:this.state.client_Contact_name,
            client_phone: this.state.phone,
            client_email: this.state.email,
            project_start_date: this.state.project_start_date,
            project_end_date: this.state.project_end_date,
            problem_space: this.state.problem_space,
            approach: this.state.approach,
            idea: this.state.idea,
            impact: this.state.impact,
            status: "Published",
            username: localStorage.getItem('login-user')

        }).then(()=> {
            // alert('Case study published successfully!!!!');
            let warning_msg = document.getElementById('warning_msg');
            warning_msg.innerHTML = "Case study published successfully!!";
            warning_msg.className = 'success';
        });

    }

    render() {

        return (
            <div className="cs-main-div" ref={ref}>

                <div className="ibm-main-div1">
                    <div className="row">
                        <div className="col-lg-8 mb-4">
                            {/*beginning of First row left column */}
                            <div className="control-group form-group">
                                <div className="controls form-floating">
                                    <label htmlFor="project_name">Case Study Name</label>
                                    <input id="project_name" placeholder=" Please enter the project name" onChange={event => {
                                        this.setState({project_name: event.target.value})
                                    }} type="text" className="project_name" required/>
                                    <span id="project_name_msg"/>
                                </div>

                            </div>

                        </div>
                    </div>

                    {/*end of project name*/}

                    <div className="row">
                        <div className="col-lg-5 mb-4 form-floating">
                            <div className="control-group form-group">
                                <div className="controls">
                                    <label>Industry:</label>
                                    <select id="Project_industry" name="industry" className="form-control" required
                                            onChange={event => {
                                                this.setState({project_industry: event.target.value})
                                            }}>
                                        <option disabled selected value="-1">-- Select Industry-</option>
                                        <option value="banking">Banking</option>
                                        <option value="healthcare"> Heath Care</option>
                                        <option value="education"> Education</option>
                                        <option value="telecom">Telecommunication</option>
                                        <option value="other">Other</option>
                                    </select>

                                </div>
                                <span id="Project_industry_msg"/>
                            </div>
                        </div>
                    </div>
                    {/*end of Industry*/}

                    <div className="row">
                        <div className="col-lg-4 mb-4">
                            <div className="control-group form-group">
                                <div className="controls">
                                    <label>Country:</label>
                                    <select id="country" name="type" className="form-control" required
                                            onChange={event => {
                                                this.setState({country: event.target.value})
                                            }}>
                                        <option disabled selected value="-1">-- Select an option--</option>
                                        <option value="australia">Australia</option>
                                        <option value="new-zealand"> New Zealand</option>
                                        <option value="other">Other</option>
                                    </select>

                                </div>

                            </div>
                            <span id="country_msg"/>
                            {/*end of country */}
                        </div>

                        <div className="col-lg-2 mb-4">
                            <div className="control-group form-group">
                                <div className="controls">
                                    <label htmlFor="city">City</label>
                                    <input id="city" placeholder=" Please enter city" onChange={event => {
                                        this.setState({city: event.target.value})
                                    }} type="text" className="form-control" />
                                </div>
                                <span id="city_msg"/>
                            </div>
                            {/*end of city*/}
                        </div>
                    </div>
                    {/*end of country and city row*/}

                    <div className="row">

                        <div className="col-lg-3 mb-4">
                            <div className="form-group">
                                <label>Project Start Date:</label>
                                <div className="datepicker date input-group p-0 shadow-sm">

                                    <input type="date"
                                           id="project_start_date" name="startdate"
                                           placeholder="Checking in date YYYY-mm-dd*"
                                           min='1899-01-01' className="form-control py-3 px-3" required="required"
                                           data-validation-required-message="Please enter project start date."
                                           onChange={event => {
                                               this.setState({project_start_date: event.target.value})
                                           }}/>

                                    <div className="input-group-append"><span className="input-group-text px-3"><i
                                        className="fas fa-clock"/></span></div>
                                </div>
                                <span id="project_start_date_msg"> </span>
                            </div>
                        </div>
                        {/*end of project start date*/}

                        <div className="col-lg-3 mb-4">
                            <div className="form-group">
                                <label>Project End Date:</label>
                                <div className="datepicker date input-group p-0 shadow-sm">
                                    <input type="date" id="project_end_date" name="checkin"
                                           placeholder="Checking in date YYYY-mm-dd*"
                                           min='1899-01-01' className="form-control py-3 px-3" required="required"
                                           data-validation-required-message="Please enter project end date."
                                           onChange={event => {
                                               this.setState({project_end_date: event.target.value})
                                           }}/>
                                    <div className="input-group-append"><span className="input-group-text px-3"><i
                                        className="fas fa-clock"/></span>
                                    </div>
                                    <span id="project_end_date_msg"> </span>
                                </div>
                            </div>
                            {/*end of Project end date */}
                        </div>

                    </div>

                    {/*    End of First row with project info*/}

                    <div className="col-lg-6 client-div">
                        {/*// <!-- Trigger the modal with a button -->*/}
                        <button type="button" className="btn btn-primary btn-lg client-btn" data-toggle="modal"
                                data-target="#ibm-clientModal-info"><span className="plus">+</span> CLIENT DESCRIPTION
                        </button>
                    </div>
                        {/*// <!-- Modal -->*/}
                        <div className="modal fade" id="ibm-clientModal-info" role="dialog">
                            <div className="modal-dialog">

                                {/*// <!-- Modal content-->*/}
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 className="modal-title"> Client Details </h4>
                                        <button type="button" className="close" data-dismiss="modal">&times;</button>

                                    </div>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-lg-12 mb-4">
                                                <div className="control-group form-group">

                                                    <div className="controls">
                                                        <label htmlFor="client_name">Client Name</label>
                                                        <input onChange={event => {
                                                            this.setState({client_name: event.target.value})
                                                        }} type="text" className="form-control" id="client_name"/>
                                                    </div>

                                                    <div className="controls">
                                                        <label htmlFor="client_code_name">Client's Sensitive
                                                            Name</label>
                                                        <input onChange={event => {
                                                            this.setState({client_code_name: event.target.value})
                                                        }} type="text" className="form-control" id="client_code_name"/>
                                                    </div>

                                                    <div className="controls">
                                                        <label htmlFor="phone">Contact Number</label>
                                                        <input onChange={event => {
                                                            this.setState({client_phone: event.target.value})
                                                        }} type="text" className="form-control" id="phone"/>
                                                    </div>

                                                    <div className="controls">
                                                        <label htmlFor="email">Email ID</label>
                                                        <input onChange={event => {
                                                            this.setState({client_email: event.target.value})
                                                        }} type="text" className="form-control" id="email"/>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        {/*End of the collapsed section  for client details*/}

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-primary client-btn"
                                                data-dismiss="modal">Save Client Details
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                {/*End of client detail modal window */}

                <div className="row blue-div">
                    <h2> Case Study Fields<span><i className="fas fa-arrow-down white-arrow"/></span></h2>
                </div>

                {/*end of client details div*/}
                <div className="project-details-div">
                    <br/>
                    <div className="col-lg-12 mb-4">
                        <div className="control-group form-group">
                            <div className="controls">
                                <h5> Project Problem:<span> <i className="fas fa-question-circle"
                                                               title="what is the problem and,or the client is facing? "/></span>
                                </h5>
                                <textarea id="problem_space" name="comments" rows="3" cols="10" className="form-control"
                                          placeholder="Please enter project problem"
                                          maxLength="999"
                                          onChange={event => {
                                              this.setState({problem_space: event.target.value})
                                          }}/>
                                <p className="tooltip-text">What is the problem and/or the Client is facing? </p>
                            </div>
                        </div>
                    </div>
                    {/* end of Problem */}

                    <div className="col-lg-12 mb-4">
                        <div className="control-group form-group">
                            <div className="controls">

                                <h5 >Project Approach :<span> <i className="fas fa-question-circle"
                                                                title="what have IBM team done to address and solve the problem space?"/></span>
                                </h5>
                                <textarea id="approach" name="comments" rows="3" cols="10" className="form-control"
                                          placeholder="Please enter project approach"
                                          maxLength="999"
                                          onChange={event => {
                                              this.setState({approach: event.target.value})
                                          }}/>
                                   <p className="tooltip-text ">What have IBM team done to address and solve the problem space? What approaches and methods were used ?</p>
                            </div>
                        </div>
                    </div>
                    {/* end of Approach */}
                    <div className="col-lg-12 mb-4">
                        <div className="control-group form-group">
                            <div className="controls">
                                <h5> Project Idea :<span> <i className="fas fa-question-circle"
                                                             title=" what was the solution both client and IBM team align on to solve the problem?"/></span>
                                </h5>
                                <textarea id="idea" name="comments" rows="3" cols="10" className="form-control"
                                          placeholder="Please enter project idea"
                                          maxLength="999"
                                          onChange={event => {
                                              this.setState({idea: event.target.value})
                                          }}/>
                                <p className="tooltip-text"> What was the solution both client and IBM team align on to solve the problem? </p>
                            </div>
                        </div>
                    </div>
                    {/* end of Impact */}

                    <div className="col-lg-12 mb-4">
                        <div className="control-group form-group">
                            <div className="controls">
                                <h5> Project Impact:
                                    <span> <i className="fas fa-question-circle"
                                              title="what was the value delivered to the client and/or employees fro the idea?"/></span>
                                </h5>
                                <textarea id="impact" name="comments" rows="3" cols="10" className="form-control"
                                          placeholder="Please enter project impact"
                                          maxLength="999"
                                          onChange={event => {
                                              this.setState({impact: event.target.value})
                                          }}/>
                                <p className="tooltip-text"> What was the value delivered to the client and/or employees for the idea? </p>
                            </div>
                        </div>
                    </div>
                    {/* end of Impact */}
                    <div className="alert-message error fade in hide span16" data-alert="alert" id="warning_msg"/>

                    <div className="col-lg-12 text-center btn-section">

                        <button id="save_changed" className="btn btn-primary btn-xl text-uppercase save-btn"
                                onClick={() => this.checkForm()}> SAVE
                        </button>

                        {/*<button className="btn btn-primary btn-xl text-uppercase export-btn" data-toggle="modal"*/}
                        {/*        data-target="#ibm-export"> EXPORT*/}
                        {/*</button>*/}


                     {/*   <ReactToPdf targetRef={ref} filename="case-study.pdf" options={options} x={.5} y={.5} scale={0.8}>
                            {({toPdf}) => (
                                <button className="btn btn-primary btn-xl text-uppercase export-btn" onClick={toPdf}>Export</button>
                            )}
                        </ReactToPdf>*/}
                        <button className="btn btn-primary btn-xl text-uppercase export-btn" onClick={this.exporttoPdf}>Export</button>

                        <button id="publish_btn" className="btn btn-primary btn-xl text-uppercase publish-btn"
                                data-toggle="modal"
                                data-target="#ibm-publish"> PUBLISH</button>

                        {/*// <!-- Modal -->*/}
                        <div className="modal fade" id="ibm-publish" role="dialog">
                            <div className="modal-dialog">

                                {/*// <!-- Modal content-->*/}
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 className="modal-title"> PUBLISH </h4>
                                        <button type="button" className="close" data-dismiss="modal">&times;</button>

                                    </div>
                                    <div className="modal-body">
                                        <h5>Do you want to publish the case study?</h5>
                                    </div>
                                    <div className="modal-footer">

                                        <button  onClick={() => this.checkFormPublish()} data-dismiss="modal" className="btn btn-primary export-btn-md">
                                            Publish
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                    {/*<div className="alert alert-warning alert-dismissible fade in" id="warning_msg">.*/}
                    {/*</div>*/}


                </div>
                {/*End of publish modal window */}
                {/* End of project-details-div */}

                <div className="row blue-div2">
                    <h6> @copyright IBM 2021 </h6>
                </div>

            </div>
        )
    }
}
