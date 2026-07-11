import express from 'express';
const router = express.Router();
import { getAllMedicines, getMedicineById } from '../controllers/medicineController.js';

router.get('/', getAllMedicines);
router.get('/:id', getMedicineById);

export default router;