import express from "express";
import {
  getShirts,
  getShirtsById,
  createShirts,
  updateShirts,
  deleteShirts,
} from "../controller/ShirtController.js";

const router = express.Router();

router.get('/shirts', getShirts);
router.get('/shirts/:id', getShirtsById);
router.post('/shirts', createShirts);
router.patch('/shirts/:id', updateShirts);
router.delete('/shirts/:id', deleteShirts);


export default router;