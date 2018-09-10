/* eslint func-names: 0 */
const email = `kenson${Math.floor(Math.random() * 1000)}@gmail.com`;
const username = `kenson${Math.floor(Math.random() * 1000)}`;

module.exports = {
  'Register user': function (client) {
    client
      .url('localhost:5000/register')
      .waitForElementVisible('body', 4000)
      .setValue('input[name="name"]', 'keny')
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
      .click('div div:nth-of-type(1) > .menuAccordion')
      .pause(3000)
      .click('div div:nth-of-type(1) > .meal-menu-row > .meal-menu:nth-of-type(1) > .menu-card > .container button')
      .pause(3000)
      .setValue('input[name="quantity"]', 4)
      .pause(3000)
      .click('.modal-btn')
      .pause(300)
      .click('.fa-shopping-cart')
      .setValue('textarea[name="address"]', 'Reverend Street')
      .pause(4000)
      .click('.checkout-btn')
      .pause(10000)
      .click('.order-link')
      .pause(5000)
      .waitForElementVisible('body', 4000)
      .click('.accordion > .accordion__item:nth-of-type(2) > .accordion__title')
      .pause(3000)
      .click('.accordion > .accordion__item:nth-of-type(2) > .accordion__title')
      .pause(3000)
      .click('.accordion > .accordion__item:nth-of-type(2) > .accordion__title > .order-accordion > div:nth-of-type(6) > button')
      .pause(5000)
      .click('.confirmStatus')
      .pause(6000)
      .end();
  },
};

