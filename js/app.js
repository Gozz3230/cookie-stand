'use strict';

let HTMLlocation = document.getElementById('sales-table');
// GLOBALS
let hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

let cityArray = [];

let storeTotals = [];

let myForm = document.getElementById('my-form');

// HELPER FUNCTIONS/UTILITES

function randomCustomers(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function header() {
  let trElem = document.createElement('tr');
  HTMLlocation.appendChild(trElem);

  let thElem = document.createElement('th');
  trElem.appendChild(thElem);

  for (let i = 0; i < hours.length; i++) {
    let tdElem = document.createElement('td');
    tdElem.textContent = hours[i];
    trElem.appendChild(tdElem);
  }
  let tdElem = document.createElement('td');
  tdElem.textContent = 'Total';
  trElem.appendChild(tdElem);
};

function footer() {
  let foot = document.createElement('tfoot');
  let row = document.createElement('tr');
  foot.appendChild(row);
  let totals = [];
  let totalofTotals = 0;
  let label = document.createElement('td');
  label.textContent = 'Totals';
  row.appendChild(label);

  for (let i = 0; i < hours.length; i++) {
    let total = 0;
    for (let j = 0; j < cityArray.length; j++) {
      total += cityArray[j].cookieSoldPerHour[i];
      totalofTotals += cityArray[j].cookieSoldPerHour[i];
    }
    totals.push(total);
  }
  for (let k = 0; k < hours.length; k++){
    let ted = document.createElement('td');
    ted.textContent = totals[k];
    row.appendChild(ted);
  }
  let totalTd = document.createElement('td');
  totalTd.textContent = totalofTotals;
  row.appendChild(totalTd);
  HTMLlocation.appendChild(foot);
}



// CONSTRUCTOR FUNCTION

function Store(name, minCust, maxCust, avgCookieBought) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookieBought = avgCookieBought;
  this.cookieSoldPerHour = [];
  this.cookiesCustomerPerHour = [];
  this.dailySoldTotal = 0;
  cityArray.push(this)
}

// PROTOTYPE METHODS

Store.prototype.setCookiesTotal = function () {
  for (let i = 0; i < hours.length; i++) {
    this.dailySoldTotal += this.cookieSoldPerHour[i];
  };
}
Store.prototype.setCustomersPerHour = function () {
  for (let i = 0; i < hours.length; i++) {
    this.cookiesCustomerPerHour.push(randomCustomers(this.minCust, this.maxCust));
  };
}
Store.prototype.setCookiesPerHour = function () {
  for (let i = 0; i < hours.length; i++) {
    this.cookieSoldPerHour.push(Math.floor(this.cookiesCustomerPerHour[i] * this.avgCookieBought));
  };
}
Store.prototype.render = function () {
  this.setCustomersPerHour();
  this.setCookiesPerHour();
  this.setCookiesTotal();

  let trElem = document.createElement('tr');
  HTMLlocation.appendChild(trElem);

  let thElem = document.createElement('th');
  thElem.textContent = this.name;
  trElem.appendChild(thElem);
  
  for (let i = 0; i < hours.length; i++) {
    let tdElem = document.createElement('td');
    tdElem.textContent = this.cookieSoldPerHour[i];
    trElem.appendChild(tdElem);
  }
  
  let tdElem = document.createElement('td');
  tdElem.textContent = this.dailySoldTotal;
  trElem.appendChild(tdElem);
};

// FORM HANDLER

function handleFormSubmit(event) {
  event.preventDefault();
  console.log(event);

  let location = event.target.location.value;
  console.log(location);
  let minCustomer = +event.target.minCustomer.value;

  let maxCustomer = +event.target.maxCustomer.value;

  let averageCookieBought = +event.target.averageCookieBought.value;

  let newStore = new Store(location, minCustomer, maxCustomer, averageCookieBought);


  newStore.render();

}

// EXECUTABLE CODE
header()
let seattle = new Store('Seattle', 23, 65, 6.3);
console.log(seattle)
let tokyo = new Store('Tokyo', 3, 24, 1.2);
let dubai = new Store('Dubai', 11, 38, 3.7);
let paris = new Store('Paris', 20, 38, 2.3);
let lima = new Store('Lima', 2, 16, 4.6);
seattle.render()
tokyo.render()
dubai.render()
paris.render()
lima.render()
footer()

// EVENT LISTENER

