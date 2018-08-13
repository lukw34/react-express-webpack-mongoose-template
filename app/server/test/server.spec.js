const app = require('../Bootstrap');

let server;

describe('Express server routing test.', () => {
    before(async() => {
        server = await app.run();
    });

    after(async() => {
        await server.close();
    });

    it('Should handle /api request.', done => {
        chai.request(server)
            .get('/api')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
});