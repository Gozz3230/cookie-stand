'use strict';

let HTMLlocation = document.getElementById('salesTable');
// GLOBALS
let hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

let cityArray = [];

let storeTotals = [];

let myForm = document.getElementById('myForm');

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
  tdElem.textContent = 'total';
  trElem.appendChild(tdElem);
};

function footer() {
  let foot = document.createElement('tfoot');
  let row = document.createElement('tr');
  foot.appendChild(row);
  let totals = [];
  let totalofTotals = 0;
  let label = document.createElement('td');
  label.textContent = 'totals';
  row.appendChild(label);

  for (let i = 0; i < hours.length; i++) {
    let total = 0;
    for (let j = 0; j < cityArray.length; j++) {
      total += cityArray[j].cookiesSoldPerHour[i];
      totalofTotals += cityArray[j].cookiesSoldPerHour[i];
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

function store(name, minCust, maxCust, avgCookiesBought) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookiesBought = avgCookiesBought;
  this.cookiesSoldPerHour = [];
  this.cookiesCustomerPerHour = [];
  this.dailySoldTotal = 0;
  cityArray.push(this)
}

// PROTOTYPE METHODS

store.prototype.setCookiesTotal = function () {
  for (let i = 0; i < hours.length; i++) {
    this.dailySoldTotal += this.cookiesSoldPerHour[i];
  };
}
store.prototype.setCustomersPerHour = function () {
  for (let i = 0; i < hours.length; i++) {
    this.cookiesCustomerPerHour.push(randomCustomers(this.minCust, this.maxCust));
  };
}
store.prototype.setCookiesPerHour = function () {
  for (let i = 0; i < hours.length; i++) {
    this.cookiesSoldPerHour.push(Math.floor(this.cookiesCustomerPerHour[i] * this.avgCookiesBought));
  };
}
store.prototype.render = function () {
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
    tdElem.textContent = this.cookiesSoldPerHour[i];
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

  let averageCookiesBought = +event.target.averageCookiesBought.value;

  let newStore = new store(location, minCustomer, maxCustomer, averageCookiesBought);


  newStore.render();

}

// EXECUTABLE CODE
header();
let seattle = new store('Seattle', 23, 65, 6.3);
console.log(seattle);
let tokyo = new store('Tokyo', 3, 24, 1.2);
let dubai = new store('Dubai', 11, 38, 3.7);
let paris = new store('Paris', 20, 38, 2.3);
let lima = new store('Lima', 2, 16, 4.6);

seattle.render();
tokyo.render();
dubai.render();
paris.render();
lima.render();
footer();

// EVENT LISTENER

myForm.addEventListener('submit', handleFormSubmit);
