const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const UserLikeInfoService = require('../service/user-like-info.service')

chai.use(chaiHttp);

suite('Functional Tests', function () {

    this.afterEach(async function () {
        const response = chai.request(server).get('/api/stock-prices/').query({ stock: 'GOOG' });
        const _userLikeInfoService = new UserLikeInfoService();
        await _userLikeInfoService.deleteAllUserLikeInfoByIpHash(response.req.ip);
    });

    it('Viewing one stock: GET request to /api/stock-prices/', function () {
        chai.request(server).get('/api/stock-prices/').query({ stock: 'GOOG' }).end((err, res) => {
            chai.expect(res.body).to.have.property('stockData');
            chai.expect(res.body.stockData).to.have.property('stock');
            chai.expect(res.body.stockData).to.have.property('price');
            chai.expect(res.body.stockData).to.have.property('likes');
            assert.isNumber(res.body.stockData.price);
            assert.isNumber(res.body.stockData.likes);
            chai.expect(res.body.stockData.stock).to.be.equal('GOOG');
        });
    });

    it('Viewing one stock and liking it: GET request to /api/stock-prices/', async function () {
        const response = await chai.request(server).get('/api/stock-prices/').query({ stock: 'GOOG' });
        const likes = response.body.stockData.likes;

        const res = await chai.request(server).get('/api/stock-prices/').query({ stock: 'GOOG', like: true });
        chai.expect(res.body).to.have.property('stockData');
        chai.expect(res.body.stockData).to.have.property('stock');
        chai.expect(res.body.stockData).to.have.property('price');
        chai.expect(res.body.stockData).to.have.property('likes');
        assert.isNumber(res.body.stockData.price);
        assert.isNumber(res.body.stockData.likes);
        chai.expect(res.body.stockData.stock).to.be.equal('GOOG');
        chai.expect(res.body.stockData.likes).to.be.equal(likes + 1);
        return;
    });

    it('Viewing the same stock and liking it again: GET request to /api/stock-prices/', async function () {
        const response = await chai.request(server).get('/api/stock-prices/').query({ stock: 'GOOG' });
        const initialLikes = response.body.stockData.likes;

        const res = await chai.request(server).get('/api/stock-prices/').query({ stock: 'GOOG', like: true });
        chai.expect(res.body).to.have.property('stockData');
        chai.expect(res.body.stockData).to.have.property('stock');
        chai.expect(res.body.stockData).to.have.property('price');
        chai.expect(res.body.stockData).to.have.property('likes');
        assert.isNumber(res.body.stockData.price);
        assert.isNumber(res.body.stockData.likes);
        chai.expect(res.body.stockData.stock).to.be.equal('GOOG');
        chai.expect(res.body.stockData.likes).to.be.equal(initialLikes);
    });

    it('Viewing two stocks: GET request to /api/stock-prices/', function () {
        chai.request(server).get('/api/stock-prices/').query({ stock: ['GOOG', 'TSLA'] }).end((err, res) => {
            chai.expect(res.body).to.have.property('stockData');
            assert.isArray(res.body.stockData);
            chai.expect(res.body.stockData.length).to.be.equal(2);

            chai.expect(res.body.stockData[0]).to.have.property('stock');
            chai.expect(res.body.stockData[0]).to.have.property('price');
            chai.expect(res.body.stockData[0]).to.have.property('rel_likes');
            assert.isNumber(res.body.stockData[0].price);
            assert.isNumber(res.body.stockData[0].rel_likes);
            chai.expect(res.body.stockData[0].stock).to.be.equal('GOOG');

            chai.expect(res.body.stockData[1]).to.have.property('stock');
            chai.expect(res.body.stockData[1]).to.have.property('price');
            chai.expect(res.body.stockData[1]).to.have.property('rel_likes');
            assert.isNumber(res.body.stockData[1].price);
            assert.isNumber(res.body.stockData[1].rel_likes);
            chai.expect(res.body.stockData[1].stock).to.be.equal('TSLA');
        });
    });

    it('Viewing two stocks and liking them: GET request to /api/stock-prices/', async function () {
        const res = await chai.request(server).get('/api/stock-prices/').query({ stock: ['GOOG', 'TSLA'], like: true });
        chai.expect(res.body).to.have.property('stockData');
        assert.isArray(res.body.stockData);
        chai.expect(res.body.stockData.length).to.be.equal(2);

        chai.expect(res.body.stockData[0]).to.have.property('stock');
        chai.expect(res.body.stockData[0]).to.have.property('price');
        chai.expect(res.body.stockData[0]).to.have.property('rel_likes');
        assert.isNumber(res.body.stockData[0].price);
        assert.isNumber(res.body.stockData[0].rel_likes);
        chai.expect(res.body.stockData[0].stock).to.be.equal('GOOG');

        chai.expect(res.body.stockData[1]).to.have.property('stock');
        chai.expect(res.body.stockData[1]).to.have.property('price');
        chai.expect(res.body.stockData[1]).to.have.property('rel_likes');
        assert.isNumber(res.body.stockData[1].price);
        assert.isNumber(res.body.stockData[1].rel_likes);
        chai.expect(res.body.stockData[1].stock).to.be.equal('TSLA');
    });

});
