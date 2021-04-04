import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import store from '../store';
import Card from './Card';
import { setGameRoom, setPhase} from '../actions/userActions';
import { connect } from 'react-redux';
import ProgressBar from "./styled/ProgressBar";

const GameRoom = ({setGameRoom}) => {
    const [currentUserSpell, setCurrentUserSpell] = useState(null)
    const [currentSpells, setCurrentSpells] = useState([])
    const [calculating, setCalculating] = useState(false)

    const [player, setPlayer] = useState()
    const [opponent, setOpponent] = useState()

    const dispatch = useDispatch()
    const clients = useSelector(state => state.user.gameRoom);
    const connection = useSelector(state => state.user.connection);
    const clientId = store.getState().user.clientId

    //route the players into player and opponent
    useEffect(() => {
        //if the game room only has a single client set the player to the client
        if(clients.length === 1){
            setPlayer(clients[0]);

        }else if(clients.length === 2){
            let clientIndex = null;
            //iterate through the clients and set the client with the id matching clientId to the player
            for(let i=0; i<clients.length; i++){
                if(clients[i].clientId === clientId){
                    setPlayer(clients[i])
                    clientIndex = i;
                }
            }
            if(clientIndex === 0){
                setOpponent(clients[1])
            }else if(clientIndex === 1){
                setOpponent(clients[0])
            }
        }
    // eslint-disable-next-line
    }, [clients])

    useEffect(() => {
        if (player?.health <= 0 || opponent?.health <= 0 ) dispatch(setPhase("battle-over"))
    // eslint-disable-next-line
    }, [clients, dispatch])

    const initializeCombat = (spell, id) => {
        if (!calculating) {
            setCalculating(true)

            setCurrentUserSpell(spell)

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
                    //display the previous moves and their effects for 3 seconds while locking them out of picking new moves in the meantime
                    setCurrentSpells([response.game.clients[0].previousSpell, response.game.clients[1].previousSpell]);
                    console.log("damage 1: ",  response.game.clients[0].damageResult);
                    console.log("damage: 2 ",  response.game.clients[1].damageResult);
                    setTimeout(() => {
                        setCurrentSpells([])
                        setCurrentUserSpell(null)
                        setGameRoom(response.game);
                        setCalculating(false)
                    }, 3000) 
                }
            }
        }
    }


    return <div style = {{display: "flex", height: '100%', flexDirection: 'column', background: "#212121"}}>
        <div style = {{borderBottom: "5px solid #19A0EC", paddingBottom: 10}}>
            {/**palyer 2 Health progress bar!!! */}
            <div style = {{width: '75%', background: '#586973', display: 'flex', flexDirection: "column", margin: "35px auto"}}>
                {opponent && <h4 style={{margin: 0, fontSize: 24,textAlign: 'center', width: '100%'}}>Player {opponent.username} Health: {opponent && opponent.health}</h4>}
                {opponent && <ProgressBar width={(((opponent.health - 0) * (100 - 0)) / (opponent.maxHealth - 0)) + 0} color="green"/>}
            </div>
            {/** player 2 Status Effect Bar!!!*/}
            <div style = {{width: '85%', background: '#C4C4C4', display: 'flex', height: 70, margin: "0px auto 10px auto"}}>
                {opponent && opponent.debuffs.map((debuff, index) => {
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
        </div>

        {/** Card Reveal Area */}
        <div style = {{borderBottom: "5px solid #19A0EC", width: '100%', background: '#000000', display: 'flex', height: 250, margin: "1px auto"}}>
            <div style={{border: '3px solid #333', display: 'flex', margin: 0, width: '50%', flexDirection: 'column', overflow: 'auto'}}>
                <div style={{margin: '0px auto'}}>
                    {currentUserSpell && <Card spell={currentUserSpell} />}
                </div>
            </div>
            <div style={{border: '3px solid #333', display: 'flex', margin: 0, width: '50%', flexDirection: 'column', overflow: 'auto'}}>
                <div style={{margin: '0px auto'}}>
                    {currentSpells.length !== 0 && <Card spell={currentSpells[1]} />}
                </div>  
            </div>
        </div>

        <div>
        {/**Player 1 Health Bar */}
        <div style = {{width: '75%', background: '#586973', display: 'flex',flexDirection:"column", margin: "35px auto"}}>
            {player && <h4 style={{margin: 0, fontSize: 24,textAlign: 'center', width: '100%'}}>Player {player.username} Health: {player && player.health}</h4>}
                {player && <ProgressBar width={(((player.health - 0) * (100 - 0)) / (player.maxHealth - 0)) + 0} color="green"/>}
            </div>
            {/** Player 1 Status Bar */}
            <div style = {{width: '85%', background: '#C4C4C4', display: 'flex', height: 70, margin: "0px auto 10px auto"}}>
                {player && player.debuffs.map((debuff, index) => {
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
            {/**Spell Display */}
            <div style={{width: '100%', display: 'flex', flexWrap: 'wrap', height: 300, margin: '10px auto', justifyContent: 'center', overflow: "auto"}}>
                {player && player.spells.map((spell, index) => {
                    return <div key={index}>
                        <Card  spell={spell} action={() => initializeCombat(spell, player.clientId)}/>vv
                    </div>
                })}
            </div>
        </div>
    </div>
    
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {setGameRoom})(GameRoom);