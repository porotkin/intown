import React from 'react';
import {Div, Header, Group, Button, SimpleCell, Avatar} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

class SubscribeButton extends React.Component {
    constructor (props) {
        super(props);
        this.state = {on :'primary'};
    }
    type(e){

        this.setState({: 'secondary'})

    }
    render () {
        return (
            <Group>
                <Div>
                    <Button mode={this.props.mode} onClick={this.type} >Подписаться</Button>
                </Div>
            </Group>
        )
    }
}
export default SubscribeButton