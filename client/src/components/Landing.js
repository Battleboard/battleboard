import React, { useEffect } from 'react';
import store from '../store';
import { Link } from "react-router-dom";
import Button from './styled/Button'
import Logo from './styled/Logo'
import Spells from "./Spells";
import CreateGame from "./CreateGame";
import SelectedSpells from "./SelectedSpells";
import { useSelector, useDispatch } from 'react-redux'
import GameRoom from "./GameRoom";
import { setPhase, resetGame, getSpells } from '../actions/userActions'
import { deleteRoom } from '../actions/roomActions'

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
	const phase = useSelector(state => state.user.phase)
	const connection = useSelector(state => state.room.connection)
	const clients = useSelector(state => state.room.gameRoom);
	const auth = useSelector(state => state.auth)


	useEffect(() => {
			store.dispatch(getSpells(auth.id));
	}, [auth])
	
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
				return <GameRoom connection={connection} />
			case 'battle-over':
				dispatch(deleteRoom(clients[0].gameId))
				return <div style={{display: 'flex', flexDirection: 'column'}}>
					<p>{`Player 1 hp: ${clients[0].health}`}</p>
					<p>{`Player 2 hp: ${clients[1].health}`}</p>
					{clients[0].health > clients[1].health ? <p>player 1 wins</p> : <p>player 2 wins</p>}
					<button onClick={() => {
						dispatch(setPhase('select-spells'))
						dispatch(resetGame())
					}}>restart</button>
				</div>
			default:
				return 'AuthLinks Switch Broken (Error 42069)'
		}
	}

	return auth && auth.isAuthenticated ? setContent() : <GuestLinks/>

}

export default Landing