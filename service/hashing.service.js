const bcrypt = require('bcrypt');

const SALTROUNDS = 12;

module.exports = class HashingService {

    static async getHash(plainData) {
        try {
            const salt = await bcrypt.genSalt(SALTROUNDS);
            const hash = await bcrypt.hash(plainData, salt);
            return hash;
        }
        catch (err) {
            console.log(`Error in HashingService.getHash(): \n${err}`);
        }
    }

    static async compareHash(hash,plainData){
        try {
            return bcrypt.compare(plainData,hash);
        }
        catch (err) {
            console.log(`Error in HashingService.compareHash(): \n${err}`);
        }   
    }
}