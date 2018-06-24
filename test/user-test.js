
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
// import FormData from 'form-data';


let tokenUpdate = '';
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
        role: 'admin'
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('name').eql('kenson');
        res.body.should.have.property('username').eql('kenson');
        res.body.should.have.property('name').eql('kenson');
        res.body.should.have.property('token');
        res.body.should.be.a('object');
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
