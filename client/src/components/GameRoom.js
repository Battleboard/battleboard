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
                    //display the previous moves and their effects for 3 seconds while locking them out of picking new moves in the meantime
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


    return <div style = {{display: "flex", height: '100%', flexDirection: 'column', background: "#212121"}}>
        <div style = {{borderBottom: "5px solid #19A0EC", paddingBottom: 10}}>
            {/**palyer 2 Health progress bar!!! */}
            <div style = {{width: '75%', background: '#586973', display: 'flex', flexDirection: "column", margin: "35px auto"}}>
                {clients[1] && <h4 style={{margin: 0, fontSize: 24,textAlign: 'center', width: '100%'}}>Player {clients[1].username} Health: {store.getState().user.gameRoom[1] && store.getState().user.gameRoom[1].health}</h4>}
                {clients[1] && <ProgressBar width={(((clients[1].health - 0) * (100 - 0)) / (clients[1].maxHealth - 0)) + 0} color="green"/>}
            </div>
            {/** player 2 Status Effect Bar!!!*/}
            <div style = {{width: '85%', background: '#C4C4C4', display: 'flex', height: 70, margin: "0px auto 10px auto"}}>
                        {clients[1] && clients[1].debuffs.map((debuff, index) => {
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
        {/** Broken Turn reveal stage */}
        <div style = {{borderBottom: "5px solid #19A0EC", width: '100%', background: '#000000', display: 'flex', height: 250, margin: "1px auto"}}>
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
        <div>
        {/**Player 1 Health Bar */}
        <div style = {{width: '75%', background: '#586973', display: 'flex',flexDirection:"column", margin: "35px auto"}}>
            {clients[0] && <h4 style={{margin: 0, fontSize: 24,textAlign: 'center', width: '100%'}}>Player {clients[0].username} Health: {store.getState().user.gameRoom[1] && store.getState().user.gameRoom[1].health}</h4>}
                {clients[0] && <ProgressBar width={(((clients[0].health - 0) * (100 - 0)) / (clients[0].maxHealth - 0)) + 0} color="green"/>}
            </div>
            {/** Player 1 Status Bar */}
            <div style = {{width: '85%', background: '#C4C4C4', display: 'flex', height: 70, margin: "0px auto 10px auto"}}>
                {clients[0] && clients[0].debuffs.map((debuff, index) => {
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
                        {clients[0] && clients[0].spells.map((spell, index) => {
                            return <div key={index}>
                                <Card  spell={spell} action={() => initializeCombat(spell, clients[0].clientId)}/>
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