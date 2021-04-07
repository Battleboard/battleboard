const container_styles = {
	border: '1px solid #7D7D7D',
	borderRadius: 4,
	width: 200,
	height: 230,
	margin: '10px 0 0 10px',
	cursor: 'pointer',
	userSelect: 'none',
	background: '#FFF',
	color: '#333'
}

const Card = ({ spell, action, style }) => {
	return <div style={{...container_styles, ...style}} onClick={action}>
		<div style={{margin: 10, display: 'flex'}}>
			<h4 style={{margin: 0, padding: '20 0 0 20', flexGrow: 2}}>{spell.name}</h4>
			<img alt="" src={spell.source} style={{height: 30, width: 30}}/>
		</div>

		<div style={{display: 'flex'}}>
			<div style={{flexGrow: 2}}>
			{Object.keys(spell).filter(e => e !== 'name' && e !== "source" && e !== 'debuffs' && e !== 'spellList').map((key, index) => {
				if(spell[key] !== 0){
					return <div key={index} style={{display: 'flex'}}>
						<p style={{margin: 0, padding: 5, fontSize: 12, flexGrow: 2}}>{key}</p>
						<p style={{margin: 0, padding: 5, fontSize: 12, flexGrow: 1, textAlign: 'right'}}>{spell[key]}</p>
					</div>
				} else {
					return null
				}
			})}
			</div>
			<div>
				

			</div>
		</div>
	</div>
};

export default Card;