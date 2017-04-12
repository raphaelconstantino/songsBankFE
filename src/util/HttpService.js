export default class HttpService {

    static _handleErrors(res) {
        if(!res.ok) throw new Error(res.statusText);
        return res;
    }


    static get (url) {

        return fetch("/" + url, {
            headers : {
                'x-access-token' : localStorage.getItem('auth-token')
            },
            method: 'get'
        })
        .then(res => this._handleErrors(res))
        .then(res => res.json());
    
    }
    
    static post(url, data) {

        return fetch("/" + url, {
            headers: { 
                'Content-type' : 'application/json',
                'x-access-token' : localStorage.getItem('auth-token')             
            },
            method: 'post',
            body: JSON.stringify(data)
        })
        .then(res => this._handleErrors(res))
        .then(res => res.json());

    }

    static del(url) {

        return fetch("/" + url, {
            headers: { 
                'Content-type' : 'application/json',
                'x-access-token' : localStorage.getItem('auth-token')             
            },            
            method: 'delete'
        })
        .then(res => this._handleErrors(res))
        .then(res => res.json());

    }

    static put(url, data) {

        return fetch("/" + url, {
            headers: { 
                'Content-type' : 'application/json',
                'x-access-token' : localStorage.getItem('auth-token')             
            },
            method: 'put',
            body: JSON.stringify(data)
        })
        .then(res => this._handleErrors(res))
        .then(res => res.json());

    }
}