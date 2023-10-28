const {createFormToken, checkHash} = require("../services/payment.service");

const createPayment = async  (req, res) => {
  const {} = req.body;
  const paymentConf = {
    amount: 10 * 100,
    currency: "PEN",
    customer: {
      reference: "clienteId-12345",
      email: "example@gmail.com",
    },
    orderId: `order-${ new Date().getTime() }`
  }
  try {
    const response = await createFormToken(paymentConf);
    if( response.status !== "SUCCESS") return res.status(400).json(response);
    else res.status(200).json(response.answer);
     
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }

};

const validatePayment = (req, res) => {
  const { clientAnswer, hash, hashKey } = req.body;

  if( !checkHash(clientAnswer, hash, hashKey) ) return res.status(400).json({result:"Payment hash mismatch!"});
  res.status(200).json({result:"Payment Success!"});
};

const notificationIPN = (req, res) => {
  const paymentDataIPN = req.body;
  console.log("IPN:", paymentDataIPN);
  /* Retrieve the IPN content */
  const formAnswer = paymentDataIPN["kr-answer"];
  const hash = paymentDataIPN["kr-hash"];
  const hashKey = paymentDataIPN["kr-hash-key"];

  /* Check the signature using password */
  if( !checkHash(formAnswer, hash, hashKey) ) {
    return res.status(400).send("Payment hash mismatch!");
  }

  /* Retrieve the transaction id from the IPN data */
  const transaction = formAnswer.transactions[0];

  /* get some parameters from the answer */
  const orderStatus = formAnswer.orderStatus;
  const orderId = formAnswer.orderDetails.orderId;
  const transactionUUID = transaction.uuid;
   
  if (orderStatus === "PAID"){
    /* I update my database if needed */
    /* Add here your custom code */

  }

  /**
 * Message returned to the IPN caller
 * You can return want you want but
 * HTTP response code should be 200
 */
  res.status(200).send(`OK! OrderStatus is ${orderStatus}`)
}

module.exports = { createPayment, validatePayment, notificationIPN };
 