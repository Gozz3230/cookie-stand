'use strict';

let HTMLlocation = document.getElementById('salmon-cookies');

let hours = ['6am', '7am', '8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm', '7pm'];

function randomCustomers(min, max) {
    return Math.floor(Math.random() * (max - min+1) + min);
}

let seattle = {
    name: 'Seattle',
    minCust: 23,
    maxCust: 65,
    avgCookiesBought: 6.3,
    cookiesSoldPerHour: [],
    dailySoldTotal: 0,
    setCookiesTotal() {
        for (let i = 0; i < hours.length; i++) 
            this.dailySoldTotal = this.dailySoldTotal + this.cookiesSoldPerHour[i];
    }
},
setCustomersPerHour() {
    for (let i = 0; i < hours.length; i++) {
        this.cookiesCustomerPerHour.push(randomCustomers(this.minCust, this.maxCust));
    }
},
setCookiesPerHour() {
    for (let i = 0; i < hours.length; i++) {
        this.cookiesSoldPerHour.push(Math.floor(this.cookiesCustomerPerHour[i] * this.avgCookiesBought));
    }
},
render() {
    this.setCustomersPerHour();
    this.setCookiesPerHour();
    this.;
    ;
    ;
    ;
    ;
    ;
}