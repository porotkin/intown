import React from 'react';
import {Div, Button} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

class SubscribeButton extends React.Component {
    constructor (props) {
        super(props);
        this.state = this.props.subscribed
            ? {on: 'secondary', text: "Отписаться", subscribed: true}
            : {on: 'primary', text: "Подписаться", subscribed: false};
    }

    subscribeToggle = () => {
        if (!this.state.subscribed) {
            this.setState({on: 'secondary', text: 'Отписаться', subscribed: true})
        } else {
            this.setState({on: 'primary', text: 'Подписаться', subscribed: false})
        }
    }

    render () {
        return (
                <Div >
                    <Button mode={this.state.on} onClick={this.subscribeToggle}>{this.state.text}</Button>
                </Div>
        )
    }
}
export default SubscribeButton