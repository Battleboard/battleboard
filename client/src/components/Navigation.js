import Button from './styled/Button'
import { useDispatch, useSelector } from 'react-redux'
import { setPhase, buyPacks } from '../actions/userActions'
import { logout } from '../actions/authActions'

const button_styles = { border: '1px solid #FFF', color: '#FFF', margin: 8 }

const numberOfSpells = 6

const Navigation = () => {
    const spells = useSelector(state => state.user.spells)
    const phase = useSelector(state => state.user.phase)
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const user = useSelector(state => state.user)

    const toBattle = () => {
        if (spells.length === numberOfSpells) {
            dispatch(setPhase('gameroom'))
        }
    }

    return <div style={{width: '100%', height: 80, background: '#000', margin: 0, display: 'flex', justifyContent: 'space-between'}}>
        {/* Title */}
        <h1 style={{margin: 0, padding: '10px 0 0 10px', fontSize: 48, fontFamily: 'sans-serif', color: '#F3F3F3', userSelect: 'none'}}>Battleboard</h1>

        {
            user && <p style={{color:"gold"}}>Gold: {user.gold}</p>
        }


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

        {auth.isAuthenticated && <div>
            {phase === 'profile' && <Button style={button_styles} onClick={() => {dispatch(setPhase('gameroom'))}}>Gameroom</Button>}
            <Button onClick={() => dispatch(buyPacks(auth.id))} style={button_styles}>Buy Pack</Button>
            <Button style={button_styles} onClick={() => dispatch(logout())}>Logout</Button>
        </div>}

    </div>
}

export default Navigation