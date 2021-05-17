const Modal = ({children}) => {
    return <div style={{zIndex: 2000, opacity: 1, width: 400, height: 300, background: '#FFF', position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)'}}>
        {children}
    </div>
}

export default Modal