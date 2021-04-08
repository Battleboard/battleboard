import Button from './styled/Button'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { setPhase, buyPacks, clearPack } from '../actions/userActions'
import { logout } from '../actions/authActions'
import BuyPackModal from './BuyPackModal';

const button_styles = { border: '1px solid #FFF', color: '#FFF', margin: 8 }

const numberOfSpells = 6

const Navigation = () => {
    const spells = useSelector(state => state.user.spells)
    const phase = useSelector(state => state.user.phase)
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const user = useSelector(state => state.user)
    const packSpells = useSelector(state => state.user.packSpells)

    const [modal, setModal] = useState(false)
    const [modalSpells, setModalSpells] = useState({})

    
    useEffect(() => {
        if(packSpells.length !== 0){
            toggleModal(packSpells)
            dispatch(clearPack())
        }
    // eslint-disable-next-line
    }, [packSpells])
    

    const toggleModal = (spells) => {
        setModalSpells(spells)
        setModal(!modal)
    }

    const toBattle = () => {
        if (spells.length === numberOfSpells) {
            dispatch(setPhase('gameroom'))
        }
    }

    return <div style={{width: '100%', height: 80, background: '#000', margin: 0, display: 'flex'}}>
        {/* Title */}
        <h1 style={{margin: 0, padding: '10px 0 0 10px', fontSize: 48, fontFamily: 'sans-serif', color: '#F3F3F3', userSelect: 'none'}}>Battleboard</h1>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: '100%'}}>
            {auth.isAuthenticated && <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                {phase === 'profile' && <Button style={button_styles} onClick={() => {dispatch(setPhase('gameroom'))}}>Gameroom</Button>}
                {/* <Button style={button_styles} onClick={() => dispatch(logout())}>Logout</Button> */}

                {modal && <BuyPackModal show={modal} packSpells={modalSpells} toggleShow={setModal} />}

            </div>}

            {user && <div style={{textAlign: 'center', fontSize: 24, display: 'flex', margin: 'auto 10px', justifyContent: 'center'}}>
                <div style={{color: '#FFD949', marginRight: 5, marginTop: 1, userSelect: 'none'}}>{user.gold}</div>
                <img src="/images/spells/dubloontoss.svg" alt="" style={{height: 30, width: 30}} />
            </div>}
        </div>
    </div>
}

export default Navigation