import chai from 'chai';
import Bootstrap from '../../app/server/Bootstrap';

const should = chai.should();
const server = new Bootstrap()._startExpress();

describe('Express server routing test.', () => {
    it('Should handle /api request.', (done) => {
        chai.request(server)
            .get('/api')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});