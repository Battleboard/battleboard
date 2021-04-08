
import {spells} from "../json/spells";
import { useSelector, useDispatch } from 'react-redux';
import { removeSpell } from '../actions/userActions';
import Card from './Card';
import Button from './styled/Button'

const SelectedSpells = () => {
    const dispatch = useDispatch()
    const spells = useSelector(state => state.user.spells)
}

const SpellBook = () => {
    return <div style = {{display: "flex", height: "80vh", margin:0,padding:0}}>
        <div style={{textAlign:"center",position:"relative",height: "100px",width: "100vw",backgroundColor: "#333",position: "absolute",top: "0px",margin: 80, marginLeft:0}}>
            <Button style={{margin: '20px auto', borderRadius: 8,borderWidth: 5, float: "left", marginLeft: 25,background: "#b0b0b0"}} >Loadout 1</Button>
            <Button style={{margin: '20px auto', borderRadius: 8,borderWidth: 5, float: "left", marginLeft: 25,background: "#b0b0b0"}} >Loadout 2</Button>
            <Button style={{margin: '20px auto', borderRadius: 8,borderWidth: 5, float: "left", marginLeft: 25,background: "#b0b0b0"}} >Loadout 3</Button>
            <Button style={{margin: '20px auto', borderRadius: 8,borderWidth: 5, float: "left", marginLeft: 25,background: "#b0b0b0"}} >Loadout 4</Button>
            <Button style={{margin: '20px auto', borderRadius: 8,borderWidth: 5, float: "left", marginLeft: 25,background: "#b0b0b0"}} >Loadout 5</Button>
            <Button style={{margin: '20px auto', borderRadius: 8,borderWidth: 5, float: "left", marginLeft: 200,background: "#b0b0b0"}} >Save</Button>
        </div>
            <div style = {{margin: 20}}></div>
                <div style = {{display: "flex", flexWrap: "wrap", minWidth: "300px", maxWidth: 300, height: "50vh"}}>
                    {spells.filter(spell => spell.attribute === "strength").map(spell => {
                        return <div style = {{borderRadius: "50%", height: 100, width: 100, background: "#d10707"}}></div>
                    })}
                </div>
                <div style = {{display: "flex", flexWrap: "wrap", minWidth: "300px", maxWidth: 300, height: "50vh"}}>
                    {spells.filter(spell => spell.attribute === "agility").map(spell => {
                        return <div style = {{borderRadius: "50%", height: 100, width: 100, background: "#0fb019"}}></div>
                    })}
                </div>
                <div style = {{display: "flex", flexWrap: "wrap", minWidth: "300px", maxWidth: 300, height: "50vh"}}>
                    {spells.filter(spell => spell.attribute === "magic").map(spell => {
                        return <div style = {{borderRadius: "50%", height: 100, width: 100, background: "#0974da"}}></div>
                    })}
                </div>
                <div style = {{display: "flex", flexWrap: "wrap", minWidth: "300px", maxWidth: 300, height: "50vh"}}>
                    {spells.filter(spell => spell.attribute === "holy").map(spell => {
                        return <div style = {{borderRadius: "50%", height: 100, width: 100, background: "#f5ea03"}}></div>
                    })}
                </div>
                <div style={{textAlign:"center",position: "relative", height: "200px", minWidth: "300px",backgroundColor: "#333",position: "absolute",bottom: "0px"}}>
                {/*{spells.map((spell, index) => {
                    return <Card key={index} spell={spell} action={() => dispatch(removeSpell(spell))}/>
                })*/}
                </div>
    </div>
}

export default SpellBook