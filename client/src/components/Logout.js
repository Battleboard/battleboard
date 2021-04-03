import { connect } from 'react-redux';
import {logout} from '../actions/authActions';
import Button from './styled/Button'

export const Logout = ({logout}) => {
    return(
        <Button onClick={logout}             
        style={{
            marginRight: 20, 
            border: '1px solid #FFF', 
            color: '#FFF', 
            padding: 0, 
            marginTop: 10, 
            height: 60
        }} >
            Logout
        </Button>
    );
}

export default connect(null, { logout })(Logout);