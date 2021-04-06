import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Button from './styled/Button'
import Logo from './styled/Logo'
import Spells from "./Spells";
import CreateGame from "./CreateGame";
import SelectedSpells from "./SelectedSpells";
import { useSelector, useDispatch } from 'react-redux'
import GameRoom from "./GameRoom";
import { getUserInfo } from '../actions/userActions'
import Profile from './Profile'
import BattleOver from './BattleOver'
import store from '../store'

const GuestLinks = () => {
  
	return <div style={{position:'absolute', left:'50%', top:'50%', transform:'translate(-50%, -50%)', height:'25%', width:'25%', paddingBottom:'100px'}}>

		{/* Title */}
		{/* <h1 style={{userSelect: 'none', fontFamily:'system-ui', fontSize:33, fontWeight:'bold', textAlign:'center', marginBottom: 50}}>Battle<span style={{fontFamily:'monospace', fontSize:33, fontWeight: 'normal'}}>board</span></h1> */}
		<Logo style={{marginBottom: 50}} />

		{/* Button Container */}
		<div style={{width: '80%', display: 'flex', margin: '0px auto', justifyContent: 'space-evenly'}}>
			{/* Register Button */}
			<Link to="/register">
				<Button style={{background: '#000', color: '#DBE4EE'}}>
					Register
				</Button>
			</Link>

			{/* Log In Button */}
			<Link to="/login">
				<Button>
					Log In
				</Button>
			</Link>
		</div>

	</div>
}

const Landing = () => {
	const dispatch = useDispatch()
    const [player, setPlayer] = useState()
    const [opponent, setOpponent] = useState()

	const phase = useSelector(state => state.user.phase)
	const connection = useSelector(state => state.room.connection)
	const auth = useSelector(state => state.auth)
	const user = useSelector(state => state.user)
	const clients = useSelector(state => state.room.gameRoom);
    const clientId = store.getState().room.clientId

	//route the players into player and opponent
    useEffect(() => {
        //if the game room only has a single client set the player to the client
        if(clients.length === 1){
            setPlayer(0);

        }else if(clients.length === 2){
            let clientIndex = null;
            //iterate through the clients and set the client with the id matching clientId to the player
            for(let i=0; i<clients.length; i++){
                if(clients[i].clientId === clientId){
                    setPlayer(i)
                    clientIndex = i;
                }
            }
            if(clientIndex === 0){
                setOpponent(1)
            }else if(clientIndex === 1){
                setOpponent(0)
            }
        }
    // eslint-disable-next-line
    }, [clients])

	useEffect(() => {
		if (auth.id) {
			dispatch(getUserInfo(auth.id))
		}
	}, [auth, dispatch])
	
	const setContent = () => {
		switch(phase){
			case 'select-spells':
				return <>
					<Spells />
					<SelectedSpells />
				</>
			case 'gameroom':
				return <CreateGame />
			case 'battle':
				return <GameRoom connection={connection} player={player} opponent={opponent} />
			case 'battle-over':
				return <BattleOver player={player} opponent={opponent} />
			case 'profile':
				return <Profile />
			default:
				return 'AuthLinks Switch Broken (Error 42069)'
		}
	}

	return auth && auth.isAuthenticated ? setContent() : <GuestLinks/>

}

export default Landing