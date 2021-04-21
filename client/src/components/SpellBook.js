import { useEffect } from 'react'
import { spells } from "../json/spells";
import { useSelector, useDispatch } from 'react-redux';
import { setLoadouts, setPhase, saveLoadouts, setSpells, clearSpells, removeSpell } from '../actions/userActions';
import Button from '@material-ui/core/Button';
import { setGameRoom } from '../actions/roomActions';
import SpellCircleImage from "./SpellCircleImage";
import { useState } from 'react';
import Card from "./Card";
import Spells from "./Spells";
import store from '../store';

const spell_row_styles = { 
    display: "flex", 
    flexWrap: "wrap", 
    height: 500,
    width: '95%',
    margin: '10px auto'
}

const button_styles = { border: '1px solid white', height: 60, margin: 'auto 20px', color: '#FFF', outline: 'none'}

const SpellBook = ({ type }) => {
    const dispatch = useDispatch()
    const loadouts = useSelector(state => state.user.loadouts)
    const selectedGame = useSelector(state => state.user.selectedGame)
    const connection = useSelector(state => state.room.connection)
    const [selectedLoadOut, setSelectedLoadOut] = useState(0)
   
   //Sets the user's spells to the currently selected loadout's spell list
    useEffect(() => {
        dispatch(clearSpells())
        dispatch(setSpells(loadouts[selectedLoadOut]))
    }, [dispatch, loadouts, selectedLoadOut])

    const SelectedLoadOut = (button) => {
        setSelectedLoadOut(button)
        dispatch(clearSpells())
        dispatch(setSpells(loadouts[selectedLoadOut]))
    }
    
    const RemoveSpell = (spell) => {
        let copy = [...loadouts]
        copy[selectedLoadOut] = copy[selectedLoadOut].filter(s => s.name !== spell.name)
        dispatch(setLoadouts(copy))
        dispatch(removeSpell(spell))
    }

    const AddSpell = (spell) => {
        if (loadouts[selectedLoadOut].length < 6) {  
            let copy = [...loadouts]
            copy[selectedLoadOut].push(spell)
            dispatch(setLoadouts(copy))
            dispatch(setSpells(spell))
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
                dispatch(setGameRoom(response.game))
            }
        }
    }

    // console.log(loadouts[selectedLoadOut])
    
    return <div style = {{display: "flex", margin:0, padding:0, userSelect: "none", flexDirection: 'column'}}>

        {/* Loadout Navbar */}
        <div style={{textAlign:"center", height: "100px", width: "100%", backgroundColor: "#333", margin: 0, marginLeft: 0, display: 'flex', justifyContent: 'space-between'}}>
            {loadouts.map((loadout, index) => {
                return <Button key={index} variant="outlined" style={{...button_styles, border: selectedLoadOut === index ? '1px solid #0FB019' : '1px solid white', color: selectedLoadOut === index ? '#0FB019' : 'white'}} onClick={() => SelectedLoadOut(index)}>Loadout {index + 1}</Button>
            })}
            {type === 'loadouts' ? <Button style={{...button_styles}}  onClick = {() => dispatch(saveLoadouts())}>Save</Button> : <Button style={{...button_styles}} onClick={joinGameRoom}>Fight</Button>}
        </div> 

        {/* Spell Columns */}
        <div style={{margin: 0, width: '100%', padding: 0, display: "flex", height: 507, overflow: 'auto', flexWrap: 'wrap'}}>

            <div style = {spell_row_styles}>
                {spells.filter(spell => spell.attribute === "strength").map((spell, index) => {
                    return <Card key={index} spell={spell} color={"#bd0404"} action={() => !loadouts[selectedLoadOut].includes(spell) ? AddSpell(spell) : null}/>
                })}
            </div>

            <div style={spell_row_styles}>
                {spells.filter(spell => spell.attribute === "agility").map((spell, index) => {
                    return <Card key={index} spell={spell} color={"#0fb019"} action={() => !loadouts[selectedLoadOut].includes(spell) ? AddSpell(spell) : null}/>
                })}
            </div>

            <div style={spell_row_styles}>
                {spells.filter(spell => spell.attribute === "magic").map((spell, index) => {
                    return <Card key={index} spell={spell} color={"#0974da"} action={() => !loadouts[selectedLoadOut].includes(spell) ? AddSpell(spell) : null}/>
                })}
            </div>

            <div style={spell_row_styles}>
                {spells.filter(spell => spell.attribute === "holy").map((spell, index) => {
                    return <Card key={index} spell={spell} color={"#e6ec1c"} action={() => !loadouts[selectedLoadOut].includes(spell) ? AddSpell(spell) : null}/>
                })}
            </div>
        </div>

        {/**selected Spells */}
        <div style={{display: "flex", position: "relative", justifyContent: "center", textAlign:"center", minHeight: 250, width: "100vw", backgroundColor: "#333", position: "absolute", bottom: "0px"}}>
            {loadouts[selectedLoadOut] && loadouts[selectedLoadOut].map((spell,index) => {
                return <Card key={index} spell={spell} action = {() => RemoveSpell(spell)} />
            })}
            {/* **max card indidcator** */}
            <div style={{ fontFamily: 'sans-serif', position: "absolute", top:"5px", right: "5px", color: "#FFFFFF", fontSize: "1.75rem", height: "100%"}}>
                {loadouts[selectedLoadOut].length !== 6 ? `${loadouts[selectedLoadOut].length}/6` : "MAX"}
            </div>
        </div>
    </div>
}

export default SpellBook 