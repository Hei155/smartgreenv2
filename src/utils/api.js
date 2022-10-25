class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options._headers;
    }

    uploadFile(data) {
        return fetch(`${this._baseUrl}/data/upload`, {
            method: 'POST',
            body: data
        })
            .then(this._handleResponse);
    }

    getData() {
        return fetch(`${this._baseUrl}/data/get`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._handleResponse);
    }

    _handleResponse(res) {
        if (!res.ok) {
          return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      }

}

const api = new Api({
    baseUrl: 'http://localhost:3001/',
    headers: {
        'Content-Type': "application/json"
    }
});

export default api;