
import {spells} from "../json/spells";
import { useSelector, useDispatch } from 'react-redux';
import {setLoadouts } from '../actions/userActions';
import Button from './styled/Button'
import  SpellCircleImage from "./SpellCircleImage";
import React, { useState } from 'react';
import Card from "./Card";


const SpellBook = () => {
    const dispatch = useDispatch()
    const loadouts = useSelector(state => state.user.loadouts)
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
    
    

    //console.log(loadouts[selectedLoadOut])
    
    return <div style = {{display: "flex", height: "80vh", margin:0,padding:0, userSelect: "none"}}>
        <div style={{textAlign:"center",height: "100px",width: "100vw",backgroundColor: "#333",position: "absolute",top: "0px",margin: 80, marginLeft:0}}>
            <Button style={{margin: '20px auto', borderRadius: 8,borderWidth: 5, float: "left", marginLeft: 25,background: "#b0b0b0"}} onClick = {() => SelectedLoadOut(0)}>Loadout 1</Button>
            <Button style={{margin: '20px auto', borderRadius: 8,borderWidth: 5, float: "left", marginLeft: 25,background: "#b0b0b0"}} onClick = {() => SelectedLoadOut(1)}>Loadout 2</Button>
            <Button style={{margin: '20px auto', borderRadius: 8,borderWidth: 5, float: "left", marginLeft: 25,background: "#b0b0b0"}} onClick = {() => SelectedLoadOut(2)}>Loadout 3</Button>
            <Button style={{margin: '20px auto', borderRadius: 8,borderWidth: 5, float: "left", marginLeft: 25,background: "#b0b0b0"}} onClick = {() => SelectedLoadOut(3)}>Loadout 4</Button>
            <Button style={{margin: '20px auto', borderRadius: 8,borderWidth: 5, float: "left", marginLeft: 25,background: "#b0b0b0"}} onClick = {() => SelectedLoadOut(4)}>Loadout 5</Button>
            <Button style={{margin: '20px auto', borderRadius: 8,borderWidth: 5, float: "left", marginLeft: 200,background: "#b0b0b0"}} >Save</Button>
        </div>  
            <div style = {{margin:0, marginLeft:-17, padding: 0, overflow: "scroll"}}></div>
                <div style = {{display: "flex", flexWrap: "wrap", minWidth: "300px",maxWidth: "300px", height: "50vh",marginTop:115,}}>
                    {spells.filter(spell => spell.attribute === "strength").map((spell,index) => {
                        return <SpellCircleImage color={"#bd0404"} key={index} ability={spell} action={() => !loadouts[selectedLoadOut].includes(spell) ? AddSpell(spell) : null}/>
                    })}
                </div>
                <div style = {{display: "flex", flexWrap: "wrap", minWidth: "300px",maxWidth: "300px", height: "50vh",marginTop:115}}>
                    {spells.filter(spell => spell.attribute === "agility").map((spell,index) => {
                        return <SpellCircleImage color={"#0fb019"} key={index} ability={spell} action={() => !loadouts[selectedLoadOut].includes(spell) ? AddSpell(spell) : null}/>
                    })}
                </div>
                <div style = {{display: "flex", flexWrap: "wrap", minWidth: "300px",maxWidth: "300px", height: "50vh",marginTop:115}}>
                    {spells.filter(spell => spell.attribute === "magic").map((spell,index) => {
                        return <SpellCircleImage color={"#0974da"} key={index} ability={spell} action={() => !loadouts[selectedLoadOut].includes(spell) ? AddSpell(spell) : null}/>
                    })}
                </div>
                <div style = {{display: "flex", flexWrap: "wrap", minWidth: "300px",maxWidth: "300px", height: "50vh",marginTop:115}}>
                    {spells.filter(spell => spell.attribute === "holy").map((spell,index) => {
                        return <SpellCircleImage color={"#e6ec1c"} key={index} ability={spell} action={() => !loadouts[selectedLoadOut].includes(spell) ? AddSpell(spell) : null}/>
                    })}
                </div>
                {/**selected Spells */}
                <div style={{display: "flex", textAlign:"center",height: "180px",width: "100vw",backgroundColor: "#333",position: "absolute",bottom: "0px"}}>
                {loadouts[selectedLoadOut] && loadouts[selectedLoadOut].map((spell,index) => {
                    return <Card key={index} spell={spell} action = {() => RemoveSpell(spell)} />
                }
                )}
                </div>
    </div>
}

export default SpellBook 