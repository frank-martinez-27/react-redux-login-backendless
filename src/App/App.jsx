import React from 'react';
import {Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import { history } from '../_helpers';
import {alertActions} from '../_actions';

import {PrivateRoute} from '../_components';
import {HomePage} from '../HomePage';
import {LoginPage} from '../LoginPage';
import { RegisterPage } from '../RegisterPage';



class App extends React.Component {
    constructor(props) {
        // The props that this component receives are specified in the
        // mapStateToProps function in the bottom. This component receives
        // the full store state as props 
        super(props);

        // Extract the store's dispatch method...
        const {dispatch}=this.props;

        // When the url changes, clear alerts
        history.listen((location,action)=>{
            dispatch(alertActions.clear());
        })
    }

    render() {
        const {alert} = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />                                
                                <Route path="/register" component={RegisterPage}/>  
                                <Route path="/home" component={HomePage} />                              
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    console.log("State in App=>",state);
    const {alert} = state;
    return {
        alert: alert
    };
}

const connectedApp=connect(mapStateToProps)(App);
export {connectedApp as App};