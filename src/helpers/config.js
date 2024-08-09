const dotenv = require("dotenv");
dotenv.config();

module.exports = { 
    config : () => {
        const MODE = process.env.MODE != 'PROD' ? true : false;
        console.log("MODE:"+MODE);
        console.log("process.env.ID_TIENDA:"+process.env.ID_TIENDA);
        return {
            MODE: process.env.MODE,
            ID_TIENDA: process.env.ID_TIENDA,
            CLAVE: MODE ? process.env.CLAVE_TEST : process.env.CLAVE_PRODUCCION,
            PASSWORD: MODE ? process.env.PASSWORD_TEST : process.env.PASSWORD_PRODUCCION,
            PUBLIC_KEY: MODE ? process.env.PUBLIC_KEY_TEST : process.env.PUBLIC_KEY_PRODUCCION,
            CLAVE_HMAC_SHA_256: MODE ? process.env.CLAVE_HMAC_SHA_256_TEST : process.env.CLAVE_HMAC_SHA_256_PRODUCCION,
        }
    }
}