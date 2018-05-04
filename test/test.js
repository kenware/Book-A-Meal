
process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
let should = chai.should();
import model from '../server/models';
const User = model.User;
const Meal = model.Meal;
//const  menu = model.Menu;
//const  Order = model.Order;
chai.use(chaiHttp);
//import FormData from 'form-data';



let tokenSuper = '';
let tokenUser = '';
let tokenAdmin = '';
describe('/POST api/v1/auth/signup', () => {
    before((done) => {
        User.sync()
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
     //migrate or a DB 
     before((done) => {
        Meal.sync()
        .then(() => {
            done();
        });
      });
      before((done) => {
        Meal.destroy({
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
              username:'kenson',
              name:'kenson',
              email:'kenson@gmail.com',
              password:'12345',
              role: 'superUser'
             })
        .end((err, res) => {
            res.should.have.status(201);
            res.body.should.have.property('user');
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
               username:'keneth',
               name:'keneth',
               email:'kelvin@gmail.kev',
               password:'12345'
              })
         .end((err, res) => {
             res.should.have.status(201);
             res.body.should.have.property('user');
             res.body.should.have.property('token');
             res.body.should.be.a('object')
             userId = res.body.user.id;
             done();
         });
   });
   it('second user should sign up', (done) => {
    chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
              username:'ejike',
              name:'ejike',
              email:'ejike@gmail.kev',
              password:'12345'
             })
        .end((err, res) => {
            res.should.have.status(201);
            res.body.should.have.property('user');
            res.body.should.have.property('token');
            res.body.should.be.a('object');
            tokenUser = res.body.token;
            done();
        });
  });
  it('superUser should set firstUser as an admin', (done) => {
    chai.request(server)
        .post('/api/v1/auth/admin/' + userId)
        .set('authorization', tokenSuper)
        .end((err, res) => {
            res.should.have.status(201);
            res.body.should.have.property('message');
            res.body.should.have.property('setAdmin');
            res.body.should.be.a('object')
            done();
        });
  });

   it('user with existing email should not sign up', (done) => {
    chai.request(server)
    .post('/api/v1/auth/signup')
        .send({
            username:'kenethy',
            name:'keneth',
            email:'kelvin@gmail.kev',
            password:'12345678'
            })
        .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.eql('email already exist');
            res.body.should.be.a('string')
            done();
        });
   });

   it('user with existing username should not sign up', (done) => {
     chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
            username:'keneth',
            name:'keneth',
            email:'kelvin@gmail.com',
            password:'12345678'
            })
        .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.eql('username already exist');
            res.body.should.be.a('string')
            done();
     });    
   });
   it('user should not signup with invalid email address', (done) => {
    chai.request(server)
       .post('/api/v1/auth/signup')
       .send({
           username:'kenson',
           name:'kennneth',
           email:'kelvin@',
           password:'123esdrwww'
           })
       .end((err, res) => {
           res.should.have.status(401);
           res.body.should.be.eql('invalid email');
           res.body.should.be.a('string')
           done();
    });    
  });
   it('user should not signup with a minimum of 4 characters', (done) => {
    chai.request(server)
       .post('/api/v1/auth/signup')
       .send({
           username:'ke',
           name:'kennneth',
           email:'kelvin@gmail.com',
           password:'12'
           })
       .end((err, res) => {
           res.should.have.status(401);
           res.body.should.be.eql('each field must be a minimum of 4 characters');
           res.body.should.be.a('string')
           done();
    });    
  });
  it('user should not signup without username', (done) => {
    chai.request(server)
       .post('/api/v1/auth/signup')
       .send({
           username:'',
           name:'kennneth',
           email:'kelvin@gmail.com',
           password:'12'
           })
       .end((err, res) => {
           res.should.have.status(401);
           res.body.should.be.eql('username is required');
           res.body.should.be.a('string')
           done();
    });    
  });
  it('user should not sign up without email', (done) => {
    chai.request(server)
       .post('/api/v1/auth/signup')
       .send({
           username:'kenware',
           name:'kennetho',
           email:'',
           password:'12234555'
           })
       .end((err, res) => {
           res.should.have.status(401);
           res.body.should.be.eql('email is required');
           res.body.should.be.a('string')
           done();
    });    
  });
  it('user should not sign up without password', (done) => {
    chai.request(server)
       .post('/api/v1/auth/signup')
       .send({
           username:'kenware',
           name:'kennetho',
           email:'ejykken@gmail.com',
           password:''
           })
       .end((err, res) => {
           res.should.have.status(401);
           res.body.should.be.eql('password is required');
           res.body.should.be.a('string')
           done();
    });    
  });
});

describe('/POST api/v1/auth/signin', () => {
    it('user should not login without username', (done) => {
        chai.request(server)
           .post('/api/v1/auth/signin')
           .send({
               username:'',
               password:'12345'
               })
           .end((err, res) => {
               res.should.have.status(401);
               res.body.should.be.eql('username is required');
               res.body.should.be.a('string')
               done();
        });    
    });
    it('user should not login without password', (done) => {
        chai.request(server)
           .post('/api/v1/auth/signin')
           .send({
               username:'kenson',
               password:''
               })
           .end((err, res) => {
               res.should.have.status(401);
               res.body.should.be.eql('password is required');
               res.body.should.be.a('string')
               done();
        });    
      });
      it('user should not login username that does not exist', (done) => {
        chai.request(server)
           .post('/api/v1/auth/signin')
           .send({
               username:'kensone',
               password:'12345'
               })
           .end((err, res) => {
               res.should.have.status(401);
               res.body.should.be.eql('wrong credentials');
               res.body.should.be.a('string')
               done();
        });    
      }); 
      it('user should not login password that do not match username', (done) => {
        chai.request(server)
           .post('/api/v1/auth/signin')
           .send({
               username:'kenson',
               password:'1234545d4ffdf'
               })
           .end((err, res) => {
               res.should.have.status(401);
               res.body.should.be.eql('wrong credentials');
               res.body.should.be.a('string')
               done();
        });    
      }); 
      it('user should login', (done) => {
        chai.request(server)
           .post('/api/v1/auth/signin')
           .send({
               username:'kenson',
               password:'12345'
               })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message');
                res.body.should.have.property('token');
                res.body.should.be.a('object')
               done();
        });    
      });          
});

describe('Testing of meal middleware and controller', () => {

let id = 0; 
  before((done) => {
    chai.request(server)
        .post('/api/v1/auth/signin')
        .send({ 
            username:'keneth',
            password:'12345'
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
           .post('/api/v1/auth/meals')
           .set('authorization', tokenUser)
           .send({
               name:'abacha',
               price:555,
               description:'good'
               })
           .end((err, res) => {
               res.should.have.status(401);
               res.body.should.be.eql('Unauthorised access');
               res.body.should.be.a('string')
               done();
        });    
    });
    it('Normal user should not GET/ a meal', (done) => {
        chai.request(server)
           .get('/api/v1/auth/meals')
           .set('authorization', tokenUser)
           .end((err, res) => {
               res.should.have.status(401);
               res.body.should.be.eql('Unauthorised access');
               res.body.should.be.a('string')
               done();
        });    
    });
});