myForm.addEventListener('submit', handleFormSubmit);


// // GLOBALS
// let HTMLlocation = document.getElementById('salmon-cookies');

// // console.dir(HTMLlocation);

// let hours = ['6am', '7am', '8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm', '7pm'];

// function randomCustomers(min, max) {
//     return Math.floor(Math.random() * (max - min+1) + min);
// }

// let seattle = {
//     name: 'Seattle',
//     minCust: 23,
//     maxCust: 65,
//     avgCookiesBought: 6.3,
//     cookiesSoldPerHour: [],
//     dailySoldTotal: 0,
//     setCookiesTotal: function() {
//         for (let i = 0; i < hours.length; i++) 
//             this.dailySoldTotal = this.dailySoldTotal + this.cookiesSoldPerHour[i];
//     }
// },
// setCustomersPerHour() {
//     for (let i = 0; i < hours.length; i++) {
//       this.cookiesCustomerPerHour.push(randomCustomers(this.minCust, this.maxCust));
//     }
//   },
// setCookiesPerHour() {
//     for (let i = 0; i < hours.length; i++) {
//         this.cookiesSoldPerHour.push(Math.floor(this.cookiesCustomerPerHour[i] * this.avgCookiesBought));
//     }
// },
// render() {
//     this.setCustomersPerHour();
//     this.setCookiesPerHour();
//     this.setCookiesTotal();
//     let articleElem = document.createElement('article');
//     HTMLlocation.appendChild(articleElem);
    
//     let h2Elem = document.createElement('h2');
//     h2Elem.textContent = this.name;
//     articleElem.appendChild(h2Elem);

//     let ulElem = document.createElement('ul');
//     articleElem.appendChild(ulElem);

//     for (let i = 0; i < hours.length; i++) {
//         let liElem = document.createElement('li');
//         liElem.textContent = `${hours[i]}: ${this.cookieSoldPerHour[i]} cookies`;
//         ulElem.appendChild(liElem);
//     }

//     let liElem = document.createElement('li');
// }
// let tokyo = {
//     name: 'Tokyo',
//     minCust: 3,
//     maxCust: 24,
//     avgCookiesBought: 1.2,
//     cookiesSoldPerHour: [],
//     dailySoldTotal: 0,
//     setCookiesTotal: function() {
//         for (let i = 0; i < hours.length; i++) 
//             this.dailySoldTotal = this.dailySoldTotal + this.cookiesSoldPerHour[i];
//     }
// },
// setCustomersPerHour() {
//     for (let i = 0; i < hours.length; i++) {
//         this.cookiesCustomerPerHour.push(randomCustomers(this.minCust, this.maxCust));
//     }
// },
// setCookiesPerHour() {
//     for (let i = 0; i < hours.length; i++) {
//         this.cookiesSoldPerHour.push(Math.floor(this.cookiesCustomerPerHour[i] * this.avgCookiesBought));
//     }
// },
// render() {
//     this.setCustomersPerHour();
//     this.setCookiesPerHour();
//     this.setCookiesTotal();
//     let articleElem = document.createElement('article');
//     HTMLlocation.appendChild(articleElem);
    
//     let h2Elem = document.createElement('h2');
//     h2Elem.textContent = this.name;
//     articleElem.appendChild(h2Elem);

//     let ulElem = document.createElement('ul');
//     articleElem.appendChild(ulElem);

//     for (let i = 0; i < hours.length; i++) {
//         let liElem = document.createElement('li');
//         liElem.textContent = `${hours[i]}: ${this.cookieSoldPerHour[i]} cookies`;
//         ulElem.appendChild(liElem);
//     }

//     let liElem = document.createElement('li');
// }
// let dubai = {
//     name: 'Dubai',
//     minCust: 11,
//     maxCust: 38,
//     avgCookiesBought: 3.7,
//     cookiesSoldPerHour: [],
//     dailySoldTotal: 0,
//     setCookiesTotal: function() {
//         for (let i = 0; i < hours.length; i++) 
//             this.dailySoldTotal = this.dailySoldTotal + this.cookiesSoldPerHour[i];
//     }
// },
// setCustomersPerHour() {
//     for (let i = 0; i < hours.length; i++) {
//         this.cookiesCustomerPerHour.push(randomCustomers(this.minCust, this.maxCust));
//     }
// },
// setCookiesPerHour() {
//     for (let i = 0; i < hours.length; i++) {
//         this.cookiesSoldPerHour.push(Math.floor(this.cookiesCustomerPerHour[i] * this.avgCookiesBought));
//     }
// },
// render() {
//     this.setCustomersPerHour();
//     this.setCookiesPerHour();
//     this.setCookiesTotal();
//     let articleElem = document.createElement('article');
//     HTMLlocation.appendChild(articleElem);
    
