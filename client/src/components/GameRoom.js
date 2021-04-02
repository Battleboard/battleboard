import { useState } from 'react'
import { useSelector } from 'react-redux';
import store from '../store';
import Card from './Card';
import {setGameRoom} from '../actions/userActions';
import {connect} from 'react-redux';

const container_styles = {
	border: '1px solid #7D7D7D',
	borderRadius: 4,
	width: 200,
	height: 230,
	margin: '10px 0 0 10px',
	cursor: 'pointer',
	userSelect: 'none',
	background: '#FFF',
	color: '#333'
}

const GameRoom = ({setGameRoom}) => {
    const [currentSpells, setCurrentSpells] = useState([])
    const clients = useSelector(state => state.user.gameRoom);
    const connection = useSelector(state => state.user.connection);
    const clientId = store.getState().user.clientId
    const gameId = store.getState().user.gameId

    const initializeCombat = (spell, id) => {
        const payLoad = {
            "method": "get-info",
            "clientId": clientId,
            "spell": spell,
            "gameId": gameId
        }
        
        connection.send(JSON.stringify(payLoad));

        connection.onmessage = message => {
            const response = JSON.parse(message.data);
            console.log(response.spells)
            if(response.method === 'get-info'){
                //display the previous moves and their effects for 3 seconds while locking them out of picking new moves in the meantime
                if (response.spells[0] !== null && response.spells[1] !== null) {
                    setCurrentSpells(response.spells)
                    console.log("response: ", response);
                    setTimeout(() => {
                        setCurrentSpells([])
                        evaluateCombat(spell, id)
                    }, 3000)
                }
            }
        }
    }

    const evaluateCombat = (spell, id) => {
        console.log('evaluate combat')
        const payLoad = {
            "method": "evaluate",
            "clientId": clientId,
            "spell": spell,
            "gameId": gameId
        }
        
        connection.send(JSON.stringify(payLoad));

        connection.onmessage = message => {
            const response = JSON.parse(message.data);

            console.log("response: ", response);
            
            if(response.method === 'evaluate'){
                //update the health of player 1 and player 2
                setGameRoom(response.game);
            }
            
        }
    }

	return <div style={{display: 'flex', height: '100%', flexDirection: 'column'}}>
        <div style={{width: '100%', background: 'green', display: 'flex', height: 270}}>
            <div style={{border: '3px solid #333', display: 'flex', margin: 0, width: '50%', flexDirection: 'column', overflow: 'auto'}}>
                <div style={{margin: '0px auto'}}>
                    {currentSpells.length !== 0 && <Card spell={currentSpells[0]} />}
                </div>
            </div>
            <div style={{border: '3px solid #333', display: 'flex', margin: 0, width: '50%', flexDirection: 'column', overflow: 'auto'}}>
                <div style={{margin: '0px auto'}}>
                    {currentSpells.length !== 0 && <Card spell={currentSpells[1]} />}
                </div>  
            </div>
        </div>
        <div style={{display: 'flex', flexGrow: 2}}>
            {clients.map((client, index) => {
                return <div key={index} style={{border: '3px solid #333', display: 'flex', margin: 0, width: '50%', flexDirection: 'column', overflow: 'auto'}}>
                    <h4 style={{textAlign: 'center', width: '100%'}}>Player {index + 1} Health: {store.getState().user.gameRoom[index] && store.getState().user.gameRoom[index].health}</h4> 
                    <div style={{width: '60%', display: 'flex', flexWrap: 'wrap', height: 550, margin: '10px auto', justifyContent: 'center'}}>
                        {client.spells.map((spell, index) => {
                            return <div key={index}>
                                <Card  spell={spell} action={() => initializeCombat(spell, client.clientId)}/>
                            </div>
                        })}
                    </div>
                </div>
            })}
        </div>       
    </div>
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {setGameRoom})(GameRoom);