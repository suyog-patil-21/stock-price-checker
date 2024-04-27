var SHA256 = require("crypto-js/sha256");

const secretPhrase = process.env.SECRET_PHRASE; 

module.exports = class HashingService {

    static async getHash(plainData) {
        try {
            const hash = SHA256(secretPhrase + plainData);
            return hash;
        }
        catch (err) {
            console.log(`Error in HashingService.getHash(): \n${err}`);
        }
    }
}