import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import store from '../store';
import Card from './Card';
import { setGameRoom, setPhase} from '../actions/userActions';
import { connect } from 'react-redux';
import ProgressBar from "./styled/ProgressBar";

const GameRoom = ({setGameRoom}) => {
    const [currentSpells, setCurrentSpells] = useState([])
    const [calculating, setCalculating] = useState(false)
    const dispatch = useDispatch()
    const clients = useSelector(state => state.user.gameRoom);
    const connection = useSelector(state => state.user.connection);
    const clientId = store.getState().user.clientId

    useEffect(() => {
        if (clients[0]?.health <= 0 || clients[1]?.health <= 0 ) dispatch(setPhase("battle-over"))
    }, [clients, dispatch])

    const initializeCombat = (spell, id) => {
        if (!calculating) {
            setCalculating(true)

            const payLoad = {
                "method": "evaluate",
                "clientId": clientId,
                "spell": spell,
                "gameId": store.getState().user.gameRoom[0].gameId
            }
            
            connection.send(JSON.stringify(payLoad));
            
            connection.onmessage = message => {
                const response = JSON.parse(message.data);
                if(response.method === 'evaluate'){
                    console.log("Evaluate Response: ", response);
                    //display the previous moves and their effects for 3 seconds while locking them out of picking new moves in the meantime
                    console.log("p0 previous spell: ", response.game.clients[0].previousSpell);
                    console.log("p1 previous spell: ", response.game.clients[1].previousSpell);
                    setCurrentSpells([response.game.clients[0].previousSpell, response.game.clients[1].previousSpell]);

                    setTimeout(() => {
                        setCurrentSpells([])
                        setGameRoom(response.game);
                        setCalculating(false)
                    }, 3000) 
                }
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
                console.log(client)
                return <div key={index} style={{border: '3px solid #333', display: 'flex', margin: 0, width: '50%', flexDirection: 'column', overflow: 'auto'}}>
                    <h4 style={{textAlign: 'center', width: '100%'}}>Player {index + 1} Health: {store.getState().user.gameRoom[index] && store.getState().user.gameRoom[index].health}</h4>
                    <ProgressBar width={(((client.health - 0) * (100 - 0)) / (client.maxHealth - 0)) + 0} color="green"/>
                    <p style={{textAlign: 'center'}}>Status Bar</p>
                    <div style={{background: '#F5F5F5', height: 70, width: '95%', border: '2px solid #333', display: 'flex'}}>
                        {client.debuffs.map((debuff, index) => {
                            return <div key={index} style={{width: 70, height: 80}}>
                                <img src={debuff.icon} style={{width: 40, height: 40, margin: '5px 15px 0'}} alt="" />
                                <div style={{display: 'flex'}}>
                                    <div style={{display: 'flex', height: 30, width: '50%'}}>
                                        <img src="/images/icons/sword.svg" alt="" style={{width: 15, height: 15}} />
                                        <div style={{fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: 14, width: 10, height: 10}}>{debuff.damage}</div>
                                    </div>
                                    <div style={{display: 'flex', height: 30, width: '50%'}}>
                                        <img src="/images/icons/timer.svg" alt="" style={{width: 15, height: 15}} />
                                        <div style={{fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: 14, width: 10, height: 10}}>{debuff.duration}</div>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
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