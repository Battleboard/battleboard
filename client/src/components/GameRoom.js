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

	return <div style={{display: 'flex', height: '100%', flexDirection: 'column'}}>
        <div style={{width: '100%', flexGrow: 1, background: 'green'}}>
            {/* Area to display battle info */}
        </div>
        <div style={{display: 'flex', flexGrow: 2}}>
            {clients.map((client, index) => {
                return <div key={index} style={{border: '3px solid #333', display: 'flex', margin: 0, width: '50%', flexDirection: 'column'}}>
                    <h4 style={{textAlign: 'center', width: '100%'}}>Player {index + 1} Health: {store.getState().user.gameRoom[index] && store.getState().user.gameRoom[index].health}</h4> 
                    <div style={{width: '60%', display: 'flex', flexWrap: 'wrap', height: 550, margin: '10px auto', justifyContent: 'center'}}>
                        {client.spells.map((spell, index) => {
                            return <div key={index}>
                                <Card  spell={spell} action={() => spellClicked(spell, client.clientId)}/>
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