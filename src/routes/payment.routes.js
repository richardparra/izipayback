const express = require("express");
const router = express.Router();

const {
  createPayment,
  validatePayment,
  notificationIPN
} = require("../controllers/payment.controller");

router.post("/createPayment", createPayment);
router.post("/validatePayment", validatePayment);
router.post("/ipn", notificationIPN);

module.exports = { paymentRouter: router };