
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';
import model from '../../server/models';
import { adminUser, firstUser, secondUser } from '../testMock';

process.env.NODE_ENV = 'test';
const should = chai.should();

const {
  User,
} = model;
chai.use(chaiHttp);

let tokenUpdate = '', newToken;
describe('/POST api/v1/auth/signup', () => {
  before((done) => {
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
      .send(adminUser)
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
      .send(firstUser)
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
      .send(secondUser)
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

  it('user should not signup with a password less than five', (done) => {
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
        newToken = res.body.token;
        done();
      });
  });

  it('user should receive resetLink if password is forgottn', (done) => {
    chai.request(server)
      .post('/api/v1/auth/resetLink')
      .send({
        emailOrUsername: 'kenson'
      })
      .end((err, res) => {
        res.body.should.have.property('message');
        done();
      });
  }).timeout(15000);

  it('user should change there password', (done) => {
    chai.request(server)
      .post('/api/v1/auth/reset')
      .set('authorization', newToken)
      .send({
        password: '12345678'
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('user').be.a('object');
        res.body.should.have.property('success').eql('Password changed');
        done();
      });
  });
});
