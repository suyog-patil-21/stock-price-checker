const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const UserLikeInfoService = require('../service/user-like-info.service')

chai.use(chaiHttp);

suite('Functional Tests', function () {
    const _userLikeInfoService = new UserLikeInfoService();

    after(async function () {
        await _userLikeInfoService.deleteAllUserLikeInfoCollection();
    });


    test('Viewing one stock: GET request to /api/stock-prices/', function () {
        chai.request(server).get('/api/stock-prices/').query({ stock: 'GOOG' }).end((err, res) => {
            chai.expect(res.status).to.be.equal(200);
            chai.expect(res.body).to.have.property('stockData');
            chai.expect(res.body.stockData).to.have.property('stock');
            chai.expect(res.body.stockData).to.have.property('price');
            chai.expect(res.body.stockData).to.have.property('likes');
            assert.isNumber(res.body.stockData.price);
            assert.isNumber(res.body.stockData.likes);
            chai.expect(res.body.stockData.stock).to.be.equal('GOOG');
        });
    });

    test('Viewing one stock and liking it: GET request to /api/stock-prices/', async function () {
        const initialLikes = await _userLikeInfoService.getStockLikeCount('GOOG');
        const res = await chai.request(server).get('/api/stock-prices/').query({ stock: 'GOOG', like: true });
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.have.property('stockData');
        chai.expect(res.body.stockData).to.have.property('stock');
        chai.expect(res.body.stockData).to.have.property('price');
        chai.expect(res.body.stockData).to.have.property('likes');
        assert.isNumber(res.body.stockData.price);
        assert.isNumber(res.body.stockData.likes);
        chai.expect(res.body.stockData.stock).to.be.equal('GOOG');
        chai.expect(res.body.stockData.likes).to.be.equal((initialLikes + 1));
    });

    test('Viewing the same stock and liking it again: GET request to /api/stock-prices/', async function () {
        const initialLikes = await _userLikeInfoService.getStockLikeCount('GOOG');
        const res = await chai.request(server).get('/api/stock-prices/').query({ stock: 'GOOG', like: true });
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.have.property('stockData');
        chai.expect(res.body.stockData).to.have.property('stock');
        chai.expect(res.body.stockData).to.have.property('price');
        chai.expect(res.body.stockData).to.have.property('likes');
        assert.isNumber(res.body.stockData.price);
        assert.isNumber(res.body.stockData.likes);
        chai.expect(res.body.stockData.stock).to.be.equal('GOOG');
        chai.expect(res.body.stockData.likes).to.be.equal(initialLikes);
    });

    test('Viewing two stocks: GET request to /api/stock-prices/', function () {
        chai.request(server).get('/api/stock-prices/').query({ stock: ['MSFT', 'TSLA'] }).end((err, res) => {
            chai.expect(res.status).to.be.equal(200);
            chai.expect(res.body).to.have.property('stockData');
            assert.isArray(res.body.stockData);
            chai.expect(res.body.stockData.length).to.be.equal(2);

            chai.expect(res.body.stockData[0]).to.have.property('stock');
            chai.expect(res.body.stockData[0]).to.have.property('price');
            chai.expect(res.body.stockData[0]).to.have.property('rel_likes');
            assert.isNumber(res.body.stockData[0].price);
            assert.isNumber(res.body.stockData[0].rel_likes);
            chai.expect(res.body.stockData[0].stock).to.be.equal('MSFT');

            chai.expect(res.body.stockData[1]).to.have.property('stock');
            chai.expect(res.body.stockData[1]).to.have.property('price');
            chai.expect(res.body.stockData[1]).to.have.property('rel_likes');
            assert.isNumber(res.body.stockData[1].price);
            assert.isNumber(res.body.stockData[1].rel_likes);
            chai.expect(res.body.stockData[1].stock).to.be.equal('TSLA');
        });
    });

    test('Viewing two stocks and liking them: GET request to /api/stock-prices/', async function () {
        const initialStock0Likes = await _userLikeInfoService.getStockLikeCount('MSFT');
        const initialStock1Likes = await _userLikeInfoService.getStockLikeCount('TSLA');

        const res = await chai.request(server).get('/api/stock-prices/').query({ stock: ['MSFT', 'TSLA'], like: true });
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.have.property('stockData');
        assert.isArray(res.body.stockData);
        chai.expect(res.body.stockData.length).to.be.equal(2);

        chai.expect(res.body.stockData[0]).to.have.property('stock');
        chai.expect(res.body.stockData[0]).to.have.property('price');
        chai.expect(res.body.stockData[0]).to.have.property('rel_likes');
        assert.isNumber(res.body.stockData[0].price);
        assert.isNumber(res.body.stockData[0].rel_likes);
        chai.expect(res.body.stockData[0].stock).to.be.equal('MSFT');
        chai.expect(res.body.stockData[0].rel_likes).to.be.equal(initialStock0Likes - initialStock1Likes);

        chai.expect(res.body.stockData[1]).to.have.property('stock');
        chai.expect(res.body.stockData[1]).to.have.property('price');
        chai.expect(res.body.stockData[1]).to.have.property('rel_likes');
        assert.isNumber(res.body.stockData[1].price);
        assert.isNumber(res.body.stockData[1].rel_likes);
        chai.expect(res.body.stockData[1].stock).to.be.equal('TSLA');
        chai.expect(res.body.stockData[1].rel_likes).to.be.equal(initialStock1Likes - initialStock0Likes);
    });

});
