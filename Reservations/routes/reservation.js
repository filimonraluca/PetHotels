const express = require("express");
const {
  getAllReservations,
  getReservation,
  createReservation,
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

router.post("/", async function (req, res) {
  const result = await createReservation(req.body);
  const statusCode = result.success
    ? statusCodes.CREATED
    : statusCodes.BAD_REQUEST;

  res.status(statusCode).json(result);
});

// router.patch("/:idReservation", async function (req, res) {
//   const result = await reservationService.update(
//     req.params.idReservation,
//     req.body
//   );
//   const statusCode = result.success
//     ? statusCodes.ACCEPTED
//     : statusCodes.BAD_REQUEST;

//   res.status(statusCode).json(result);
// });

// router.delete("/all", async (req, res) => {
//   const result = await reservationService.deleteAll();
//   const statusCode = result.success
//     ? statusCodes.NO_CONTENT
//     : statusCodes.BAD_REQUEST;

//   res.status(statusCode).json(result);
// });

// router.delete("/:idReservation", async (req, res) => {
//   const result = await reservationService.deleteReservation(
//     req.params.idReservation
//   );
//   const statusCode = result.success
//     ? statusCodes.NO_CONTENT
//     : statusCodes.BAD_REQUEST;

//   res.status(statusCode).json(result);
// });
module.exports = router;
