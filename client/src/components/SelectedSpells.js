import {useSelector} from 'react-redux';
import Card from './Card';

const SelectedSpells = () => {
    const spells = useSelector(state => state.user.spells)

    return <div style={{width: '100%', display: 'flex', flexGrow: 1, background: '#333', justifyContent: 'center'}}>
        {spells.map((spell, index) => {
            return <Card key={index} spell={spell} />
        })}
    </div>
}

export default SelectedSpells