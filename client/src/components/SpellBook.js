
import { spells } from "../json/spells";
import { useSelector, useDispatch } from 'react-redux';
import { setLoadouts, setPhase } from '../actions/userActions';
import Button from './styled/Button'
import { setGameRoom } from '../actions/roomActions';
import SpellCircleImage from "./SpellCircleImage";
import { useState } from 'react';
import Card from "./Card";
import store from '../store';

const spell_column_styles = { 
    // display: "flex", 
    // flexWrap: "wrap", 
    // minWidth: "300px", 
    // maxWidth: "300px",
    // margin: '5px 0 0 5px',
    display: 'grid',
    gridTemplateColumns: '100px 100px 100px',
    gridAutoFlow: 'dense',
    gap: '10px',
    // width: '300px',
    margin: '10px auto'
}

const button_styles = { border: '1px solid white', height: 60, margin: 'auto 20px', color: '#FFF'}

const SpellBook = ({ type }) => {
    const dispatch = useDispatch()
    const loadouts = useSelector(state => state.user.loadouts)
    const selectedGame = useSelector(state => state.user.selectedGame)
    const connection = useSelector(state => state.room.connection)
    const [selectedLoadOut, setSelectedLoadOut] = useState(0)
   
    const SelectedLoadOut = (button) => {
        setSelectedLoadOut(button)
    }
    
    const RemoveSpell = (spell) => {
        let copy = [...loadouts]
        copy[selectedLoadOut] = copy[selectedLoadOut].filter(s => s.name !== spell.name)
       // console.log("copy",copy)
       dispatch(setLoadouts(copy))
    }

    const AddSpell = (spell) => {
        if (loadouts[selectedLoadOut].length < 6) {  
            let copy = [...loadouts]
            copy[selectedLoadOut].push(spell)
            dispatch(setLoadouts(copy))
        }
    }
    
    const joinGameRoom = () => {
        dispatch(setPhase("battle"))

        const payLoad = {
            "method": "join",
            "clientId": store.getState().room.clientId,
            "gameId": selectedGame,
            "spells": store.getState().user.spells,
            "health": store.getState().user.startingHealth,
            "maxHealth": store.getState().user.maxHealth,
            "username": store.getState().auth.name,
            "maxShield": store.getState().user.maxShield,
            "shield": store.getState().user.startingShield
        }

        connection.send(JSON.stringify(payLoad));
        
        connection.onmessage = message => {
            const response = JSON.parse(message.data);
            if(response.method === 'join'){
                //save the game room information to store
                setGameRoom(response.game)
            }
        }
    }

    //console.log(loadouts[selectedLoadOut])
    
    return <div style = {{display: "flex", margin:0, padding:0, userSelect: "none", flexDirection: 'column'}}>

        {/* Loadout Navbar */}
        <div style={{textAlign:"center", height: "100px", width: "100%", backgroundColor: "#333", margin: 0, marginLeft: 0, display: 'flex', justifyContent: 'space-between'}}>
            <Button style={button_styles} onClick = {() => SelectedLoadOut(0)}>Loadout 1</Button>
            <Button style={button_styles} onClick = {() => SelectedLoadOut(1)}>Loadout 2</Button>
            <Button style={button_styles} onClick = {() => SelectedLoadOut(2)}>Loadout 3</Button>
            <Button style={button_styles} onClick = {() => SelectedLoadOut(3)}>Loadout 4</Button>
            <Button style={button_styles} onClick = {() => SelectedLoadOut(4)}>Loadout 5</Button>
            {type === 'loadouts' ? <Button style={{...button_styles}} >Save</Button> : <Button style={{...button_styles}} onClick={joinGameRoom}>Fight</Button>}
        </div> 

        {/* Spell Columns */}
        <div style={{margin: 0, width: '100%', padding: 0, display: "flex", height: 507, overflow: 'auto'}}>
            <div style = {spell_column_styles}>
                {spells.filter(spell => spell.attribute === "strength").map((spell,index) => {
                    return <SpellCircleImage style={{gridColumn: 1}} color={"#bd0404"} key={index} ability={spell} action={() => !loadouts[selectedLoadOut].includes(spell) ? AddSpell(spell) : null}/>
                })}
            </div>
            <div style = {spell_column_styles}>
                {spells.filter(spell => spell.attribute === "agility").map((spell,index) => {
                    return <SpellCircleImage style={{gridColumn: 2}} color={"#0fb019"} key={index} ability={spell} action={() => !loadouts[selectedLoadOut].includes(spell) ? AddSpell(spell) : null}/>
                })}
            </div>
            <div style = {spell_column_styles}>
                {spells.filter(spell => spell.attribute === "magic").map((spell,index) => {
                    return <SpellCircleImage style={{gridColumn: 3}} color={"#0974da"} key={index} ability={spell} action={() => !loadouts[selectedLoadOut].includes(spell) ? AddSpell(spell) : null}/>
                })}
            </div>
            <div style = {spell_column_styles}>
                {spells.filter(spell => spell.attribute === "holy").map((spell,index) => {
                    return <SpellCircleImage style={{gridColumn: 4}} color={"#e6ec1c"} key={index} ability={spell} action={() => !loadouts[selectedLoadOut].includes(spell) ? AddSpell(spell) : null}/>
                })}
            </div>
        </div>

        {/**selected Spells */}
        <div style={{display: "flex", textAlign:"center", minHeight: 250, width: "100vw", backgroundColor: "#333", position: "absolute", bottom: "0px"}}>
            {loadouts[selectedLoadOut] && loadouts[selectedLoadOut].map((spell,index) => {
                return <Card key={index} spell={spell} action = {() => RemoveSpell(spell)} />
            })}
        </div>
    </div>
}

export default SpellBook 