
import {spells} from "../json/spells";
import { useSelector, useDispatch } from 'react-redux';
import { removeSpell } from '../actions/userActions';
import Button from './styled/Button'
import  SpellCircleImage from "./SpellCircleImage";
import React, { useState } from 'react';
import Card from "./Card";


const SpellBook = () => {
    const [LoadOuts, setLoadOuts] = useState([[],[],[],[],[]])
    const [selectedLoadOut, setSelectedLoadOut] = useState(0)
   
    const SelectedLoadOut = (button) => {
        setSelectedLoadOut(button)
    }
    
    const AddSpell = (spell) => {
        if (LoadOuts[selectedLoadOut].length < 6) {  
            let copy = [...LoadOuts]
            copy[selectedLoadOut].push(spell)
            setLoadOuts(copy)
            }
        }
    
    const RemoveSpell = (spell) => {
        let copy = LoadOuts[selectedLoadOut].filter(s => s.name !== spell.name)
        setLoadOuts(copy)
    }
    
    return <div style = {{display: "flex", height: "80vh", margin:0,padding:0, userSelect: "none"}}>
        <div style={{textAlign:"center",position:"relative",height: "100px",width: "100vw",backgroundColor: "#333",position: "absolute",top: "0px",margin: 80, marginLeft:0}}>
            <Button style={{margin: '20px auto', borderRadius: 8,borderWidth: 5, float: "left", marginLeft: 25,background: "#b0b0b0"}} onClick = {() => SelectedLoadOut(0)}>Loadout 1</Button>
            <Button style={{margin: '20px auto', borderRadius: 8,borderWidth: 5, float: "left", marginLeft: 25,background: "#b0b0b0"}} onClick = {() => SelectedLoadOut(1)}>Loadout 2</Button>
            <Button style={{margin: '20px auto', borderRadius: 8,borderWidth: 5, float: "left", marginLeft: 25,background: "#b0b0b0"}} onClick = {() => SelectedLoadOut(2)}>Loadout 3</Button>
            <Button style={{margin: '20px auto', borderRadius: 8,borderWidth: 5, float: "left", marginLeft: 25,background: "#b0b0b0"}} onClick = {() => SelectedLoadOut(3)}>Loadout 4</Button>
            <Button style={{margin: '20px auto', borderRadius: 8,borderWidth: 5, float: "left", marginLeft: 25,background: "#b0b0b0"}} onClick = {() => SelectedLoadOut(4)}>Loadout 5</Button>
            <Button style={{margin: '20px auto', borderRadius: 8,borderWidth: 5, float: "left", marginLeft: 200,background: "#b0b0b0"}} >Save</Button>
        </div>  
            <div style = {{margin:10, marginLeft:0, padding: 0}}></div>
                <div style = {{display: "flex", flexWrap: "wrap", minWidth: "300px",maxWidth: "300px", height: "50vh",marginTop:115,}}>
                    {spells.filter(spell => spell.attribute === "strength").map(spell => {
                        return <SpellCircleImage color={"#bd0404"} ability={spell} action={() => !LoadOuts[selectedLoadOut].includes(spell) ? AddSpell(spell) : null}/>
                    })}
                </div>
                <div style = {{display: "flex", flexWrap: "wrap", minWidth: "300px",maxWidth: "300px", height: "50vh",marginTop:115}}>
                    {spells.filter(spell => spell.attribute === "agility").map(spell => {
                        return <SpellCircleImage color={"#0fb019"} ability={spell} action={() => !LoadOuts[selectedLoadOut].includes(spell) ? AddSpell(spell) : null}/>
                    })}
                </div>
                <div style = {{display: "flex", flexWrap: "wrap", minWidth: "300px",maxWidth: "300px", height: "50vh",marginTop:115}}>
                    {spells.filter(spell => spell.attribute === "magic").map(spell => {
                        return <SpellCircleImage color={"#0974da"} ability={spell} action={() => !LoadOuts[selectedLoadOut].includes(spell) ? AddSpell(spell) : null}/>
                    })}
                </div>
                <div style = {{display: "flex", flexWrap: "wrap", minWidth: "300px",maxWidth: "300px", height: "50vh",marginTop:115}}>
                    {spells.filter(spell => spell.attribute === "holy").map(spell => {
                        return <SpellCircleImage color={"#e6ec1c"} ability={spell} action={() => !LoadOuts[selectedLoadOut].includes(spell) ? AddSpell(spell) : null}/>
                    })}
                </div>
                {/**selected Spells */}
                <div style={{display: "flex", textAlign:"center",position: "relative",height: "180px",width: "100vw",backgroundColor: "#333",position: "absolute",bottom: "0px"}}>
                {LoadOuts[selectedLoadOut] && LoadOuts[selectedLoadOut].map((spell,index) => {
                    return <Card spell={spell} action = {() => RemoveSpell(spell)} />
                }
                )}
                </div>
    </div>
}

export default SpellBook 