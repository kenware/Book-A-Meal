
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';
import model from '../../server/models';

process.env.NODE_ENV = 'test';
const should = chai.should();

const {
  User,
  Meal,
  Menu,
  Order,
  MealMenu,
  notification,
  orderMealItems
} = model;

chai.use(chaiHttp);

let tokenUser2 = '';
let tokenUser = '';
let tokenAdmin = '';
let mealId = 0, menuId = 1, orderId = 0;
let id1;
describe('User information for Menu and Order controller', () => {
  before((done) => {
    User.sync()
      .then(() => {
        done();
      });
  });
  before((done) => {
    Meal.sync()
      .then(() => {
        done();
      });
  });
  before((done) => {
    Menu.sync()
      .then(() => {
        done();
      });
  });
  before((done) => {
    Order.sync()
      .then(() => {
        done();
      });
  });
  before((done) => {
    MealMenu.sync()
      .then(() => {
        done();
      });
  });
  before((done) => {
    notification.sync()
      .then(() => {
        done();
      });
  });
  before((done) => {
    orderMealItems.sync()
      .then(() => {
        done();
      });
  });
  before((done) => {
    User.destroy({
      where: {}
    }).then(() => {
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
        tokenUser2 = res.body.token;
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
        meals: ['34545jhjk'],
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
        meals: [id1],
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
        meals: [id1],
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
        meals: [400],
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
        meals: [mealId],
        orderBefore: (new Date().getHours() + 1),
      })
      .end((err, res) => {
        res.should.have.status(201);
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
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('count');
        done();
      });
  });
});


