import {spells} from "../json/spells";
import Card from "./Card";
import {setSpells} from '../actions/userActions';
import {connect} from 'react-redux';

const Spells = ({auth, setSpells}) => {

    const selectSpell = (spell) => {
        console.log("Spell: ", spell);
        setSpells(spell);
    }

	return  <div style={{display: 'flex', flexWrap: 'wrap', flexGrow: 2, overflow: 'auto', maxHeight: '80vh' }}>
        {spells.map((spell, index) => {
            return <Card key={index} spell={spell} action={() => selectSpell(spell)}/>
        })}
    </div>
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {setSpells})(Spells);