import {spells} from "../json/spells";
import Card from "./Card";
import {setSpells} from '../actions/userActions';
import {connect, useSelector} from 'react-redux';

const Spells = ({auth, setSpells}) => {
    const user = useSelector(state => state.user)
    const unlockedSpells = useSelector(state => state.user.unlockedSpells)
	return  <div style={{display: 'flex', flexWrap: 'wrap', flexGrow: 2, overflow: 'auto', maxHeight: '80vh' }}>
        {spells.map((spell, index) => {
            if(auth.role === 'admin'){
                return <Card key={index} spell={spell} action={() => !user.spells.includes(spell) ? setSpells(spell) : null}/>
            }else if(unlockedSpells.includes(index) && auth.role === 'player'){
                return <Card key={index} spell={spell} action={() => !user.spells.includes(spell) ? setSpells(spell) : null}/>
            }
            return null
        })}
    </div>
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {setSpells})(Spells);