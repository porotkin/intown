(this.webpackJsonpintown=this.webpackJsonpintown||[]).push([[0],{169:function(e,t,n){e.exports=n(266)},266:function(e,t,n){"use strict";n.r(t);n(170),n(196),n(198),n(199),n(201),n(202),n(203),n(204),n(205),n(206),n(207),n(208),n(210),n(211),n(212),n(213),n(214),n(215),n(216),n(217),n(218),n(219),n(221),n(222),n(223),n(224),n(225),n(226),n(227),n(228),n(229),n(230),n(231),n(232),n(233),n(234),n(235),n(236),n(237),n(238);var a=n(0),r=n.n(a),s=n(26),o=n.n(s),i=n(25),c=n.n(i),l=n(18),u=n(22),d=n(47),b=n(24),h=n(23),m=n(11),p=(n(41),n(99)),f=n.n(p),g=n(100),E=n.n(g),S=n(38),y=n.n(S),v=n(48),j=function e(){Object(l.a)(this,e)};j.SERVER_API_ADDRESS="https://bc51e15b5e75.ngrok.io/";var k=function(e){Object(b.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).subscribeToggle=function(){a.state.subscribed?(a.setState({on:"primary",text:"\u041f\u043e\u0434\u043f\u0438\u0441\u0430\u0442\u044c\u0441\u044f",subscribed:!1}),fetch(j.SERVER_API_ADDRESS+"user/remove",{mode:"cors",method:"DELETE",body:{id:a.props.user_id,subscriber:a.props.friend_id}}).then()):(a.setState({on:"secondary",text:"\u041e\u0442\u043f\u0438\u0441\u0430\u0442\u044c\u0441\u044f",subscribed:!0}),fetch(j.SERVER_API_ADDRESS+"user/add",{mode:"cors",method:"POST",body:{id:a.props.user_id,subscriber:a.props.friend_id}}).then())},a.state=a.props.subscribed?{on:"secondary",text:"\u041e\u0442\u043f\u0438\u0441\u0430\u0442\u044c\u0441\u044f",subscribed:!0}:{on:"primary",text:"\u041f\u043e\u0434\u043f\u0438\u0441\u0430\u0442\u044c\u0441\u044f",subscribed:!1},a}return Object(u.a)(n,[{key:"render",value:function(){return r.a.createElement(m.c,null,r.a.createElement(m.b,{mode:this.state.on,onClick:this.subscribeToggle},this.state.text))}}]),n}(r.a.Component),O=n(67),_=n.n(O),C=function(e){Object(b.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).getFriends=Object(v.a)(y.a.mark((function e(){return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.a.send("VKWebAppCallAPIMethod",{method:"friends.get",request_id:"32test",params:{fields:"id, photo_50",order:"name",access_token:a.state.access_token,v:"5.122"}}).then((function(e){a.setState({friends:e.response.items}),console.log(e)})).catch((function(e){console.log(e)}));case 2:case"end":return e.stop()}}),e)}))),a.state={access_token:null,friends:null,user_id:null,subscribers:null},c.a.send("VKWebAppGetUserInfo",{}).then((function(e){a.setState({user_id:e.id})})),c.a.send("VKWebAppGetAuthToken",{app_id:7550756,scope:"friends"}).then((function(e){a.setState({access_token:e.access_token}),a.getFriends(),fetch(j.SERVER_API_ADDRESS+"user/"+a.state.user_id,{mode:"cors",method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){e.json().then((function(e){a.setState({subscribers:e})}))}))})),a}return Object(u.a)(n,[{key:"subscribedToUser",value:function(e){if(this.state.subscribers)for(var t in this.state.subscribers)if(t===e)return!0;return!1}},{key:"render",value:function(){var e=this;return r.a.createElement(m.e,null,r.a.createElement(m.f,{mode:"secondary"},"\u0421\u043f\u0438\u0441\u043e\u043a \u0434\u0440\u0443\u0437\u0435\u0439"),this.state.friends?this.state.friends.map((function(t){return r.a.createElement(_.a,{before:r.a.createElement(m.a,{size:48,src:t.photo_50}),after:r.a.createElement(k,{user_id:e.state.user_id,friend_id:t.id,subscribed:e.subscribedToUser(t.id)}),description:t.id},t.first_name+" "+t.last_name)})):r.a.createElement(_.a,null,"Loading"))}}]),n}(r.a.Component),x=function(e){Object(b.a)(n,e);var t=Object(h.a)(n);function n(e){return Object(l.a)(this,n),t.call(this,e)}return Object(u.a)(n,[{key:"render",value:function(){return r.a.createElement(m.c,{style:{textAlign:"center",marginTop:"3%"}},r.a.createElement(m.b,{mode:"commerce",size:"xl",onClick:this.props.onClick},"\u041f\u043e\u0434\u0435\u043b\u0438\u0442\u044c\u0441\u044f \u0433\u0435\u043e\u043f\u043e\u0437\u0438\u0446\u0438\u0435\u0439"))}}]),n}(r.a.Component),A=n(101),L={position:"absolute",top:"50%",left:"50%",width:"15px",height:"15px",backgroundColor:"#0cb",border:"2px solid #fff",borderRadius:"40%",userSelect:"none",transform:"translate(-50%, -50%)"},R={width:"500px",transform:"translate(-10%, 0)",fontSize:"15pt"},G=function(e){Object(b.a)(n,e);var t=Object(h.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){return r.a.createElement("div",{style:L},r.a.createElement("p",{style:R},this.props.name))}}]),n}(r.a.Component),I=function(e){Object(b.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).getGeo=Object(v.a)(y.a.mark((function e(){return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.a.send("VKWebAppGetGeodata").then((function(e){a.setState({geoLocation:{lat:e.lat,lng:e.long}})}));case 2:case"end":return e.stop()}}),e)}))),a.state={geoLocation:null},a}return Object(u.a)(n,[{key:"render",value:function(){return this.state.geoLocation&&(this.FriendsCoordinates=[{name:"Michael Porotkin",lat:this.state.geoLocation.lat-1,lng:this.state.geoLocation.lng},{name:"Some One",lat:this.state.geoLocation.lat,lng:this.state.geoLocation.lng+1}]),r.a.createElement(m.e,{style:{height:"65vh",width:"95%",marginLeft:"auto",marginRight:"auto"}},r.a.createElement(A.a,{bootstrapURLKeys:{key:"AIzaSyCA-CWX9xnTnxGmzIxkH_WIsGUrdeRI444"},center:this.state.geoLocation?this.state.geoLocation:this.props.center,zoom:this.props.zoom},this.state.geoLocation?r.a.createElement(G,{lat:this.state.geoLocation.lat,lng:this.state.geoLocation.lng,name:"Artem Buslaev"}):"",this.FriendsCoordinates?this.FriendsCoordinates.map((function(e){return r.a.createElement(G,{lat:e.lat,lng:e.lng,name:e.name})})):""),r.a.createElement(x,{onClick:this.getGeo}))}}]),n}(r.a.Component);I.defaultProps={center:{lat:30,lng:30},zoom:11};var T=I,w=function(e){Object(b.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).state={activeStory:"Subs",friends:null},a.onStoryChange=a.onStoryChange.bind(Object(d.a)(a)),a}return Object(u.a)(n,[{key:"onStoryChange",value:function(e){this.setState({activeStory:e.currentTarget.dataset.story})}},{key:"render",value:function(){return r.a.createElement(m.d,{activeStory:this.state.activeStory,tabbar:r.a.createElement(m.i,null,r.a.createElement(m.j,{onClick:this.onStoryChange,selected:"Subs"===this.state.activeStory,"data-story":"Subs",text:"\u041f\u043e\u0434\u043f\u0438\u0441\u043a\u0438"},r.a.createElement(f.a,{fill:"#FF7F50"})),r.a.createElement(m.j,{onClick:this.onStoryChange,selected:"Geo"===this.state.activeStory,"data-story":"Geo",text:"\u0413\u0435\u043e\u043b\u043e\u043a\u0430\u0446\u0438\u044f"},r.a.createElement(E.a,{fill:"#228B22"})))},r.a.createElement(m.k,{id:"Subs",activePanel:"Subs"},r.a.createElement(m.g,{id:"Subs"},r.a.createElement(m.h,{separator:!1},"\u041f\u043e\u0434\u043f\u0438\u0441\u043a\u0438"),r.a.createElement(C,null))),r.a.createElement(m.k,{id:"Geo",activePanel:"Geo"},r.a.createElement(m.g,{id:"Geo"},r.a.createElement(m.h,{separator:!1},"\u0413\u0435\u043e\u043b\u043e\u043a\u0430\u0446\u0438\u044f"),r.a.createElement(T,null))))}}]),n}(r.a.Component);c.a.send("VKWebAppInit").then(),o.a.render(r.a.createElement(w,null),document.getElementById("root"))}},[[169,1,2]]]);
//# sourceMappingURL=main.3143526a.chunk.js.map