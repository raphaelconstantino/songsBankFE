export default class HttpService {

    static _handleErrors(res) {
        if(!res.ok) throw new Error(res.statusText);
        return res;
    }


    static get (url) {

        return fetch("/" + url)
            .then(res => this._handleErrors(res))
            .then(res => res.json());
        
    }
    
    static post(url, data) {

        return fetch("/" + url, {
            headers: { 'Content-type' : 'application/json'},
            method: 'post',
            body: JSON.stringify(data)
        })
        .then(res => this._handleErrors(res))
        .then(res => res.json());

    }

    static del(url) {

        return fetch("/" + url, {
            method: 'delete'
        })
        .then(res => this._handleErrors(res))
        .then(res => res.json());

    }

    static put(url, data) {

        return fetch("/" + url, {
            headers: { 'Content-type' : 'application/json'},
            method: 'put',
            body: JSON.stringify(data)
        })
        .then(res => this._handleErrors(res))
        .then(res => res.json());

    }
}