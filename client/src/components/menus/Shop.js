import { shopItems } from '../../json/shopItems.json'
import Button from '../styled/Button';

const card_styles = {
	border: '1px solid #7D7D7D',
	borderRadius: 4,
	width: 200,
	height: 230,
	margin: '10px auto 0',
	cursor: 'pointer',
	userSelect: 'none',
	background: '#FFF',
	color: '#333'
}

const Shop = () => {

    return <div style={{display: 'flex', flexDirection: 'column', height: '100%', userSelect: 'none'}}>
        <div style={{background: '#212121',  height: '50%', display: 'flex', justifyContent: 'space-evenly'}}>

            {/* Display Items for Sale */}
            {shopItems.map((item, index) => {
                return <div style={{border: '1px solid white', width: 300, height: '70%', display: 'flex', margin: 'auto 10px', flexDirection: 'column', color: '#FFF', fontFamily: 'sans-serif', cursor: 'pointer'}}>
                    <div style={{textAlign: 'center', width: '100%', marginTop: 30, fontSize: 24, flexGrow: 2}}>
                        <div style={{marginBottom: 4}}>Buy</div>
                        <div>{item.numberOfPacks}</div>
                        <div>{item.numberOfPacks > 1 ? "Packs" : "Pack"}</div>
                    </div>
                    <div style={{flexGrow: 2, textAlign: 'center'}}>
                        <div>3 cards per pack</div>
                    </div>
                    <div style={{textAlign: 'center', width: '100%', fontSize: 24, height: 60, display: 'flex', margin: '0px auto', justifyContent: 'center'}}>
                        <div style={{color: '#FFD949', marginRight: 5, marginTop: 1}}>{item.price}</div>
                        <img src="/images/spells/dubloontoss.svg" alt="" style={{height: 30, width: 30}} />
                    </div>
                </div>
            })}
        </div>

        <div style={{background: '#212121', height: '50%', borderTop: '3px solid white', color: '#FFF', display: 'flex', flexDirection: 'column'}}>
            <div style={{textAlign: 'center', fontSize: 24, margin: 'auto 0'}}>You have 8 Packs</div>
            <div style={card_styles} />
            <div style={{display: 'flex', justifyContent: 'center', margin: 'auto 0'}}>
                <Button style={{color: '#FFF', border: '1px solid #FFF', height: 60}}>Open Pack</Button>
            </div>
        </div>
    </div>
}

export default Shop