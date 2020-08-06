import React from 'react';

const divStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '15px',
    height: '15px',
    backgroundColor: '#0cb',
    border: '2px solid #fff',
    borderRadius: '40%',
    userSelect: 'none',
    transform: 'translate(-50%, -50%)'
}
const pStyle = {
    width: '500px',
    transform: 'translate(-10%, 0)',
    fontSize: '15pt'
}

class Marker extends React.Component {
    render() {
        return <div style={divStyle}><p style={pStyle} >{this.props.name}</p></div>
    }
}
export default Marker;