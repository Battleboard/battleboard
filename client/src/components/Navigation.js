import Button from './styled/Button'

const Navigation = () => {
    return <div style={{width: '100%', height: 80, background: '#000', margin: 0, display: 'flex', justifyContent: 'space-between'}}>
        {/* Title */}
        <h1 style={{margin: 0, padding: '10px 0 0 10px', fontSize: 48, fontFamily: 'sans-serif', color: '#F3F3F3', userSelect: 'none'}}>Battleboard</h1>
        <Button style={{marginRight: 20, border: '1px solid #FFF', color: '#FFF', padding: 0, marginTop: 10, height: 60}} onClick={() => console.log('works')}>Battle</Button>
    </div>
}

export default Navigation