import React from 'react';
import { Group, Header, SimpleCell,Avatar } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Icon28MessageOutline from '@vkontakte/icons/dist/28/message_outline';
import SubscribeButton from "./SubscribeButton";

class Friends extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <Group>
                <Header mode="secondary">Список друзей</Header>
                <SimpleCell before={<Avatar size={48} src='https://sun9-33.userapi.com/wf7AIU5YwDRMwxONpXdmLvOhMAqeYUN5WS0KvA/rsHYbQ5u9wM.jpg' />} after={<SubscribeButton />} description="Команда ВКонтакте">Michael Porotkin</SimpleCell>
                <SimpleCell before={<Avatar size={48} src='https://vk.com/images/camera_200.png?ava=1' />} after={<SubscribeButton />} description="Дада">Artem Buslaev</SimpleCell>
            </Group>
        )
    }
}
export default Friends