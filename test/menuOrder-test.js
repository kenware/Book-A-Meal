
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import model from '../server/models';

process.env.NODE_ENV = 'test';
const should = chai.should();

const {
  User,
  Meal,
  Menu,
  Order,
  MealMenu,
  notification
} = model;

chai.use(chaiHttp);

let tokenUpdate = '';
let tokenUser = '';
let tokenAdmin = '';
let mealId = 0, menuId = 1, orderId = 0;
let id1;
describe('User information for Menu and Order controller', () => {
  before((done) => {
    User.sync();
    Meal.sync();
    Menu.sync();
    Order.sync();
    MealMenu.sync();
    notification.sync();
    User.destroy({
      where: {}
    })
      .then(() => {
        done();
      });
  });

  it('admin should sign up ', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        username: 'kenson',
        name: 'kenson',
        email: 'kenson@gmail.com',
        password: '12345',
        role: 'admin'
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('name').eql('kenson');
        res.body.should.have.property('username').eql('kenson');
        res.body.should.have.property('name').eql('kenson');
        res.body.should.have.property('token');
        res.body.should.be.a('object');
        tokenAdmin = res.body.token;
        done();
      });
  });

  it('first user should sign up', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        username: 'keneth',
        name: 'keneth',
        email: 'kelvin@gmail.kev',
        password: '12345'
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('name').eql('keneth');
        res.body.should.have.property('username').eql('keneth');
        res.body.should.have.property('email').eql('kelvin@gmail.kev');
        res.body.should.have.property('token');
        res.body.should.be.a('object');
        tokenUpdate = res.body.token;
        done();
      });
  });

  it('second user should sign up', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        username: 'ejike',
        name: 'ejike',
        email: 'ejike@gmail.kev',
        password: '12345'
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('name').eql('ejike');
        res.body.should.have.property('username').eql('ejike');
        res.body.should.have.property('email').eql('ejike@gmail.kev');
        res.body.should.have.property('token');
        res.body.should.be.a('object');
        tokenUser = res.body.token;
        done();
      });
  });

  it('first User should update to admin', (done) => {
    chai.request(server)
      .post('/api/v1/auth/admin')
      .set('authorization', tokenUpdate)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message');
        res.body.should.have.property('setAdmin');
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('Testing of Menu middleware and controller', () => {
  it('Admin user should POST a meal id1', (done) => {
    chai.request(server)
      .post('/api/v1/meals')
      .set('authorization', tokenAdmin)
      .send({
        name: 'abacha',
        price: 555,
        description: 'good'
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('name').eql('abacha');
        res.body.should.be.a('object');
        id1 = res.body.id;
        done();
      });
  });

  it('Admin user should POST a meal id2', (done) => {
    chai.request(server)
      .post('/api/v1/meals')
      .set('authorization', tokenAdmin)
      .send({
        name: 'ogbono',
        price: 555,
        description: 'good'
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('name').eql('ogbono');
        done();
      });
  });

  it('Admin user should not POST a menu with no meal id', (done) => {
    chai.request(server)
      .post('/api/v1/menu')
      .set('authorization', tokenAdmin)
      .send({
        title: 'today',
        mealId: '',
        orderBefore: (new Date().getHours() + 2),
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('please select a meal to set menu');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Admin user should not POST a menu with invalid meal id', (done) => {
    chai.request(server)
      .post('/api/v1/menu')
      .set('authorization', tokenAdmin)
      .send({
        title: 'today',
        mealId: '34545jhjk',
        orderBefore: (new Date().getHours() + 1),
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('Enter a valid meal id');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Admin user should not POST a menu without orderBefore', (done) => {
    chai.request(server)
      .post('/api/v1/menu')
      .set('authorization', tokenAdmin)
      .send({
        title: 'today',
        mealId: id1,
        orderBefore: '',
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('Specify the time users should be able to make an order');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Admin user should not POST a menu with invalid orderbefore', (done) => {
    chai.request(server)
      .post('/api/v1/menu')
      .set('authorization', tokenAdmin)
      .send({
        title: 'today',
        mealId: id1,
        orderBefore: '3455kl;;',
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('Please provide a valid time in hours');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Admin user should  not POST a menu with meal id that does not exist', (done) => {
    chai.request(server)
      .post('/api/v1/menu')
      .set('authorization', tokenAdmin)
      .send({
        title: 'today',
        mealId: 400,
        orderBefore: '3455',
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('Expire time cannot be more than 24 hours');
        res.body.should.be.a('object');
        done();
      });
  });
  it('Admin user should  not Get a menu that is not set', (done) => {
    chai.request(server)
      .get('/api/v1/menu')
      .set('authorization', tokenUser)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Admin user should POST a meal', (done) => {
    chai.request(server)
      .post('/api/v1/meals')
      .set('authorization', tokenAdmin)
      .send({
        name: 'abacha and fish',
        price: 555,
        description: 'good'
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('name').eql('abacha and fish');
        mealId = res.body.id;
        done();
      });
  });

  it('User should POST a menu', (done) => {
    chai.request(server)
      .post('/api/v1/menu')
      .set('authorization', tokenAdmin)
      .send({
        title: 'today',
        mealId,
        orderBefore: (new Date().getHours() + 1),
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message');
        res.body.should.have.property('menu');
        res.body.should.be.a('object');
        menuId = res.body.menu.id;
        done();
      });
  }).timeout(10000);
  it('User should Get a menu', (done) => {
    chai.request(server)
      .get('/api/v1/menu?limit=1&offset=0')
      .set('authorization', tokenUser)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
});


// Testing of order middleware and controller. it depends on the menu set
describe('Testing of Order middleware and controller', () => {
  it('User should not order a meal without mealId', (done) => {
    chai.request(server)
      .post('/api/v1/orders')
      .set('authorization', tokenUser)
      .send({
        mealId: '',
        menuId,
        quantity: 2,
        address: 'no 19 reverend street'
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('mealId is required');
        res.body.should.be.a('object');
        done();
      });
  });
  it('User should not order a meal without menuId', (done) => {
    chai.request(server)
      .post('/api/v1/orders')
      .set('authorization', tokenUser)
      .send({
        mealId: id1,
        menuId: '',
        quantity: 2,
        address: 'no 19 reverend street'
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('menuId is required');
        res.body.should.be.a('object');
        done();
      });
  });
  it('User should not order a meal without quantity', (done) => {
    chai.request(server)
      .post('/api/v1/orders')
      .set('authorization', tokenUser)
      .send({
        mealId: id1,
        menuId,
        quantity: '',
        address: 'no 19 reverend street'
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('quantity is required');
        res.body.should.be.a('object');
        done();
      });
  });
  it('User should not order a meal without address', (done) => {
    chai.request(server)
      .post('/api/v1/orders')
      .set('authorization', tokenUser)
      .send({
        mealId: id1,
        menuId,
        quantity: 2,
        address: ''
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('address is required');
        res.body.should.be.a('object');
        done();
      });
  });
  it('User should not order a meal with invalid menu id', (done) => {
    chai.request(server)
      .post('/api/v1/orders')
      .set('authorization', tokenUser)
      .send({
        mealId: id1,
        menuId: ' ',
        quantity: 2,
        address: 'no 19'
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('Please provide a valid menu id');
        res.body.should.be.a('object');
        done();
      });
  });
  it('User should not order a meal with invalid meal id', (done) => {
    chai.request(server)
      .post('/api/v1/orders')
      .set('authorization', tokenUser)
      .send({
        mealId: '  hj',
        menuId,
        quantity: 2,
        address: 'no 19'
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('Please provide a valid meal id');
        res.body.should.be.a('object');
        done();
      });
  });
  it('User should not order a meal with invalid quantity input', (done) => {
    chai.request(server)
      .post('/api/v1/orders')
      .set('authorization', tokenUser)
      .send({
        mealId: id1,
        menuId,
        quantity: 'hhjo',
        address: 'no 19'
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('Please provide a valid quantity');
        res.body.should.be.a('object');
        done();
      });
  });
  it('User should not order a meal with a meal id that does not exist', (done) => {
    chai.request(server)
      .post('/api/v1/orders')
      .set('authorization', tokenUser)
      .send({
        mealId: 10000,
        menuId,
        quantity: 2,
        address: 'no 19'
      })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').eql('Meal not found');
        res.body.should.be.a('object');
        done();
      });
  });
  it('User should not order a meal with a menu id that does not exist', (done) => {
    chai.request(server)
      .post('/api/v1/orders')
      .set('authorization', tokenUser)
      .send({
        mealId: id1,
        menuId: 200,
        quantity: 2,
        address: 'no 19'
      })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').eql('Menu not found');
        res.body.should.be.a('object');
        done();
      });
  });
  it('User order a meal', (done) => {
    chai.request(server)
      .post('/api/v1/orders')
      .set('authorization', tokenUser)
      .send({
        mealId,
        menuId,
        quantity: 2,
        address: 'no 19 reverend street'
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('address').eql('no 19 reverend street');
        res.body.should.have.property('totalPrice').eql(1110);
        res.body.should.have.property('status').eql('pending');
        res.body.should.be.a('object');
        orderId = res.body.id;
        done();
      });
  });
  it('User should not update order with aa bad order id params', (done) => {
    chai.request(server)
      .put('/api/v1/orders/a')
      .set('authorization', tokenUser)
      .send({
        quantity: 3,
        address: 'no 19 reverend street'
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('Provide a valid order id');
        res.body.should.be.a('object');
        done();
      });
  });
  it('User should not update order with orderId that does not exist', (done) => {
    chai.request(server)
      .put('/api/v1/orders/200')
      .set('authorization', tokenUser)
      .send({
        quantity: 3,
        address: 'no 19 reverend street'
      })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').eql('Order not found');
        res.body.should.be.a('object');
        done();
      });
  });
  it('User should update an order', (done) => {
    chai.request(server)
      .put(`/api/v1/orders/${orderId}`)
      .set('authorization', tokenUser)
      .send({
        quantity: 1,
        address: 'no 19 reverend street'
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('address').eql('no 19 reverend street');
        res.body.should.have.property('totalPrice').eql(555);
        res.body.should.have.property('status').eql('pending');
        res.body.should.be.a('object');
        done();
      });
  });
  it('Admin should get all orders', (done) => {
    chai.request(server)
      .get('/api/v1/orders')
      .set('authorization', tokenAdmin)
      .send({
        quantity: 3,
        address: 'no 19 reverend street'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});
