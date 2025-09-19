const { expect } = require('chai')
const userController = require('../src/controllers/user')
const db = require('../src/dbClient')

describe('User', () => {
  
  beforeEach(() => {
  
    db.flushdb()
  })

  describe('Create', () => {

    it('create a new user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')
        done()
      })
    })

    it('passing wrong user parameters', (done) => {
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })

    
    it('avoid creating an existing user', (done)=> {
      const user = {
        username: 'existinguser',
        firstname: 'Exist',
        lastname: 'User'
      }

      
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')

      
        userController.create(user, (err2, result2) => {
          expect(err2).to.not.be.equal(null)
          expect(result2).to.be.equal(null)
          done()
        })
      })
    })
  })

  describe('Get', ()=> {

    it('get a user by username', (done) => {
      const user = {
        username: 'getuser',
        firstname: 'Get',
        lastname: 'User'
      }


      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')

        userController.get(user.username, (err2, obj) => {
          expect(err2).to.be.equal(null)
          expect(obj).to.be.an('object')
          expect(obj.username).to.equal(user.username)
          expect(obj.firstname).to.equal(user.firstname)
          expect(obj.lastname).to.equal(user.lastname)
          done()
        })
      })
    })
    it('cannot get a user when it does not exist', (done) => {
      userController.get('this_user_does_not_exist', (err, obj) => {
        expect(err).to.not.be.equal(null)
        expect(obj).to.be.equal(null)
        done()
      })
    })

  })
})
