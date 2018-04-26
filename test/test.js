// import meals from '../server/models/meal';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';


process.env.NODE_ENV = 'test';
const should = chai.should();

chai.use(chaiHttp);
// Our parent block
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
          id: 1,
          name: 'rice and beans',
          price: 300,
          description: 'very sumptious and yummy'
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
          id: 4,
          name: 'rice and beans with pap',
          price: 300,
          description: 'very sumptious and yummy'
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
          name: 'rice and beans with pap',
          price: 300,
          description: 'very sumptious and yummy'
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
          name: 'rice and beans with pap',
          price: 300,
          description: 'very sumptious and yummy'
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
});


describe('mocha testing of menu models', () => {
  describe('/GET api/v1/menu', () => {
    it('it should get empty result when todays menu is not set', (done) => {
      chai.request(server)
        .get('/api/v1/menu')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('string');
          res.body.should.be.eql('today menu is not set');
          done();
        });
    });
  });
  describe('/POST api/v1/menu', () => {
    it('it should post a menu with a string of mealsId', (done) => {
      chai.request(server)
        .post('/api/v1/menu')
        .send({
          id: 2,
          title: 'Menu goodis',
          mealsId: '1,2,3'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('meals').be.a('array');
          res.body.should.have.property('title').eql('Menu goodis');
          done();
        });
    });
  });
  describe('/POST api/v1/menu', () => {
    it('it should post a menu with an array of mealId', (done) => {
      chai.request(server)
        .post('/api/v1/menu')
        .send({
          id: 2,
          title: 'Menu goodis',
          mealsId: [1, 2, 3]
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('meals').be.a('array');
          res.body.should.have.property('title').eql('Menu goodis');
          done();
        });
    });
  });
  describe('/Get api/v1/menu', () => {
    it('it should get menu', (done) => {
      chai.request(server)
        .get('/api/v1/menu')
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('meals').be.a('array');
          res.body.should.have.property('title').eql('todays menu');
          done();
        });
    });
  });
});

describe('mocha testing of order models', () => {
  describe('/POST api/v1/orders', () => {
    it('it should not post an order without menuId', (done) => {
      chai.request(server)
        .post('/api/v1/orders')
        .send({
          id: 2,
          userId: 2,
          quantity: 2,
          mealsId: 2,
          status: 'pending'
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('string');
          res.body.should.be.eql('order fields are required');
          done();
        });
    });
  });
  describe('/POST api/v1/orders', () => {
    it('it should not post an order with empty menuId', (done) => {
      chai.request(server)
        .post('/api/v1/orders')
        .send({
          id: 2,
          userId: 2,
          quantity: 2,
          mealId: 1,
          menuId: 8,
          status: 'pending'
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('string');
          res.body.should.be.eql('your menu does not exist');
          done();
        });
    });
  });
  describe('/POST api/v1/orders', () => {
    it('it should not post an order with empty mealId', (done) => {
      chai.request(server)
        .post('/api/v1/orders')
        .send({
          id: 2,
          userId: 2,
          quantity: 2,
          mealId: 9,
          menuId: 1,
          status: 'pending'
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('string');
          res.body.should.be.eql('the meal does not exist in the menu');
          done();
        });
    });
  });
  describe('/POST api/v1/orders', () => {
    it('it should post an order', (done) => {
      chai.request(server)
        .post('/api/v1/orders')
        .send({
          id: 2,
          userId: 2,
          quantity: 2,
          mealId: 1,
          menuId: 1,
          status: 'pending'
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').be.eql('order created');
          done();
        });
    });
  });
  describe('/PUT api/v1/orders/:orderId', () => {
    it('it should not update order that does not exist', (done) => {
      chai.request(server)
        .put('/api/v1/orders/9')
        .send({
          quantity: 3,
          status: 'delivered',
          deliveryDate: '2018-04-17',
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('string');
          res.body.should.be.eql('order not found');
          done();
        });
    });
  });
  describe('/PUT api/v1/orders/:orderId', () => {
    it('it should update order', (done) => {
      chai.request(server)
        .put('/api/v1/orders/2')
        .send({
          quantity: 3,
          status: 'delivered',
          deliveryDate: '2018-04-17',
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').be.eql('successfuly updated');
          done();
        });
    });
  });
  describe('/PUT api/v1/orders/:orderId', () => {
    it('it should get all order', (done) => {
      chai.request(server)
        .get('/api/v1/orders')
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('array');
          done();
        });
    });
  });
});
