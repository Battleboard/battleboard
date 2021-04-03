import Button from './styled/Button'
import { useDispatch, useSelector } from 'react-redux'
import { setPhase } from '../actions/userActions'

const Navigation = () => {
    const spells = useSelector(state => state.user.spells)
    const phase = useSelector(state => state.user.phase)
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

    const toBattle = () => {
        if (spells.length === 4) {
            dispatch(setPhase('gameroom'))
        }
    }

    return <div style={{width: '100%', height: 80, background: '#000', margin: 0, display: 'flex', justifyContent: 'space-between'}}>
        {/* Title */}
        <h1 style={{margin: 0, padding: '10px 0 0 10px', fontSize: 48, fontFamily: 'sans-serif', color: '#F3F3F3', userSelect: 'none'}}>Battleboard</h1>
        {phase === 'select-spells' && auth.isAuthenticated &&  <Button 
            style={{
                marginRight: 20, 
                border: '1px solid #FFF', 
                color: '#FFF', 
                padding: 0, 
                marginTop: 10, 
                height: 60
            }} 
            onClick={toBattle}
        >Battle</Button>}
    </div>
}

export default Navigation