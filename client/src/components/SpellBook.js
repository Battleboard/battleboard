
import {spells} from "../json/spells";


const SpellBook = () => {
    return <div style = {{display: "flex"}}>
        <div style = {{display: "flex", flexWrap: "wrap", width: "25vh", height: "100vh"}}>
            {spells.filter(spell => spell.attribute === "strength").map(spell => {
                return <div style = {{borderRadius: "50%", height: 100, width: 100, background: "#d10707"}}></div>
            })}
        </div>
        <div>
            {spells.filter(spell => spell.attribute === "agility").map(spell => {
                return <div style = {{borderRadius: "50%", height: 100, width: 100, background: "#0fb019"}}></div>
            })}
        </div>
        <div>
            {spells.filter(spell => spell.attribute === "magic").map(spell => {
                return <div style = {{borderRadius: "50%", height: 100, width: 100, background: "#0974da"}}></div>
            })}
        </div>
        <div>
            {spells.filter(spell => spell.attribute === "holy").map(spell => {
                return <div style = {{borderRadius: "50%", height: 100, width: 100, background: "#f5ea03"}}></div>
            })}
        </div>

    </div>
}

export default SpellBook