import $ from 'jquery';

export default class AuthenticationService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    storeUser(userData) {
        localStorage.setItem('user', JSON.stringify(userData));
    }

    getStoredUser() {
        return JSON.parse(localStorage[key]);
    }

    removeStoredUser() {
        localStorage.removeItem('user');
    }

    isLogged() {
        return (localStorage.hasOwnProperty('user'));
    }

    register(userData) {
        let url = this.baseUrl + '/users';

        return new Promise((resolve, reject) => {
            $.ajax({
                method: 'POST',
                url: url,
                dataType: 'json',
                data: userData
            }).done(resolve).fail(reject);
        });
    }

    loginUser(userData) {
        let url = this.baseUrl + '/users/login';

        return new Promise((resolve, reject) => {
            $.ajax({
                method: 'POST',
                url: url,
                dataType: 'json',
                data: userData
            }).done(resolve).fail(reject);
        })
    }
}