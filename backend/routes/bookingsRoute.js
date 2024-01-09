const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingsModel");
const Bus = require("../models/busModel");
const stripe = require("stripe")(process.env.stripe_secret_key);
const { v4: uuidv4 } = require("uuid");
const authMiddleware = require("../middlewares/authMiddleware");

// Book a seat
router.post("/book-seat", authMiddleware, async (req, res) => {
  try {
    const newBooking = new Booking({
      ...req.body,
      user: req.body.userId,
    });
    await newBooking.save();
    const bus = await Bus.findById(req.body.bus);
    bus.seatsBooked = [...bus.seatsBooked, ...req.body.seats];
    await bus.save();
    res.status(200).send({
      message: "Booking successful",
      data: newBooking,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "Booking failed",
      data: error,
      success: false,
    });
  }
});

// Make payment
router.post("/make-payment", authMiddleware, async (req, res) => {
  try {
    const { token, amount } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.paymentIntents.create(
      {
        amount: amount,
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

   // console.log("payment", payment);

    if (payment) {
      res.status(200).send({
        message: "Payment successful",
        data: {
          transactionId: payment.id,
        },
        success: true,
      });
    } else {
      res.status(500).send({
        message: "Payment failed",
        data: error,
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Payment failed",
      data: error,
      success: false,
    });
  }
});

// Get bookings by user ID
router.post("/get-bookings-by-user-id", authMiddleware, async (req, res) => {
  try {
        const bookings = await Booking.find({ user: req.body.userId })
          .populate("bus")
          .populate("user");
        res.status(200).send({
          message: "Bookings fetched successfully",
          data: bookings,
          success: true,
        });
      } catch (error) {
        res.status(500).send({
          message: "Bookings fetch failed",
          data: error,
          success: false,
        });
      }
});

// Get all bookings
router.post("/get-all-bookings", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find().populate("bus").populate("user");
    res.status(200).send({
      message: "Bookings fetched successfully",
      data: bookings,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "Bookings fetch failed",
      data: error,
      success: false,
    });
  }
});

module.exports = router;
