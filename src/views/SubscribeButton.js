import React from 'react';
import {Div, Button} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Constants from "../constants";

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
            fetch(Constants.SERVER_API_ADDRESS + "user/add", {
                mode: "cors",
                method: "POST",
                headers: {
                  "Content-type": "application/json"
                },
                body: JSON.stringify({
                    id: this.props.user_id,
                    subscriber: this.props.friend_id,
                })
            }).then();
        } else {
            this.setState({on: 'primary', text: 'Подписаться', subscribed: false})
            fetch(Constants.SERVER_API_ADDRESS + "user/remove", {
                mode: "cors",
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    id: this.props.user_id,
                    subscriber: this.props.friend_id,
                })
            }).then();
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