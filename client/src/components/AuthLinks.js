import { useState } from 'react'
import Logout from './Logout';
import Spells from "./Spells";
import CreateGame from "./CreateGame";
import SelectedSpells from "./SelectedSpells";
import { useSelector } from 'react-redux'
import Button from './styled/Button'

const AuthLinks = () => {
    const phase = useSelector(state => state.user.phase)


    const setContent = () => {
      switch(phase){
        case 'select-spells':
          return <>
            <Spells />
            <SelectedSpells />
          </>
		case 'gameroom':
			return <div style={{background: 'lightblue', display: 'flex', height: '100%'}}>
				<div style={{flexGrow: 4, background: '#F8F8F8'}}>
					<div style={{width: '80%', background: '#C5C5C5', margin: '20px auto', height: 80, color: '#FFF'}}>
						<p>Game Title</p>
						<p>Host</p>
					</div>
				</div>
				<div style={{flexGrow: 1, background: '#FFF'}}>
					<div style={{display: 'flex', flexDirection: 'column', width: '50%', margin: '20px auto'}}>
						<Button style={{margin: '20px auto'}}>Create Room</Button>
						<Button style={{margin: '20px auto'}}>Join Room</Button>
					</div>
				</div>
			</div>
        default:
			return 'AuthLinks Switch Broken (Error 42069)'
      }
    }

    return setContent()
  }

export default AuthLinks