import { app, request, expect } from './config/helpers';

describe('Testes de Integração', () => {

    describe('GET /home', () => {
        it('Deve retornar status code igual a 200', done => {
            request(app)
                .get('/home')
                .end((error, res) => {
                    expect(res.status).to.equal(200);
                });
        });
    });

    describe('POST /auth/login', () => {
        it('Deve adicionar um usuário', done => {
            request(app)
            .post('/auth/login')
            .send({ user: "renan", pass: "123" })
            .end((error, res) => {
                expect(res.status).to.equal(200);
            })
        });
    });

    describe('POST /auth/register', () => {
        it('Deve registrar um usuario', done => {

        });
    });


});