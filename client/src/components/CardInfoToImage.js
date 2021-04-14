import Spells from "./Spells"


{Object.keys(spell).filter(e => e !== 'name' && e !== "source" && e !== 'debuffs' && e !== 'spellList' && e !== 'index').map((key, index) => {

//mapping through an array of objects and repalcing the called apon key with a image

// use if statement (case statement)

const infoImage = () => {
    switch(key) {
        case "damage":
            return <div>
            <img src ="/images/icons/sword.svg" style={{width: 15, height: 15}} />
            </div>
        case "heal":
            return <img src ="/images/icons/healing.svg" style={{width: 15, height: 15}} />
        case "shield":
            return <img src ="/images/icons/shield.svg" style={{width: 15, height: 15}} />
        case "damageOverTime":
            return <img src ="/images/icons/sword.svg" style={{width: 15, height: 15}} />
        case "damageOverTimeDuration":
            return <img src ="/images/icons/sword.svg" img src ="/images/icons/timer.svg" style={{width: 15, height: 15}} />
        case "healOverTime":
            return <img src ="/images/icons/healing.svg" style={{width: 15, height: 15}} />
        case "healOverTimeDuration":
            return <img src ="/images/icons/healing.svg" img src ="/images/icons/timer.svg" style={{width: 15, height: 15}} />
        case "shieldOverTime":
            return <img src ="/images/icons/shield.svg" style={{width: 15, height: 15}} />
        case "shieldOverTimeDuration":
            return <img src ="/images/icons/shield.svg" img src ="/images/icons/timer.svg" style={{width: 15, height: 15}} />
        case "criticalDamageChance":
            return <img src ="/images/icons/crit.svg" img src ="/images/icons/chance.svg" style={{width: 15, height: 15}} />
        case "criticalDamageIncrease":
            return <img src ="/images/icons/crit.svg" img src ="/images/icons/sword.svg" style={{width: 15, height: 15}} />
        case "criticalHealChance":
            return <img src ="/images/icons/crit.svg" img src ="/images/icons/chance.svg" style={{width: 15, height: 15}} />
        case "criticalHealIncrease":
            return <img src ="/images/icons/crit.svg" img src ="/images/icons/healing.svg" style={{width: 15, height: 15}} />
        case "criticalShieldChance":
            return <img src ="/images/icons/crit.svg" img src ="/images/icons/chance.svg" style={{width: 15, height: 15}} />
        case "criticalShieldIncrease":
            return <img src ="/images/icons/crit.svg" img src ="/images/icons/shield.svg" style={{width: 15, height: 15}} />
        case "clearDebuffType":
            return <img src ="/images/icons/purify.svg" style={{width: 15, height: 15}} />
        case "clearDebuffAmount":
            return <img src ="/images/icons/purify.svg" style={{width: 15, height: 15}} />
        case "clearDebuffDurationCondition":
            return <img src ="/images/icons/purify.svg" img src ="/images/icons/timer.svg" style={{width: 15, height: 15}} />
        case "clearDebuffDuration":
            return <img src ="/images/icons/timer.svg" style={{width: 15, height: 15}} />
        case "clearDebuffAmountCondition":
            return <img src ="/images/icons/sword.svg" img src ="/images/icons/plusMinus.svg" style={{width: 15, height: 15}} />
        case "clearDebuffQuantity": 
        default:
            return "Image Not Found";                                                          
    }
}