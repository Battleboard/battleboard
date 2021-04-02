import { useSelector } from 'react-redux';
import store from '../store';
import Card from './Card';
import {setGameRoom} from '../actions/userActions';
import {connect} from 'react-redux';

const GameRoom = ({setGameRoom}) => {

    const clients = useSelector(state => state.user.gameRoom);
    const connection = useSelector(state => state.user.connection);

    const spellClicked = (spell, id) => {

        const payLoad = {
            "method": "evaluate",
            "clientId": store.getState().user.clientId,
            "spell": spell,
            "gameId": store.getState().user.gameId
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

	return  <div>
        <h4>Player 1 Health: {store.getState().user.gameRoom[0] && store.getState().user.gameRoom[0].health}</h4>
        <h4>Player 2 Health: {store.getState().user.gameRoom[1] && store.getState().user.gameRoom[1].health}</h4>
        
        <div style={{display: 'flex'}}>
            {clients.map((client, index) => {
                return <div key={index} style={{border: '3px solid #333', display: 'flex', margin: 10}}>    
                    {client.spells.map((spell, index) => {
                        return <div key={index}>
                            <Card  spell={spell} action={() => spellClicked(spell, client.clientId)}/> {spell.name} - {client.clientId}
                        </div>
                    })}
                </div>
            })}
        </div>

    </div>
};

const mapStateToProps = state => ({
    auth: state.auth
});




//export default CreateGame;
export default connect(mapStateToProps, {setGameRoom})(GameRoom);

//export default GameRoom;