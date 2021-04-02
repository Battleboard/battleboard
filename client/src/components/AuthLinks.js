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
			return <CreateGame />
        default:
			return 'AuthLinks Switch Broken (Error 42069)'
      }
    }

    return setContent()
  }

export default AuthLinks