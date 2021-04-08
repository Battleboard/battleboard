import Button from './styled/Button'
import { spells } from "../json/spells";
import Card from './Card';

const BuyPackModal = ({show, packSpells, toggleShow}) => {

	return  <div style={{position:'fixed', top:'33%', left:'33%', height:'70%', margin:'auto', zIndex: 200}}>
        <div style={{background:'rgb(51, 51, 51)'}}>

            <Button onClick={() => toggleShow(!show)}>X</Button>

            {spells.map((spell, index) => {
                if(packSpells.includes(index)){
                    return <Card key={index} spell={spell}/>
                }else{
                    return null
                }
            })}
        </div>
    </div>
};

export default BuyPackModal;