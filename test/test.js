process.env.NODE_ENV = 'test';


import meals from '../server/models/meal';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('mocha testing of meal models', () => {
    
describe('/GET api/v1/meals', () => {
      it('it should GET all the meals', (done) => {
        chai.request(server)
            .get('/api/v1/meals')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(3);
                done();
            });
      });
  });
describe('/POST api/v1/meales', () => {
    it('it should not post meal that already exist', (done) => {
      chai.request(server)
          .post('/api/v1/meals')
          .send({
                 id:1,
                 name:'rice and beans',
                 price: 300,
                 description:'very sumptious and yummy'
                 })
          .end((err, res) => {
              res.should.have.status(422);
              res.body.should.be.a('string');            
              res.body.should.be.eql('meal aready exist');
              done();
          });
       });
   });
describe('/POST api/v1/meales', () => {
    it('it should post a meal', (done) => {
      chai.request(server)
          .post('/api/v1/meals')
          .send({
                 id:4,
                 name:'rice and beans with pap',
                 price: 300,
                 description:'very sumptious and yummy'
                 })
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');            
              res.body.should.have.property('meal').be.a('object');
              res.body.should.have.property('message').eql('meal successfuly created');
              done();
          });
       });
   });
   describe('/POST api/v1/meales', () => {
    it('it should not post an empty object', (done) => {
      chai.request(server)
          .post('/api/v1/meals')
          .send({})
          .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('string');            
              res.body.should.be.eql('all the meal field are required');
              done();
          });
       });
   });
   describe('/PUT api/v1/meales/mealId', () => {
    it('it should not update meal that does not exist', (done) => {
      chai.request(server)
          .put('/api/v1/meals/9')
          .send({
            name:'rice and beans with pap',
            price: 300,
            description:'very sumptious and yummy'
          })
          .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('string');            
              res.body.should.be.eql('meals not found');
              done();
          });
       });
   });
   describe('/PUT api/v1/meales/mealId', () => {
    it('it should update meal', (done) => {
      chai.request(server)
          .put('/api/v1/meals/4')
          .send({
            id: 4,
            name:'rice and beans with pap',
            price: 300,
            description:'very sumptious and yummy'
          })
          .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.a('object');            
              res.body.should.have.property('message').eql('successfuly updated');
              done();
          });
       });
   });
   describe('/delete api/v1/meales/mealId', () => {
    it('it should return resource not found for meal that does not exist', (done) => {
      chai.request(server)
          .delete('/api/v1/meals/9')
          .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('string');            
              res.body.should.be.eql('meal not found');
              done();
          });
       });
   });
   describe('/delete api/v1/meales/mealId', () => {
    it('it should return resource not found for meal that does not exist', (done) => {
      chai.request(server)
          .delete('/api/v1/meals/4')
          .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.a('string');            
              res.body.should.be.eql('meal successfully deleted');
              done();
          });
       });
   });
})