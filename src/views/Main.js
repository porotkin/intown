import React from 'react';
import {Epic, Panel, PanelHeader, Tabbar, TabbarItem, View} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Icon28PlayRectangleStackOutline from '@vkontakte/icons/dist/28/play_rectangle_stack_outline';
import Icon28LocationOutline from '@vkontakte/icons/dist/28/location_outline';
import Friends from "./Friends";
import MapComponent from "./MapComponent";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Gallery from "@vkontakte/vkui/dist/components/Gallery/Gallery";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Header from "@vkontakte/vkui/dist/components/Header/Header";
import bridge from "@vkontakte/vk-bridge";
import Constants from "../constants";

class Main extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            activeStory: 'Subs',
            slideIndex: 0,
            onboarding: true,
        };

        this.onStoryChange = this.onStoryChange.bind(this);
    }

    onStoryChange (e) {
        this.setState({ activeStory: e.currentTarget.dataset.story })
    }

    onProceedToAppClick = () => {
        this.setState({onboarding: false});
    }

    onGetAccessTokenClick = () => {
        bridge.send("VKWebAppGetAuthToken", {"app_id": Constants.VK_APP_ID, "scope": "friends"});
    }

    onGetGeoLocationClick = () => {
        bridge.send("VKWebAppGetAuthToken");
    }

    render () {
        return (this.state.onboarding)
            ? (<View activePanel="gallery">
                    <Panel id="gallery">
                        <PanelHeader>Gallery</PanelHeader>
                        <Group header={<Header mode="secondary">Sticks right</Header>}>
                            <Gallery
                                align={"center"}
                                slideWidth={'100%'}
                                height={'100vh'}
                            >
                                <div style={{
                                              height: '100vh',
                                              width: '100vw',
                                              align: 'center',
                                              backgroundColor: 'var(--destructive)',
                                           }}>
                                    <Button mode={"primary"} onClick={this.onGetAccessTokenClick}>Дать доступ к друзьям</Button>
                                </div>
                                <div style={{ backgroundColor: 'var(--button_commerce_background)' }}>
                                    <Button mode={"primary"} onClick={this.onGetGeoLocationClick}>Дать доступ к геолокации</Button>
                                </div>
                                <div style={{ backgroundColor: 'var(--accent)' }}>
                                    <Button mode={"primary"} onClick={this.onProceedToAppClick}>Перейти к приложению</Button>
                                </div>
                            </Gallery>
                        </Group>
                    </Panel>
                </View>
              )
            :
            (<Epic activeStory={this.state.activeStory} tabbar={
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
                            <MapComponent />
                    </Panel>
                </View>
            </Epic>
        )
    }
}
export default Main
