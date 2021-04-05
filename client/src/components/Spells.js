import {spells} from "../json/spells";
import Card from "./Card";
import {setSpells} from '../actions/userActions';
import {connect, useSelector} from 'react-redux';

const Spells = ({auth, setSpells}) => {
    const user = useSelector(state => state.user)
    const unlockedSpells = useSelector(state => state.user.unlockedSpells)

    console.log("Unlocked Spells: ", unlockedSpells);

	return  <div style={{display: 'flex', flexWrap: 'wrap', flexGrow: 2, overflow: 'auto', maxHeight: '80vh' }}>
        {spells.map((spell, index) => {
            if(unlockedSpells.includes(index)){
                return <Card key={index} spell={spell} action={() => !user.spells.includes(spell) ? setSpells(spell) : null}/>
            }
            /*return <Card key={index} spell={spell} action={() => !user.spells.includes(spell) ? setSpells(spell) : null}/>*/
        })}
    </div>
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {setSpells})(Spells);