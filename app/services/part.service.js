
'use strict';

import $ from 'jquery';

class PartService {

    constructor(baseUrl) {
        this.url = baseUrl;
    }

    getParts() {
        return this.getJsonAsPromise(this.url)
            .then((tests) => tests.map(
                (test) => {
                    if (!test.questions)
                        test.questions = [];
                    return test;
                })
            );
    }

    getPartById(testId) {
        return this.getJsonAsPromise(`${this.url}/${testId}`)
            .then((test) => {
                if (!test.questions)
                    test.questions = [];
                return test;
            });
    }

     getPartByCatalogNumber(partCatalogNumber) {
       return this.getJsonAsPromise(`${this.url}/${partCatalogNumber}`)
            .then((test) => {
                if (!test.questions)
                    test.questions = [];
                return test;
            });
    }

    addNewPart(test) {
        let url = this.url;
        return new Promise(
            function (resolve, reject) {
                $.ajax({
                    url: url,
                    dataType: 'json',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(test),
                }).done(resolve).fail(reject);
            }
        );
    }

    editPart(test) {
        let url = this.url;
        return new Promise(
            function (resolve, reject) {
                $.ajax({
                    url: `${url}/${test.id}`,
                    dataType: 'json',
                    type: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify(test),
                }).done(resolve).fail(reject);
            }
        );
    }

    deletePart(testId) {
        let url = this.url;
        return new Promise(
            function (resolve, reject) {
                $.ajax({
                    url: `${url}/${testId}`,
                    dataType: 'json',
                    type: 'DELETE'
                }).done(resolve).fail(reject);
            }
        );
    }

    getJsonAsPromise(url, data) {
        return new Promise(function (resolve, reject) {
            $.getJSON(url, data).done(resolve).fail(reject);
        });
    }
}

export default PartService;