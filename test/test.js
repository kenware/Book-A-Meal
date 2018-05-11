
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import model from '../server/models';

process.env.NODE_ENV = 'test';
const should = chai.should();

const {
  User, Meal, Menu, Order
} = model;

chai.use(chaiHttp);
// import FormData from 'form-data';


let tokenSuper = '';
let tokenUser = '';
let tokenAdmin = '';
let id = 0, mealId = 0;
describe('/POST api/v1/auth/signup', () => {
  before((done) => {
    User.sync()
      .then(() => {
        done();
      });
  });
  // migrate or a DB
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
    User.destroy({
      where: {}
    })
      .then(() => {
        done();
      });
  });
  let userId = 0;
  it('superuser should sign up ', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        username: 'kenson',
        name: 'kenson',
        email: 'kenson@gmail.com',
        password: '12345',
        role: 'superUser'
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('name').eql('kenson');
        res.body.should.have.property('username').eql('kenson');
        res.body.should.have.property('name').eql('kenson');
        res.body.should.have.property('token');
        res.body.should.be.a('object');
        tokenSuper = res.body.token;
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
        userId = res.body.id;
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
  it('superUser should set firstUser as an admin', (done) => {
    chai.request(server)
      .post(`/api/v1/auth/admin/${userId}`)
      .set('authorization', tokenSuper)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message');
        res.body.should.have.property('setAdmin');
        res.body.should.be.a('object');
        done();
      });
  });

  it('user with existing email should not sign up', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        username: 'kenethy',
        name: 'keneth',
        email: 'kelvin@gmail.kev',
        password: '12345678'
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('Email already exist');
        res.body.should.be.a('object');
        done();
      });
  });

  it('user with existing username should not sign up', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        username: 'keneth',
        name: 'keneth',
        email: 'kelvin@gmail.com',
        password: '12345678'
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('Username already exist');
        res.body.should.be.a('object');
        done();
      });
  });
  it('user should not signup with invalid email address', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        username: 'kenson',
        name: 'kennneth',
        email: 'kelvin@',
        password: '123esdrwww'
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('Invalid email');
        res.body.should.be.a('object');
        done();
      });
  });
  it('user should not signup with a minimum of 4 characters', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        username: 'ke',
        name: 'kennneth',
        email: 'kelvin@gmail.com',
        password: '12'
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('Password must be greater than five character');
        res.body.should.be.a('object');
        done();
      });
  });
  it('user should not signup without username', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        username: '',
        name: 'kennneth',
        email: 'kelvin@gmail.com',
        password: '12'
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('Valid username is required');
        res.body.should.be.a('object');
        done();
      });
  });
  it('user should not sign up without email', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        username: 'kenware',
        name: 'kennetho',
        email: '',
        password: '12234555'
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('Email is required');
        res.body.should.be.a('object');
        done();
      });
  });
  it('user should not sign up without password', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        username: 'kenware',
        name: 'kennetho',
        email: 'ejykken@gmail.com',
        password: ''
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('Password is required');
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('/POST api/v1/auth/signin', () => {
  it('user should not login without username', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send({
        username: '',
        password: '12345'
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('Username is required');
        res.body.should.be.a('object');
        done();
      });
  });
  it('user should not login without password', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send({
        username: 'kenson',
        password: ''
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('Password is required');
        res.body.should.be.a('object');
        done();
      });
  });
  it('user should not login username that does not exist', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send({
        username: 'kensone',
        password: '12345'
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('Wrong credentials');
        res.body.should.be.a('object');
        done();
      });
  });
  it('user should not login password that do not match username', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send({
        username: 'kenson',
        password: '1234545d4ffdf'
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('Wrong credentials');
        res.body.should.be.a('object');
        done();
      });
  });
  it('user should login', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send({
        username: 'kenson',
        password: '12345'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message');
        res.body.should.have.property('token');
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('Testing of meal middleware and controller', () => {
  before((done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send({
        username: 'keneth',
        password: '12345'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('succesful login');
        res.body.should.have.property('token');
        tokenAdmin = res.body.token;

        done();
      });
  });
  it('Normal user should not POST a meal', (done) => {
    chai.request(server)
      .post('/api/v1/meals')
      .set('authorization', tokenUser)
      .send({
        name: 'abacha',
        price: 555,
        description: 'good'
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('Unauthorized Access');
        res.body.should.be.a('object');
        done();
      });
  });
  it('caterer should not GET/ an empty meal', (done) => {
    chai.request(server)
      .get('/api/v1/meals')
      .set('authorization', tokenAdmin)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('There is no meal in the list');
        res.body.should.be.a('object');
        done();
      });
  });
  it('Admin user should POST a meal', (done) => {
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
        res.body.should.be.a('object');
        res.body.should.have.property('name').eql('abacha');
        mealId = res.body.id;
        done();
      });
  });
  it('Admin user should not POST a meal that already exist', (done) => {
    chai.request(server)
      .post('/api/v1/meals')
      .set('authorization', tokenAdmin)
      .send({
        name: 'abacha',
        price: 555,
        description: 'good'
      })
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.have.property('message').eql('Meal already exist');
        res.body.should.be.a('object');
        done();
      });
  });
  it(' user should not POST a meal without name', (done) => {
    chai.request(server)
      .post('/api/v1/meals')
      .set('authorization', tokenAdmin)
      .send({
        name: '',
        price: 555,
        description: 'good'
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('Name field is required');
        res.body.should.be.a('object');
        done();
      });
  });
  it(' user should not POST a meal without price', (done) => {
    chai.request(server)
      .post('/api/v1/meals')
      .set('authorization', tokenAdmin)
      .send({
        name: 'egusi',
        price: '',
        description: 'good'
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('Price field is required');
        res.body.should.be.a('object');
        done();
      });
  });
  it(' user should not POST a meal that already exist name', (done) => {
    chai.request(server)
      .post('/api/v1/meals')
      .set('authorization', tokenAdmin)
      .send({
        name: 'abacha',
        price: 555,
        description: 'good'
      })
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.have.property('message').eql('Meal already exist');
        res.body.should.be.a('object');
        done();
      });
  });
  it('Normal user should not GET/ a meal', (done) => {
    chai.request(server)
      .get('/api/v1/meals')
      .set('authorization', tokenUser)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('Unauthorized Access');
        res.body.should.be.a('object');
        done();
      });
  });
  it('caterer should GET/ all meals', (done) => {
    chai.request(server)
      .get('/api/v1/meals')
      .set('authorization', tokenAdmin)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
  it(' user should not POST a meal name with sql, special chararcters', (done) => {
    chai.request(server)
      .post('/api/v1/meals')
      .set('authorization', tokenAdmin)
      .send({
        name: 'beanse234$#%&',
        price: 555,
        description: 'good'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql('Please provide a valid meal name');
        res.body.should.be.a('object');
        done();
      });
  });
  it(' user should not POST a meal price with special chararcters', (done) => {
    chai.request(server)
      .post('/api/v1/meals')
      .set('authorization', tokenAdmin)
      .send({
        name: 'beanse234$#%&',
        price: '5566dr4#',
        description: 'good'
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('Please provide a valid meal price');
        res.body.should.be.a('object');
        done();
      });
  });
  it(' user should not UPDATE a meal that does not exist', (done) => {
    chai.request(server)
      .put('/api/v1/meals/60')
      .set('authorization', tokenAdmin)
      .send({
        name: 'beanse',
        price: '5566',
        description: 'good'
      })
      .end((err, res) => {
       
        res.body.should.have.property('message').eql('Meal does not exist');
        res.body.should.be.a('object');
        done();
      });
  });
  it(' user should UPDATE a meal', (done) => {
    chai.request(server)
      .put(`/api/v1/meals/${mealId}`)
      .set('authorization', tokenAdmin)
      .send({
        name: 'beansee',
        price: '5566',
        description: 'good'
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('name').eql('beansee');
        res.body.should.be.a('object');
        done();
      });
  });
  it(' user should Delete a meal', (done) => {
    chai.request(server)
      .delete(`/api/v1/meals/${mealId}`)
      .set('authorization', tokenAdmin)
      .send({
        name: 'beansee',
        price: '5566',
        description: 'good'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql('Meal successfully deleted');
        res.body.should.be.a('object');
        done();
      });
  });
});
describe('Testing of Menu middleware and controller', () => {
  let id1, id2=0;
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
        res.body.should.have.property('name').eql('ogbono')
        id2 = res.body.id;
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
        orderBefore: (new Date().getHours() + 2),
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
  it('Admin should  not GET a menu that is not set', (done) => {
    chai.request(server)
      .get('/api/v1/menu')
      .set('authorization', tokenAdmin)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        done();
      });
  });
  it('Admin should POST a menu', (done) => {
    chai.request(server)
      .post('/api/v1/menu')
      .set('authorization', tokenAdmin)
      .send({
        title: 'today',
        mealId: id1,
        orderBefore: (new Date().getHours() + 2),
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message');
        res.body.should.have.property('menu');
        res.body.should.be.a('object');
        done();
      });
  });
  it('User should  GET a menu', (done) => {
    chai.request(server)
      .get('/api/v1/menu')
      .set('authorization', tokenUser)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
});
