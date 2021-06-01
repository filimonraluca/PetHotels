const express = require("express");
const {
  getAllReservations,
  getReservation,
  getReservationByUser,
  getReservationByHotel,
  createReservation,
  updateReservation,
  deleteReservation,
} = require("../services/ReservationService");
const statusCodes = require("../config/configurations").statusCodes;

const router = express.Router();

router.get("/", async (req, res) => {
  const result = await getAllReservations();
  const statusCode = result.success ? statusCodes.OK : statusCodes.BAD_REQUEST;

  res.status(statusCode).json(result);
});

router.get("/:idReservation", async (req, res) => {
  const result = await getReservation(req.params.idReservation);
  const statusCode = result.success ? statusCodes.OK : statusCodes.BAD_REQUEST;

  res.status(statusCode).json(result);
});

router.get("/user/:idUser", async (req, res) => {
  const result = await getReservationByUser(req.params.idUser);
  const statusCode = result.success ? statusCodes.OK : statusCodes.BAD_REQUEST;

  res.status(statusCode).json(result);
});

router.get("/hotel/:idHotel", async (req, res) => {
  const result = await getReservationByHotel(req.params.idHotel);
  const statusCode = result.success ? statusCodes.OK : statusCodes.BAD_REQUEST;

  res.status(statusCode).json(result);
});

router.post("/", async function (req, res) {
  const result = await createReservation(req.body);
  const statusCode = result.success
    ? statusCodes.CREATED
    : statusCodes.BAD_REQUEST;

  res.status(statusCode).json(result);
});

router.put("/:idReservation", async function (req, res) {
  const result = await updateReservation(req.params.idReservation, req.body);
  const statusCode = result.success
    ? statusCodes.NO_CONTENT
    : statusCodes.BAD_REQUEST;

  res.status(statusCode).json(result);
});

router.delete("/:idReservation", async (req, res) => {
  const result = await deleteReservation(req.params.idReservation);
  const statusCode = result.success
    ? statusCodes.NO_CONTENT
    : statusCodes.BAD_REQUEST;

  res.status(statusCode).json(result);
});

module.exports = router;
