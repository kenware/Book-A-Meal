
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';
import model from '../../server/models';
import { adminUser, firstUser, secondUser, secondAdmin } from '../testMock';

process.env.NODE_ENV = 'test';
const should = chai.should();

const { User } = model;

chai.use(chaiHttp);
let tokenUser = '';
let tokenAdmin = '', tokenAdmin2 = '', mealId = 0;

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
        tokenAdmin = res.body.token;
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
        tokenUser = res.body.token;
        done();
      });
  });

  it('user should sign up', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(secondAdmin)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('name').eql('ejike');
        res.body.should.have.property('username').eql('ejike');
        res.body.should.have.property('email').eql('ejike@gmail.kev');
        res.body.should.have.property('token');
        tokenAdmin2 = res.body.token;
        done();
      });
  });
});

describe('Testing of meal middleware and controller', () => {
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
  it('caterer should GET/ a message when he make a request on empty meal table', (done) => {
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
        res.body.should.be.a('object');
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

  it(' caterer should not UPDATE a meal he did not add', (done) => {
    chai.request(server)
      .put(`/api/v1/meals/${mealId}`)
      .set('authorization', tokenAdmin2)
      .send({
        name: 'beansee',
        price: '5566',
        description: 'good'
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('You cannot update meal you did not add');
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