//     let h2Elem = document.createElement('h2');
//     h2Elem.textContent = this.name;
//     articleElem.appendChild(h2Elem);

//     let ulElem = document.createElement('ul');
//     articleElem.appendChild(ulElem);

//     for (let i = 0; i < hours.length; i++) {
//         let liElem = document.createElement('li');
//         liElem.textContent = `${hours[i]}: ${this.cookieSoldPerHour[i]} cookies`;
//         ulElem.appendChild(liElem);
//     }

//     let liElem = document.createElement('li');
// }
// let paris = {
//     name: 'Paris',
//     minCust: 20,
//     maxCust: 38,
//     avgCookiesBought: 2.3,
//     cookiesSoldPerHour: [],
//     dailySoldTotal: 0,
//     setCookiesTotal: function() {
//         for (let i = 0; i < hours.length; i++) 
//             this.dailySoldTotal = this.dailySoldTotal + this.cookiesSoldPerHour[i];
//     }
// },
// setCustomersPerHour() {
//     for (let i = 0; i < hours.length; i++) {
//         this.cookiesCustomerPerHour.push(randomCustomers(this.minCust, this.maxCust));
//     }
// },
// setCookiesPerHour() {
//     for (let i = 0; i < hours.length; i++) {
//         this.cookiesSoldPerHour.push(Math.floor(this.cookiesCustomerPerHour[i] * this.avgCookiesBought));
//     }
// },
// render() {
//     this.setCustomersPerHour();
//     this.setCookiesPerHour();
//     this.setCookiesTotal();
//     let articleElem = document.createElement('article');
//     HTMLlocation.appendChild(articleElem);
    
//     let h2Elem = document.createElement('h2');
//     h2Elem.textContent = this.name;
//     articleElem.appendChild(h2Elem);

//     let ulElem = document.createElement('ul');
//     articleElem.appendChild(ulElem);

//     for (let i = 0; i < hours.length; i++) {
//         let liElem = document.createElement('li');
//         liElem.textContent = `${hours[i]}: ${this.cookieSoldPerHour[i]} cookies`;
//         ulElem.appendChild(liElem);
//     }

//     let liElem = document.createElement('li');
// }
// let lima = {
//     name: 'Lima',
//     minCust: 2,
//     maxCust: 16,
//     avgCookiesBought: 4.6,
//     cookiesSoldPerHour: [],
//     dailySoldTotal: 0,
//     setCookiesTotal: function() {
//         for (let i = 0; i < hours.length; i++) 
//             this.dailySoldTotal = this.dailySoldTotal + this.cookiesSoldPerHour[i];
//     }
// },
// setCustomersPerHour() {
//     for (let i = 0; i < hours.length; i++) {
//         this.cookiesCustomerPerHour.push(randomCustomers(this.minCust, this.maxCust));
//     }
// },
// setCookiesPerHour() {
//     for (let i = 0; i < hours.length; i++) {
//         this.cookiesSoldPerHour.push(Math.floor(this.cookiesCustomerPerHour[i] * this.avgCookiesBought));
//     }
// },
// render() {
//     this.setCustomersPerHour();
//     this.setCookiesPerHour();
//     this.setCookiesTotal();
//     let articleElem = document.createElement('article');
//     HTMLlocation.appendChild(articleElem);
    
//     let h2Elem = document.createElement('h2');
//     h2Elem.textContent = this.name;
//     articleElem.appendChild(h2Elem);

//     let ulElem = document.createElement('ul');
//     articleElem.appendChild(ulElem);

//     for (let i = 0; i < hours.length; i++) {
//         let liElem = document.createElement('li');
//         liElem.textContent = `${hours[i]}: ${this.cookieSoldPerHour[i]} cookies`;
//         ulElem.appendChild(liElem);
//     }

//     let liElem = document.createElement('li');
// }

// seattle.render()
// tokyo.render()
// dubai.render()
// paris.render()
// lima.render()