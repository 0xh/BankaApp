import chai from 'chai';
import chaiHttp from 'chai-http';
import assertArrays from 'chai-arrays';
import server from '../app/app';

const { expect } = chai;
chai.use(chaiHttp);
chai.use(assertArrays);

describe('USER TEST   overAll test', () => {

    const userItems = {

        UserSignUp: {
            firstName: 'Adeyemi',
            lastName: 'adekorede',
            email: 'yemkoh@hotmail.com',
            password: 'korey',
            Type: 'client',
            isAdmin: false,
        },
        userLogin: {
            email: 'kaytronics@gmail.com',
            password: 'korey',
        },
        wrongpasswordLogin: {
            email: ' khord4eng@gmail.com',
            password: 'koreyttt',
        },
        UserwrongSignUp1: {
            firstName: 'Adeyemi',
            lastName: 'adekorede',
            password: 'korey',
            Type: 'staff',      //missing email
            isAdmin: false,
        },
        UserwrongSignUp2: {
            firstName: 'Adeyemi',
            lastName: 'adekorede',
            email: 'yemmo@hotmail.com',
            password: 'korey',
            Type: 'savings',     //type incorrect
            isAdmin: false,
        },
        nonexistLogin: {
            email: 'aa@hotmail.com',
            password: 'korey',
        },
    };
    describe('SIGN-UP USER>> POST ', () => {
        it('its expected to sign-up a User', (done) => {
            chai.request(server)
                .post('/api/v1/auth/signup')
                .send(userItems.UserSignUp)
                .end((err, res) => {
                    expect(res, 'must have a status 200 ok').to.have.status(201);
                    expect(res.body.Data).to.be.a('object');
                    expect(res.body.Data).to.have.property('firstname');
                    expect(res.body.Data).to.have.property('lastname');
                    expect(res.body.Data).to.have.property('email');
                    expect(res.body.Data).to.have.property('id');
                    expect(res.body.Data).to.have.property('email');
                    done();
                });
        });
    });
    describe('SIGN-UP USER ALREADY EXIST >> POST ', () => {
        it('its expected not to sign-up a User', (done) => {
            chai.request(server)
                .post('/api/v1/auth/signup')
                .send(userItems.UserSignUp)
                .end((err, res) => {
                    expect(res, 'must have a status 422 ok').to.have.status(422);
                    done();
                });
        });

    });

    describe('SIGN-UP FAIL INPUT VALIDATION', () => {
        it('its expected to throw error on failed input validation', (done) => {
            chai.request(server)
                .post('/api/v1/auth/signup')
                .send(userItems.UserwrongSignUp1)
                .end((err, res) => {
                    expect(res, 'must have status 400').to.have.status(400);
                    expect(res.body).to.be.array();
                    done();
                });
        });
    })

    describe('SIGN-UP FAIL DUE TO DB CONSTRAINTS', () => {
        it('its expected to throw error on failed input validation', (done) => {
            chai.request(server)
                .post('/api/v1/auth/signup')
                .send(userItems.UserwrongSignUp2)
                .end((err, res) => {
                    expect(res, 'must have status 400').to.have.status(400);
                    done();
                });
        });
    })

    describe('SIGN-IN USER>> POST', () => {
        it('its expected to sign-in an existing User', (done) => {
            chai.request(server)
                .post('/api/v1/auth/signin')
                .send(userItems.userLogin)
                .end((err, res) => {
                    expect(res, 'must have a status 200 ok').to.have.status(200);
                    expect(res.body.Data).to.be.a('object');
                    expect(res.body.Data).to.have.property('firstname');
                    expect(res.body.Data).to.have.property('lastname');
                    expect(res.body.Data).to.have.property('email');
                    expect(res.body.Data).to.have.property('token').to.be.a('string');
                    done();
                });
        });
    });

    describe('SIGN IN USER DOOESNT  EXIST>> POST', () => {
        it('its expected not to sign-In a User that doesnt exist', (done) => {
            chai.request(server)
                .post('/api/v1/auth/signin')
                .send(userItems.nonexistLogin)
                .end((err, res) => {
                    expect(res, 'must have a status 404 not found').to.have.status(404);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('msg');
                    expect(res.body).to.have.property('status');
                    done();
                });
        });
    });
});
