import React from 'react';
import {Epic, Panel, PanelHeader, Tabbar, TabbarItem, View} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Icon28PlayRectangleStackOutline from '@vkontakte/icons/dist/28/play_rectangle_stack_outline';
import Icon28LocationOutline from '@vkontakte/icons/dist/28/location_outline';
import bridge from "@vkontakte/vk-bridge";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Friends from "./Friends";
import Gmap from "./Gmap";

class Main extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            activeStory: 'Subs',
            friends: null,
        };
        this.onStoryChange = this.onStoryChange.bind(this);

    }

    onStoryChange (e) {
        this.setState({ activeStory: e.currentTarget.dataset.story })
    }

    render () {

        return (
            <Epic activeStory={this.state.activeStory} tabbar={
                <Tabbar>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'Subs'}
                        data-story="Subs"
                        text="Подписки"
                    ><Icon28PlayRectangleStackOutline fill='#FF7F50' /></TabbarItem>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'Geo'}
                        data-story="Geo"
                        text="Геолокация"
                    ><Icon28LocationOutline fill='#228B22'/></TabbarItem>

                </Tabbar>
            }>
                <View id="Subs" activePanel="Subs">
                    <Panel id="Subs">
                        <PanelHeader separator={false}>Подписки</PanelHeader>
                            <Friends/>
                    </Panel>
                </View>
                <View id="Geo" activePanel="Geo" >
                    <Panel id="Geo">
                        <PanelHeader separator={false}>Геолокация</PanelHeader>
                        <Gmap />
                    </Panel>
                </View>
            </Epic>
        )
    }
}
export default Main