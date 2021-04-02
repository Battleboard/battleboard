const container_styles = {
    height: 20,
    width: '100%',
    background: '#888',
    marginTop: 10
}

const progress_styles = {
    height: '100%'
    
}

const ProgressBar = ({ children, width, color }) => {
    return <div style={container_styles}>
        <div style={{...progress_styles, width: `${width}%`, background: color}}>{children}</div>
    </div>
}

export default ProgressBar