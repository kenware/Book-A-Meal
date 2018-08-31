/* eslint func-names: 0 */
const email = `kenson${Math.floor(Math.random() * 1000)}@gmail.com`;
const username = `kenson${Math.floor(Math.random() * 1000)}`;

module.exports = {
  'Home page test': function (client) {
    client
      .url('localhost:5000/meals')
      .waitForElementVisible('body', 4000)
      .assert.containsText('#header', 'BOOK A MEAL IN THREE EASY STEPS')
      .assert.elementPresent('.site-container')
      .assert.elementPresent('.login-header')
      .assert.elementPresent('.register-header')
      .assert.containsText('#user-story', 'WHAT OUR FANTASTIC USERS SAY');
  },
  'Register caterer': function (client) {
    client
      .click('.register-header')
      .waitForElementVisible('body', 4000)
      .setValue('input[name="name"]', 'kevin')
      .pause(500)
      .setValue('input[name="username"]', username)
      .pause(500)
      .setValue('input[name="email"]', email)
      .pause(500)
      .setValue('input[name="password"]', 12345)
      .pause(500)
      .setValue('input[name="vpassword"]', 12345)
      .click('.signup-btn')
      .waitForElementVisible('body', 4000)
      .pause(3000);
  },
  'User dashboard test': function (client) {
    client
      .waitForElementVisible('body', 4000)
      .assert.elementPresent('.admin-container')
      .assert.elementPresent('.content-container')
      .assert.elementPresent('.timeline')
      .click('.bar2')
      .pause(2000)
      .click('.bar1')
      .pause(1000)
      .click('#userUpgrade')
      .pause(5000)
      .click('#upgrade');
  },
  'Admins page test ': function (client) {
    client
      .waitForElementVisible('body', 4000)
      .assert.elementPresent('.page-container')
      .assert.elementPresent('.admin-order-wrapper')
      .assert.containsText('#order-page', 'Overview Of Most Ordered Meal')
      .moveToElement('.dropbtn', 18, 30)
      .pause(5000)
      .click('#addmeal')
      .pause(5000);
  },
  'Create meal': function (client) {
    client
      .waitForElementVisible('body', 5000)
      .assert.elementPresent('.form-field')
      .setValue('input[name="name"]', 'Jollof Rice')
      .pause(500)
      .setValue('input[name="price"]', 500)
      .pause(500)
      .setValue('textarea[name="description"]', 'Very delicious')
      .pause(500)
      .click('.submit')
      .pause(500)
      .clearValue('input[name="name"]')
      .setValue('input[name="name"]', 'Abacha recipe')
      .pause(500)
      .clearValue('input[name="price"]')
      .setValue('input[name="price"]', 200)
      .pause(500)
      .clearValue('textarea[name="description"]')
      .setValue('textarea[name="description"]', 'Very delicious')
      .pause(500)
      .click('.submit')
      .pause(500)
      .clearValue('input[name="name"]')
      .setValue('input[name="name"]', 'Yam')
      .pause(500)
      .clearValue('input[name="price"]')
      .setValue('input[name="price"]', 100)
      .pause(500)
      .clearValue('textarea[name="description"]')
      .setValue('textarea[name="description"]', 'Very delicious')
      .pause(500)
      .click('.submit')
      .pause(500)
      .moveToElement('.dropbtn', 18, 30)
      .pause(5000)
      .click('#allMeal-link');
  },
  'Meal list page': function (client) {
    client
      .waitForElementVisible('body', 4000)
      .assert.elementPresent('#allmeal')
      .pause(3000)
      .click('#edit:nth-of-type(1)')
      .pause(4000)
      .waitForElementVisible('body', 4000)
      .clearValue('input[name="name"]')
      .setValue('input[name="name"]', 'Beans')
      .pause(5000)
      .click('.submit')
      .moveToElement('.dropbtn', 18, 30)
      .pause(5000)
      .click('#allMeal-link')
      .waitForElementVisible('body', 4000)
      .click('.delete')
      .pause(5000)
      .click('.delete-meal')
      .pause(5000)
      .moveToElement('.dropbtn', 18, 30)
      .pause(5000)
      .click('#setMenu');
  },
  'Set todays menu': function (client) {
    client
      .waitForElementVisible('body', 4000)
      .assert.elementPresent('.form-field')
      .assert.containsText('#menu-header', 'SET MENU FOR THE DAY')
      .setValue('input[name="title"]', 'Today menu')
      .pause(4000)
      .setValue('input[name="orderBefore"]', 24)
      .pause(4000)
      .click('.my-menu > table > tbody > tr:nth-of-type(2) > td:nth-of-type(3) > label')
      .click('.my-menu > table > tbody > tr:nth-of-type(3) > td:nth-of-type(3) > label')
      .click('.setMenuBtn')
      .pause(10000)
      .moveToElement('.dropbtn', 18, 30)
      .pause(5000)
      .click('.logOut')
      .pause(5000)
      .end();
  }
};