// Testing of order middleware and controller. it depends on the menu set
describe('Testing of Order middleware and controller', () => {
  it('User should not order a meal without menuId', (done) => {
    const newLocal = chai.request(server)
      .post('/api/v1/orders')
      .set('authorization', tokenUser)
      .send({
        address: 'no 19 reverend street',
        meals: [{
          mealId,
          menuId: '',
          quantity: 2,
          totalPrice: 400
        }]
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('Please provide a valid menu id');
        res.body.should.be.a('object');
        done();
      });
  }).timeout(10000);

  it('User should not order a meal without a valid mealId', (done) => {
    chai.request(server)
      .post('/api/v1/orders')
      .set('authorization', tokenUser)
      .send({
        address: 'no 19 reverend street',
        meals: [{
          mealId: '',
          menuId,
          quantity: 2,
          totalPrice: 400
        }]
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('Please provide a valid meal id');
        res.body.should.be.a('object');
        done();
      });
  });

  it('User should not order a meal without quantity', (done) => {
    chai.request(server)
      .post('/api/v1/orders')
      .set('authorization', tokenUser)
      .send({
        address: 'no 19 reverend street',
        meals: [{
          mealId,
          menuId,
          totalPrice: 400
        }]
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('Please provide a valid quantity');
        res.body.should.be.a('object');
        done();
      });
  });

  it('User should order a meal', (done) => {
    chai.request(server)
      .post('/api/v1/orders')
      .set('authorization', tokenUser)
      .send({
        address: 'no 19 reverend street',
        meals: [{
          mealId,
          menuId,
          totalPrice: 400,
          quantity: 3
        }]
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body[0].should.have.property('address').eql('no 19 reverend street');
        res.body[0].should.have.property('totalPrice').eql(400);
        res.body[0].should.have.property('status').eql('pending');
        res.body[0].should.have.property('meals').be.a('array');
        res.body[0].meals.length.should.be.eql(1);
        res.body[0].should.be.a('object');
        orderId = res.body[0].id;
        done();
      });
  });

  it('User should order multiple meal', (done) => {
    chai.request(server)
      .post('/api/v1/orders')
      .set('authorization', tokenUser)
      .send({
        address: 'no 19 reverend street',
        meals: [{
          mealId,
          menuId,
          totalPrice: 400,
          quantity: 3
        },
        {
          mealId,
          menuId,
          totalPrice: 400,
          quantity: 3
        }]
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.length.should.be.eql(1);
        res.body[0].should.have.property('address').eql('no 19 reverend street');
        res.body[0].should.have.property('totalPrice').eql(800);
        res.body[0].should.have.property('status').eql('pending');
        res.body[0].should.have.property('meals').be.a('array');
        res.body[0].meals.length.should.be.eql(2);
        res.body[0].should.be.a('object');
        done();
      });
  });

  it('User should not update order with aa bad order id params', (done) => {
    chai.request(server)
      .put('/api/v1/orders/a')
      .set('authorization', tokenUser)
      .send({
        address: 'no 19 reverend street',
        meals: [{
          mealId,
          menuId,
          totalPrice: 400,
          quantity: 3
        }]
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('Provide a valid order id');
        res.body.should.be.a('object');
        done();
      });
  });

  it('User should not update order that does not exist', (done) => {
    chai.request(server)
      .put('/api/v1/orders/100023')
      .set('authorization', tokenUser)
      .send({
        address: 'no 19 reverend street',
        meals: [{
          mealId,
          menuId,
          totalPrice: 400,
          quantity: 4
        }]
      })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').eql('Order not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('User should not update order he did not order', (done) => {
    chai.request(server)
      .put(`/api/v1/orders/${orderId}`)
      .set('authorization', tokenUser2)
      .send({
        address: 'no 19 reverend street',
        meals: [{
          mealId,
          menuId,
          totalPrice: 500,
          quantity: 4
        }]
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('You cannot update order you did not add');
        res.body.should.be.a('object');
        done();
      });
  });

  it('User should not update an order without quantity', (done) => {
    chai.request(server)
      .put(`/api/v1/orders/${orderId}`)
      .set('authorization', tokenUser)
      .send({
        address: 'no 19 reverend street',
        meals: [{
          mealId,
          menuId,
          totalPrice: 400
        }]
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('Please provide a valid quantity');
        res.body.should.be.a('object');
        done();
      });
  });

  it('User should update an order', (done) => {
    chai.request(server)
      .put(`/api/v1/orders/${orderId}`)
      .set('authorization', tokenUser)
      .send({
        address: 'no 19 reverend street',
        meals: [{
          mealId,
          menuId,
          totalPrice: 400,
          quantity: 3
        }]
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.myOrder.should.have.property('address').eql('no 19 reverend street');
        res.body.myOrder.should.have.property('totalPrice').eql(400);
        res.body.myOrder.should.have.property('status').eql('pending');
        res.body.should.have.property('meals').be.a('array');
        res.body.meals.length.should.be.eql(1);
        res.body.should.be.a('object');
        done();
      });
  });

  it('Admin should not get orders with negative query param', (done) => {
    chai.request(server)
      .get('/api/v1/orders?limit=-1&offset=3')
      .set('authorization', tokenAdmin)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('Your query param cannot be negative');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Admin should get all orders', (done) => {
    chai.request(server)
      .get('/api/v1/orders')
      .set('authorization', tokenAdmin)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('orders').to.be.a('array');
        done();
      });
  });

  it('Users should not get orders with negative query param', (done) => {
    chai.request(server)
      .get('/api/v1/user/orders?limit=-1&offset=3')
      .set('authorization', tokenUser)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('Your query param cannot be negative');
        res.body.should.be.a('object');
        done();
      });
  });

  it('User should not get orders when he has not ordered a meal', (done) => {
    chai.request(server)
      .get('/api/v1/user/orders')
      .set('authorization', tokenUser2)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').eql('You have not ordered a meal');
        done();
      });
  });

  it('User should get his orders', (done) => {
    chai.request(server)
      .get('/api/v1/user/orders')
      .set('authorization', tokenUser)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('orders').to.be.a('array');
        done();
      });
  });

  it('Users should not confirm order that does not exist', (done) => {
    chai.request(server)
      .put('/api/v1/orderStatus/64646')
      .set('authorization', tokenUser)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').eql('Order not found');
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('Bad Requests', () => {
  it('Should return 404 on GET bad request', (done) => {
    chai.request(server)
      .get('/api/v1/ordersbyme')
      .set('authorization', tokenAdmin)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('404 Not Found');
        done();
      });
  });

  it('Should return 404 on put bad request', (done) => {
    chai.request(server)
      .put(`/api/v1/ordersinthelondon/${orderId}`)
      .set('authorization', tokenUser)
      .send({
        quantity: 2,
        address: 'no 19 reverend street'
      })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('404 Not Found');
        done();
      });
  });

  it('Should return 404 on DELETE bad request', (done) => {
    chai.request(server)
      .delete(`/api/v1/ordersinthelondon/${orderId}`)
      .set('authorization', tokenUser)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('404 Not Found');
        done();
      });
  });

  it('Should return 404 on put bad request', (done) => {
    chai.request(server)
      .post('/api/v1/mymealseals')
      .set('authorization', tokenUser)
      .send({
        quantity: 2,
        address: 'no 19 reverend street'
      })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('404 Not Found');
        done();
      });
  });
});
