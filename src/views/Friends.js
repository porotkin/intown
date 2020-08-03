import React from 'react';
import {Group, Header, SimpleCell, Avatar} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import SubscribeButton from "./SubscribeButton";
import bridge from '@vkontakte/vk-bridge';
import {VKMiniAppAPI} from "@vkontakte/vk-mini-apps-api";

class Friends extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
          friends: null
        };
        bridge
            .send('VKWebAppGetEmail')
            .then(data => {
                // Handling received data
                console.log(data.email);
            })
            .catch(error => {
                // Handling an error
                console.log(error)
            });
        bridge.subscribe(({ detail: { type, data }}) => {
            if (type === 'VKWebAppGetFriendsResult') {
                this.setState({friends: data.users.id})
            }
        });
        this.getFriends();
        // Creating API instance
        const api = new VKMiniAppAPI();

        // Initializing app
        api.initApp();

        // Using methods
        api.getUserInfo().then(userInfo => {
            console.log(userInfo.id);
        });
    }

    getFriends = async () => {
        await bridge.send("VKWebAppGetFriends", {});
    };

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