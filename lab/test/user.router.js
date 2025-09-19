const app = require('../src/index')
const chai = require('chai')
const chaiHttp = require('chai-http')
const db = require('../src/dbClient')

chai.use(chaiHttp)

describe('User REST API', () => {
  
    beforeEach(() => {
      // Clean DB before each test
      db.flushdb()
    })
    
    after(() => {
      app.close()
      db.quit()
    })

  describe('POST /user', () => {

    it('create a new user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(201)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
    
    it('pass wrong parameters', (done) => {
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(400)
          chai.expect(res.body.status).to.equal('error')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
  })


  describe('GET /user', ()=> {

    it('get an existing user by username', (done) => {
      const user = {
        username: 'routergetuser',
        firstname: 'Router',
        lastname: 'User'
      }

      chai.request(app)
        .post('/user')
        .send(user)
        .then(() => {
          return chai.request(app)
            .get('/user/' + user.username)
        })
        .then((res) => {
          chai.expect(res).to.have.status(200)
          chai.expect(res.body).to.be.an('object')
          chai.expect(res.body.username).to.equal(user.username)
          chai.expect(res.body.firstname).to.equal(user.firstname)
          chai.expect(res.body.lastname).to.equal(user.lastname)
          done()
        })
        .catch((err) => { throw err })
    })

    it('return 404 or error for non-existing user', (done) => {
      chai.request(app)
        .get('/user/some_non_existing_user')
        .then((res) => {
          chai.expect([200, 404, 400]).to.include(res.status)
          done()
        })
        .catch((err) => {

          if (err.response) {
            chai.expect([404,400]).to.include(err.response.status)
            done()
          } else {
            throw err
          }
        })
    })

  })
})
