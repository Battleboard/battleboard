import Spells from "./Spells"


{Object.keys(spell).filter(e => e !== 'name' && e !== "source" && e !== 'debuffs' && e !== 'spellList' && e !== 'index').map((key, index) => {

//mapping through an array of objects and repalcing the called apon key with a image

// use if statement (case statement)

const infoImage = () => {
    switch(key) {
        case "damage":
            return <img src ="/images/icons/sword.svg" style={{width: 15, height: 15}} />
        case "heal":
            return <img src ="/images/icons/sword.svg" style={{width: 15, height: 15}} />
        case "shield":
            return <img src ="/images/icons/sword.svg" style={{width: 15, height: 15}} />
        case "damageOverTime":
            return <img src ="/images/icons/sword.svg" style={{width: 15, height: 15}} />
    }
}