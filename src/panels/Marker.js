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
const nameStyle = {
    width: '500px',
    transform: 'translate(-7%, 0)',
    fontSize: '12pt'
}
const dateStyle = {
    width: '500px',
    transform: 'translate(-7%, -15px)',
    fontSize: '9pt'
}

class Marker extends React.Component {
    render() {
        return  <div style={divStyle}>
                    <p style={nameStyle}>{this.props.name}</p>
                    <p style={dateStyle}>{this.props.date}</p>
                </div>
    }
}
export default Marker;