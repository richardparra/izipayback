const express = require("express");
const router = express.Router();

const {
  createPayment,
  validatePayment,
  notificationIPN,
  token,
  token2,
} = require("../controllers/payment.controller");

router.post("/createPayment", createPayment);
router.post("/validatePayment", validatePayment);
router.post("/ipn", notificationIPN);
router.post("/token", token);
router.post("/token2", token2);

module.exports = { paymentRouter: router };