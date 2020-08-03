import React from 'react';
import {Div, Group, Button} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

class SubscribeButton extends React.Component {
    constructor (props) {
        super(props);
        this.state = {mode: 'primary', sub: "Подписаться"};
    }
    changeButtonMode = () => {
        if (this.state.mode === "primary") {
            this.setState({mode: 'secondary'})
            this.setState({sub: 'Отписаться'})
        } else {
            this.setState({mode: 'primary'})
            this.setState({sub: 'Подписаться'})
        }
    }
    render () {
        return (
            <Group>
                <Div>
                    <Button mode={this.state.mode} onClick={this.changeButtonMode}>{this.state.sub}</Button>
                </Div>
            </Group>
        )
    }
}
export default SubscribeButton