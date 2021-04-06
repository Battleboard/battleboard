import { useSelector, useDispatch } from 'react-redux'
import { setPhase } from '../actions/userActions'
import Button from './styled/Button'

const Profile = () => {
    const dispatch = useDispatch()
    const username = useSelector(state => state.auth.name)
    const user = useSelector(state => state.user)

    return <div>
    <Button onClick={() => dispatch(setPhase('gameroom'))}>Back</Button>
        {username}
        Wins: {user.wins}
        Losses: {user.losses}
        Draws: {user.draws}
    </div>
}

export default Profile