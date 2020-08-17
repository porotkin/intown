import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import Main from "./views/Main"

bridge.subscribe((e) => {
  switch (e.detail.type) {
    case 'VKWebAppUpdateConfig':
      let schemeAttribute = document.createAttribute('scheme');
      schemeAttribute.value = e.detail.data.scheme ? e.detail.data.scheme : 'client_light';
      document.body.attributes.setNamedItem(schemeAttribute);
      break;

    default:
      //console.log(e.detail);
  }
});

// Init VK  Mini App
bridge.send("VKWebAppInit").then();

ReactDOM.render(<Main />, document.getElementById("root"));
if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {}); //runtime download
}
