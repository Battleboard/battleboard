import Spells from "./Spells"




//mapping through an array of objects and repalcing the called apon key with a image

// use if statement (case statement)

export const infoImage = (key) => {
    switch(key) {
        case "damage":
            return <div style={{float: "left"}}>
            <img src ="/images/icons/sword.svg" style={{width: 15, height: 15}} />
            </div>
        case "heal":
            return <div style={{float: "left"}}>
                <img src ="/images/icons/healing.svg" style={{width: 15, height: 15}} />
            </div>
        case "shield":
            return <div style={{float: "left"}}>
                <img src ="/images/icons/shield.svg" style={{width: 15, height: 15}} />
            </div>
        case "damageOverTime":
            return <div style={{float: "left"}}>
                <img src ="/images/icons/sword.svg" style={{width: 15, height: 15}} />
            </div>
        case "damageOverTimeDuration":
            return <div style={{float: "left"}}>
                <img src ="/images/icons/sword.svg" style={{width: 15, height: 15}}/>
                <img src ="/images/icons/timer.svg" style={{width: 15, height: 15}} />
            </div>
        case "healOverTime":
            return <div style={{float: "left"}}>
                <img src ="/images/icons/healing.svg" style={{width: 15, height: 15}} />
            </div>
        case "healOverTimeDuration":
            return <div style={{float: "left"}}>
                <img src ="/images/icons/healing.svg" style={{width: 15, height: 15}} />
                <img src ="/images/icons/timer.svg" style={{width: 15, height: 15}} />
            </div>
        case "shieldOverTime":
            return <div style={{float: "left"}}>
                <img src ="/images/icons/shield.svg" style={{width: 15, height: 15}} />
            </div>
        case "shieldOverTimeDuration":
            return <div style={{float: "left"}}>
                <img src ="/images/icons/shield.svg" style={{width: 15, height: 15}} />
                <img src ="/images/icons/timer.svg" style={{width: 15, height: 15}} />
            </div>
        case "criticalDamageChance":
            return <div style={{float: "left"}}>
                <img src ="/images/icons/crit.svg" style={{width: 15, height: 15}}/>
                <img src ="/images/icons/chance.svg" style={{width: 15, height: 15}} />
            </div>
        case "criticalDamageIncrease":
            return <div style={{float: "left"}}>
                <img src ="/images/icons/crit.svg" style={{width: 15, height: 15}} />
                <img src ="/images/icons/sword.svg" style={{width: 15, height: 15}} />
            </div>
        case "criticalHealChance":
            return <div style={{float: "left"}}>
                <img src ="/images/icons/crit.svg" style={{width: 15, height: 15}} />
                <img src ="/images/icons/chance.svg" style={{width: 15, height: 15}} />
            </div>
        case "criticalHealIncrease":
            return <div style={{float: "left"}}>
                <img src ="/images/icons/crit.svg" style={{width: 15, height: 15}} />
                <img src ="/images/icons/healing.svg" style={{width: 15, height: 15}} />
            </div>
        case "criticalShieldChance":
            return <div style={{float: "left"}}>
                <img src ="/images/icons/crit.svg" style={{width: 15, height: 15}} />
                <img src ="/images/icons/chance.svg" style={{width: 15, height: 15}} />
                </div>
        case "criticalShieldIncrease":
            return <div style={{float: "left"}}>
                <img src ="/images/icons/crit.svg" style={{width: 15, height: 15}} />
                <img src ="/images/icons/shield.svg" style={{width: 15, height: 15}} />
            </div>
        case "clearDebuffType":
            return <div style={{float: "left"}}>
                <img src ="/images/icons/purify.svg" style={{width: 15, height: 15}} />
            </div>
        case "clearDebuffAmount":
            return <div style={{float: "left"}}>
                <img src ="/images/icons/purify.svg" style={{width: 15, height: 15}} />
            </div>
        case "clearDebuffDurationCondition":
            return <div style={{float: "left"}}>
                <img src ="/images/icons/purify.svg" style={{width: 15, height: 15}} />
                <img src ="/images/icons/timer.svg" style={{width: 15, height: 15}} />
            </div>
        case "clearDebuffDuration":
            return <div style={{float: "left"}}>
                <img src ="/images/icons/timer.svg" style={{width: 15, height: 15}} />
            </div>
        case "clearDebuffAmountCondition":
            return <div style={{float: "left"}}>
                <img src ="/images/icons/purify.svg" style={{width: 15, height: 15}} />
                <img src ="/images/icons/plusMinus.svg" style={{width: 15, height: 15}} />
            </div>
        case "clearDebuffQuantity": 
            return <div style={{float: "left"}}>
                <img src ="/images/icons/purify.svg" style={{width: 15, height: 15}} />
                <img src ="/images/icons/quantity.svg" style={{width: 15, height: 15}} />
            </div>
        case "attribute":
            return <div style={{float: "left"}}></div>
        default:
            return "Image Not Found";                                                          
    }
}

