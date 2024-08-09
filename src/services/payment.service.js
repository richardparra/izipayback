const axios = require('axios').default;
const Hex = require("crypto-js/enc-hex");
const hmacSHA256 = require('crypto-js/hmac-sha256')
const { config } = require('../helpers/config');

const { ID_TIENDA, PASSWORD, CLAVE_HMAC_SHA_256 } = config();

const createFormToken = async (paymentConf) => {
    console.log("tienda:"+ID_TIENDA);
    const createPaymentEndPoint = `https://${ID_TIENDA}:${PASSWORD}@api.micuentaweb.pe/api-payment/V4/Charge/CreatePayment`;
    //const createPaymentEndPoint = `https://${ID_TIENDA}:${PASSWORD}@sandbox-checkout.izipay.pe/apidemo/v1/Token/Generate`;
    try {
        const response = await axios.post(createPaymentEndPoint, paymentConf, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}



const checkHash = (answer, hash, hashKey) => {
    let key = '';
    if (hashKey === "sha256_hmac") {
        key = CLAVE_HMAC_SHA_256;
    } else if (hashKey === "password") {
        key = PASSWORD;
    }
    const answerHash = Hex.stringify(hmacSHA256(JSON.stringify(answer), key));
    return hash === answerHash;
};

const token2Service = async (body, transactionid) => {
    console.log("tienda:"+ID_TIENDA);
    //const createPaymentEndPoint = `https://testapi-pw.izipay.pe/security/v1/Token/Generate`;
    const createPaymentEndPoint = `https://sandbox-api-pw.izipay.pe/security/v1/Token/Generate`;
    //const createPaymentEndPoint = `https://${ID_TIENDA}:${PASSWORD}@sandbox-checkout.izipay.pe/apidemo/v1/Token/Generate`;
    try {
        const response = await axios.post(createPaymentEndPoint, body, {
            headers: { 'Content-Type': 'application/json','transactionId': transactionid }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

module.exports = { createFormToken, checkHash, token2Service };