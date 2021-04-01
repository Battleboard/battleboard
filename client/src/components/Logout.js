import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import {logout} from '../actions/authActions';
import { Link } from "react-router-dom";

export const Logout = ({logout}) => {
    return(
        <Fragment>
            <Link to="/"><button onClick={logout}>Logout</button></Link>
        </Fragment>
    );
}

export default connect(null, { logout })(Logout);