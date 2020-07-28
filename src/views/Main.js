import React from 'react';
import { View, Panel, PanelHeader, TabbarItem, Epic, Tabbar } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Icon28PlayRectangleStackOutline from '@vkontakte/icons/dist/28/play_rectangle_stack_outline';
import Icon28LocationOutline from '@vkontakte/icons/dist/28/location_outline';

class Main extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            activeStory: 'Subs'
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
                        <PanelHeader>Подписки</PanelHeader>
                    </Panel>
                </View>
                <View id="Geo" activePanel="Geo">
                    <Panel id="Geo">
                        <PanelHeader>Геолокация</PanelHeader>
                    </Panel>
                </View>
            </Epic>
        )
    }
}
export default Main