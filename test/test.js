let mongoose = require("mongoose");
let Todo = require("../src/models/todoModel");
const {INVALID_TEST_TOKEN, TEST_TOKEN} = require("../src/core/config");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
const { describe } = require("mocha");
let should = chai.should();

chai.use(chaiHttp);
let id = ''
describe('Todo', () => {
  describe('/Create Todo', () => {
    it('it should not create new todo if no token', (done) => {
        let todo = {
          thingsTodo:"Sleep",
          name:"work",
          time:"2022-02-4"
      }
      chai.request(server)
          .post('/todos')
          .send(todo)
          .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.status.should.be.a('string').eql('error');
                res.body.message.should.be.a('string').eql('Authentication Failed. Please login');
            done();
          });
    });
  })

  describe('/Create Todo', () => {
    it('it should not create new todo if token is invalid', (done) => {
        let todo = {
          thingsTodo:"Sleep",
          name:"work",
          time:"2022-02-4"
      }
      chai.request(server)
          .post('/todos')
          .set("Authorization", "Bearer " + INVALID_TEST_TOKEN)
          .send(todo)
          .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.status.should.be.a('string').eql('error');
                res.body.message.should.be.a('string').eql('invalid signature');
            done();
          });
    });
  }) 

  describe('/Create Todo', ()  => {
    it('it should create new todo', (done) => {
        let todo = {
          thingsTodo:"Sleep",
          name:"work",
          time:"2022-02-4"
      }
      chai.request(server)
          .post('/todos')
          .set("Authorization", "Bearer " + TEST_TOKEN)
          .send(todo)
          .end((err, res) => {
                id = res.body.data.todo._id
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.message.should.be.a('string').eql('success');
                res.body.data.todo.thingsTodo.should.be.a('string').eql('Sleep');
                res.body.data.todo.name.should.be.a('string').eql('work');
                res.body.data.todo.time.should.be.a('string').eql('2022-02-03T23:00:00.000Z');
            done();
          });
    });
  })
  // get all todos
  describe('/GET todos', () => {
    it('it should get all user todos', (done) => {
      chai.request(server)
          .get('/todos')
          .set({ "Authorization": `Bearer ${TEST_TOKEN}` })
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.message.should.be.a('string').eql('success');
                res.body.data.todos.should.be.a('array');
            done();
          });
    });
  })
  // get todo by id
  describe('/GET todo by id', () => {
    it('it should get todo by id', (done) => {
      chai.request(
        server
      )
        .get('/todo/' + id)
        .set({ "Authorization": `Bearer ${TEST_TOKEN}` })
        .end((err, res) => {
          res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.message.should.be.a('string').eql('success');
                res.body.data.todo.thingsTodo.should.be.a('string').eql('Sleep');
                res.body.data.todo.name.should.be.a('string').eql('work');
                res.body.data.todo.time.should.be.a('string').eql('2022-02-03T23:00:00.000Z');
            done();
        });
    });
  });
  // update todo by id
  describe('/PUT todo by id', () => {
    it('it should update todo by id', (done) => {
      let update = {
        thingsTodo:"Wake",
        name:"Love",
        time:"2022-05-10"
    }
      chai.request(
        server
      )
        .put('/todo/' + id)
        .set({ "Authorization": `Bearer ${TEST_TOKEN}` })
        .send(update)
        .end((err, res) => {
          res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.message.should.be.a('string').eql('success');
                res.body.data.todo.thingsTodo.should.be.a('string').eql('Wake');
                res.body.data.todo.name.should.be.a('string').eql('Love');
                res.body.data.todo.time.should.be.a('string');
            done();
        });
    });
  });
  // delete todo by id
  describe('/DELETE todo by id', () => {
    it('it should delete todo by id', (done) => {
      chai.request( 
        server
      )
        .delete('/todo/' + id)
        .set({ "Authorization": `Bearer ${TEST_TOKEN}` })
        .end((err, res) => {
          res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.message.should.be.a('string').eql('success');
                res.body.data.todo.thingsTodo.should.be.a('string').eql('Wake');
                res.body.data.todo.name.should.be.a('string').eql('Love');
                res.body.data.todo.time.should.be.a('string');
            done();
        });
    });
  });
  after(function(done) {
    Todo.deleteMany({}, function(err) {
        if (err) {
            console.log(err);
        }
        done();
    });
}
);
})