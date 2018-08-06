module.exports = {
  'Login test new tours': function (client) {
    client
      .url('localhost:5000/register')
      .setValue('input[name="name"]', 'kenson')
      .setValue('input[name="username"]', 'kenso')
      .setValue('input[name="password"]', 'kenson')
      .setValue('input[name="email"]', 'keogn@gmail.com')
      .setValue('input[name="vpassword"]', 'kenson')
      .click('button[name="submit"]')
      .assert.title('Book-A-Meal')
      .end();
  },
  'Login test': function (client) {
    client
      .url('localhost:5000/login')
      .setValue('input[name="username"]', 'kenso')
      .setValue('input[name="password"]', 'kenson')
      .assert.title('Book-A-Meal')
      .end();
  }
};
