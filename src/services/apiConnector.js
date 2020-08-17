import Constants from "../constants";

export default class ApiConnector {
    static getSubscribers = async (user_id) => {
        return await fetch(Constants.SERVER_API_ADDRESS + "user/" + user_id, {
            mode: "cors",
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }

    static getUserSubscribers = async (user_id) => {
        return await fetch(Constants.SERVER_API_ADDRESS + "subscribers/" + user_id, {
            mode: "cors",
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }

    static addSubscriber = async (user_id, friend_id) => {
        return await fetch(Constants.SERVER_API_ADDRESS + "user/add", {
            mode: "cors",
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                id: user_id,
                subscriber: friend_id,
            })
        });
    }

    static removeSubscriber = async (user_id, friend_id) => {
        return await fetch(Constants.SERVER_API_ADDRESS + "user/remove", {
            mode: "cors",
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                id: user_id,
                subscriber: friend_id,
            })
        });
    }

    static getUserLocation = async (user_id) => {
        return await fetch(Constants.SERVER_API_ADDRESS + "location/" + user_id, {
            mode: "cors",
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }

    static addUserLocation = async (id, lat, long) => {
        return await fetch(Constants.SERVER_API_ADDRESS + "location/add", {
            mode: "cors",
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                date: new Date().toLocaleDateString("en-US"),
                lat: lat,
                long: long,
            }),
        })
    }
}
