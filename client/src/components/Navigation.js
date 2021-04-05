import Button from './styled/Button'
import { useDispatch, useSelector } from 'react-redux'
import { setPhase } from '../actions/userActions'
import Logout from './Logout';

const numberOfSpells = 4

const Navigation = () => {
    const spells = useSelector(state => state.user.spells)
    const phase = useSelector(state => state.user.phase)
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

    const toBattle = () => {
        if (spells.length === numberOfSpells) {
            dispatch(setPhase('gameroom'))
        }
    }

    return <div style={{width: '100%', height: 80, background: '#000', margin: 0, display: 'flex', justifyContent: 'space-between'}}>
        {/* Title */}
        <h1 style={{margin: 0, padding: '10px 0 0 10px', fontSize: 48, fontFamily: 'sans-serif', color: '#F3F3F3', userSelect: 'none'}}>Battleboard</h1>
        {phase === 'select-spells' && auth.isAuthenticated &&  <Button 
            style={{
                marginRight: 20, 
                border: spells.length === numberOfSpells ? '3px solid lightgreen' : '1px solid #FFF', 
                color: spells.length === numberOfSpells ? 'lightgreen' : '#FFF', 
                padding: 0, 
                marginTop: 10, 
                height: 60,
                fontWeight: spells.length === numberOfSpells ? 'bold' : 'normal'
            }} 
            onClick={toBattle}
        >Battle</Button>}

        {
            auth.isAuthenticated && <Logout/>
        }

    </div>
}

export default Navigation