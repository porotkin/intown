import React from 'react';
import {Div, Button} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import bridge from "@vkontakte/vk-bridge";

class GeoButton extends React.Component {
    constructor (props) {
        super(props);
    }
    render () {
        return (
                <Div style={{textAlign: 'center', marginTop: '3%'}}>
                    <Button mode="commerce" size='xl'>Поделиться геопозицией</Button>
                </Div>
        )
    }
}
export default GeoButton