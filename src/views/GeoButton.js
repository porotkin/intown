import React from 'react';
import {Div, Button} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

class GeoButton extends React.Component {
    render () {
        return (
                <Div style={{textAlign: 'center', marginTop: '3%'}}>
                    <Button mode="commerce" size='xl' onClick={this.props.onClick}>Поделиться геопозицией</Button>
                </Div>
        )
    }
}
export default GeoButton
