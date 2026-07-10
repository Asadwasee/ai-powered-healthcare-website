import express from 'express';
import {
    createContact,
    getContacts,
    getContactById,
    updateContact,
    deleteContact
} from '../controllers/emergencyController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.post('/addemergency', createContact);
router.get('/getemergency', getContacts);
router.get('/getemergency/:id', getContactById);
router.put('/getemergency/:id', updateContact);
router.delete('/getemergency/:id', deleteContact);

export default router;