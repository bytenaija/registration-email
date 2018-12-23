'use strict';

let app = require('../app'),
  chai = require('chai'),
  request = require('supertest');

  let expect = chai.expect;
  const userCredentials = {
    email: 'everistusolumese@gmail.com', 
    password: 'skywalk',
    role: 'admin'
  }

  const activatedAccount = {
    email: 'baberuth@gmail.com',
    password: 'baseball'
  }
  describe('Authentication API Integration Tests', function() {
    describe('#Login User /login', function() { 
      this.timeout(0);
        it('should fail to login since no credentials exists in the database', function(done) { 
          request(app)
          .post('/login')
          .send(userCredentials)
          .end(function(err, response){
            // console.log(response.text)
            expect(response.statusCode).to.equal(401);
            expect(JSON.parse(response.text).message).to.equal('Invalid credentials');
              done(); 
            }); 
        });
      });

let registerCred = userCredentials;
registerCred.email = registerCred.email  + Math.random().toString(36).replace(/[^a-z]+/g, '')
// console.log(registerCred.email)
      describe('#Register a User /register', function() { 
        this.timeout(0);
          it('should successfully register a new user', function(done) { 
            request(app)
            .post('/register')
            .send(registerCred)
            .end(function(err, response){
              // console.log(response.text)
              expect(response.statusCode).to.equal(200);
              expect(JSON.parse(response.text).message).to.equal('An account activation link has been sent to your email address. Kindly activate your account.');
                done(); 
              }); 
          });
        });

        describe('#Login a User /login', function() { 
          this.timeout(0);
            it('should fail to login an account that has not been activated', function(done) { 
              request(app)
              .post('/login')
              .send(userCredentials)
              .end(function(err, response){
                // console.log(response.text)
                expect(response.statusCode).to.equal(401);
                expect(JSON.parse(response.text).message).to.equal('You must activate your account before login.');
                  done(); 
                }); 
            });
          });

          describe('#Login a User /login', function() { 
            this.timeout(0);
              it('should log in with an activated account', function(done) { 
                request(app)
                .post('/login')
                .send(activatedAccount)
                .end(function(err, response){
                  // console.log(response.text)
                  expect(response.statusCode).to.equal(200);
                  expect(JSON.parse(response.text).success).to.equal(true);
                    done(); 
                  }); 
              });
            });

          describe('#Get Users /users', function() { 
            this.timeout(0);
              it('should fail to access resources when an authorization header is not sent with the request', function(done) { 
                request(app)
                .get('/users')
                .end(function(err, response){
                  // console.log(response.text)
                  expect(response.statusCode).to.equal(401);
                  expect(JSON.parse(response.text).message).to.equal('You must be logged in to view this resource.');
                    done(); 
                  }); 
              });
            });


            describe('#Get Users /users with user role', function() { 
              this.timeout(0);
                it('should return only resources that is accessible to a user with user role', function(done) { 
                  request(app)
                  .get('/users')
                  .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjdGl2YXRlZCI6dHJ1ZSwiX2lkIjoiNWMxZjU2NjUxNDc5NGI1ODA4MWFmOGZlIiwiZW1haWwiOiJiYWJlcnV0aEBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRycXZYbU9tVDhnOUxtMVRjNDl0UW91T2lqZE5pS1Q1Z3lVdnVRUi5YNlg2bk03dXFMUVkuRyIsInJvbGUiOiJ1c2VyIiwiX192IjowfSwiaWF0IjoxNTQ1NTU4MjczfQ.4O8gslohMjhIE_a3MsmUV6Z-NpUU9ehh_rePqeVvpik')
                  .end(function(err, response){
                    // console.log(response.text)
                    expect(response.statusCode).to.equal(200);
                    expect(JSON.parse(response.text).message).to.equal('You are an an not admin user.You do not have authorisation to view all users.');
                      done(); 
                    }); 
                });
              });

              describe('#Get Users /users with admin role', function() { 
                this.timeout(0);
                  it('should return only resources that is accessible to a user with admin role', function(done) { 
                    request(app)
                    .get('/users')
                    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjdGl2YXRlZCI6dHJ1ZSwiX2lkIjoiNWMxZjU4NzM3MWNlYWQ1YTljOGQxNDg3IiwiZW1haWwiOiJiYWJlcnV0aDJAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkLlpyNzdUNjJJUmFuT01ocHhMSVluLnpGcVlhaThiQ3N6MG9MTllCczF4SmZjU1ZrSkY1WG0iLCJyb2xlIjoiYWRtaW4iLCJfX3YiOjB9LCJpYXQiOjE1NDU1NTg3NDJ9.25U2kLQBGbDXeQpCz6Pgn4KNXlfXRJBGB7BxKTM2jY0')
                    .end(function(err, response){
                      // console.log(response.text)
                      expect(response.statusCode).to.equal(200);
                      expect(JSON.parse(response.text).message).to.equal('You are an an admin user and therefore can view all the users');
                        done(); 
                      }); 
                  });
                });
});

