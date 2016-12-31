export default class HttpService {

    static getHost () {
        return "https://songs-bank-be.herokuapp.com/";
    }

    static _handleErrors(res) {
        if(!res.ok) throw new Error(res.statusText);
        return res;
    }


    static get (url) {

        return fetch(HttpService.getHost() + url)
            .then(res => this._handleErrors(res))
            .then(res => res.json());
        
    }
    
    static post(url, data) {

        return fetch(HttpService.getHost() + url, {
            headers: { 'Content-type' : 'application/json'},
            method: 'post',
            body: JSON.stringify(data)
        })
        .then(res => this._handleErrors(res))
        .then(res => res.json());

    }

    static del(url) {

        return fetch(HttpService.getHost() + url, {
            method: 'delete'
        })
        .then(res => this._handleErrors(res))
        .then(res => res.json());

    }

    static put(url, data) {

        return fetch(HttpService.getHost() + url, {
            headers: { 'Content-type' : 'application/json'},
            method: 'put',
            body: JSON.stringify(data)
        })
        .then(res => this._handleErrors(res))
        .then(res => res.json());

    }
}