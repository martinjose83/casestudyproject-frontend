import React from 'react';




export default class MgrPrev extends React.Component {
    constructor(props) {
        super(props);
        this.state = { _id: ""};

    }
    componentDidMount(){
        this.setState({_id: this.props.csID});
    }
    //call this on page load
    deleteCS() {
        console.log(this.props.caseId)
    }

    changeStatus() {
        console.log(this.state._id)
    }

    render() {

        if (localStorage.getItem('login-mgr') === "true") {


            return (<>
                <div>
                    <button onClick={this.deleteCS}> Delete</button>
                    <button onClick={this.changeStatus}> Change</button>
                </div>
            </>);
        }
        else { return(<div> </div>)}
        ;
    };
}

