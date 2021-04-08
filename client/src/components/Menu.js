import {connect,  useDispatch} from 'react-redux';
import { setPhase } from '../actions/userActions';
import Button from './styled/Button'


const Lobby = () => {
    const dispatch = useDispatch()

	return <div style={{background: 'lightblue', display: 'flex', height: '100%'}}>
        <div style={{flexGrow: 4, background: '#212121'}}>
        </div>
        <div style={{flexGrow: 1, background: '#FFF'}}>
            <div style={{display: 'flex', flexDirection: 'column', width: '50%', margin: '20px auto'}}>
                <Button style={{margin: '20px auto', borderRadius: 8,borderWidth: 5}} >Battle</Button>
                <Button style={{margin: '20px auto', borderRadius: 8,borderWidth: 5}} onClick = {() => dispatch (setPhase("spells"))} >Spells</Button>
                <Button style={{margin: '20px auto', borderRadius: 8,borderWidth: 5}} >Shop</Button>
                <Button style={{margin: '20px auto', borderRadius: 8,borderWidth: 5}} >Profile</Button>
            </div>
        </div>
    </div>
};

export default connect(null, null)(Lobby);