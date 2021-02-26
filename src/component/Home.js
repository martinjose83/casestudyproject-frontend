import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import SearchCases from "../casestudy/pages/SearchCases";
import "./Home.css";
import axios from "../axios";
import CaseList from "../casestudy/components/CaseList";

let CASES=[];

export class Home extends React.Component {
    constructor(props){
        super(props);
        this.state={ project_industry:'', client_name:'',tag_data:"",searched: true ,data:""};
      // this.componentDidMount = this.componentDidMount.bind(this);
    }
    searchfunction = () =>{

        axios.post(`searchtags`, this.state ).then((res)=>{
          this.setState({data: res.data});
            CASES=[];

            Array.from(this.state.data).map((val)=> {
                CASES.push(
                    {
                        project_id: val._id,
                        project_name: val.project_name,
                        client_name: val.client_name
                    });
                //id = val._id;
            });
this.setState({searched:true})
        })


    }
    render() {
        return (

            <div className="ibm-home-div">
                <div className="col-lg-12 text-center">

                    <br/><br/>
                </div>
                <div className="container search-page">
                    <div className="input-group input-search">
                        <input onChange={event => {
                            this.setState({tag_data: event.target.value})
                        }}type="search" className="form-control" placeholder="Search for case studies" aria-label="Search"
                               aria-describedby="search-addon"/>
                        <button onClick={() => this.searchfunction()} type="button" className="btn btn-primary">search</button>
                    </div>

                    <div className="row justify-content-evenly row-home">
                        <div>

                            <div className="control-group form-group control-group-filter">
                                <div className="controls controls-filter">
                                    <select id="Project_industry" name="industry" className="form-control form-control-filter" required
                                            onChange={event => {
                                                this.setState({project_industry: event.target.value})
                                            }}>
                                        <option  value="">All Industries</option>
                                        <option value="banking">Banking</option>
                                        <option value="healthcare"> Heath Care</option>
                                        <option value="telecom">Telecommunication</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div>

                            <div className="control-group form-group control-group-filter">
                                <div className="controls controls-filter">
                                    <select id="Project_industry" name="industry" className="form-control form-control-filter" required
                                            onChange={event => {
                                                this.setState({client_name: event.target.value})
                                            }}>
                                        <option  value="">All Companies</option>con
                                        <option value="DIA"> DIA</option>
                                        <option value="DDHB"> DDHB</option>
                                        <option value="vodafone"> Vodafone</option>

                                        <option value="IBM-client"> IBM-client</option>
                                        <option value="CLIENT"> CLIENT</option>
                                        <option value="other"> Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
                <div className="col-lg-12 text-center">
                    {this.state.searched ? <CaseList items={CASES}/>: <div></div>}
                  {/*  <h1> My Search Results</h1>*/}

                </div>
            </div>

        )
    }


}




















































