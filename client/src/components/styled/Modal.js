const Modal = ({ children, style }) => {
    return <div style={{zIndex: 2000, opacity: 1, width: 350, height: 350, background: '#FFF', position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)', ...style}}>
        {children}
    </div>
}

export default Modal