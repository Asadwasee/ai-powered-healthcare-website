import { EmergencyContact } from '../models/EmergencyContact.js';
import { sendResponse, sendError } from '../utils/response.js';

// Create emergency contact
export const createContact = async (req, res, next) => {
    try {
        const contact = await EmergencyContact.create({
            ...req.body,
            user: req.user.id
        });
        sendResponse(res, 201, true, 'Emergency contact added successfully', contact);
    } catch (error) {
        next(error);
    }
};

// Get all user contacts
export const getContacts = async (req, res, next) => {
    try {
        const contacts = await EmergencyContact.find({ user: req.user.id });
        sendResponse(res, 200, true, 'Contacts fetched successfully', contacts);
    } catch (error) {
        next(error);
    }
};

// Get single contact
export const getContactById = async (req, res, next) => {
    try {
        const contact = await EmergencyContact.findOne({
            _id: req.params.id,
            user: req.user.id
        });
        if (!contact) {
            return sendError(res, 404, 'Contact not found');
        }
        sendResponse(res, 200, true, 'Contact fetched successfully', contact);
    } catch (error) {
        next(error);
    }
};

// Update contact
export const updateContact = async (req, res, next) => {
    try {
        const contact = await EmergencyContact.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!contact) {
            return sendError(res, 404, 'Contact not found');
        }
        sendResponse(res, 200, true, 'Contact updated successfully', contact);
    } catch (error) {
        next(error);
    }
};

// Delete contact
export const deleteContact = async (req, res, next) => {
    try {
        const contact = await EmergencyContact.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });
        if (!contact) {
            return sendError(res, 404, 'Contact not found');
        }
        sendResponse(res, 200, true, 'Contact deleted successfully');
    } catch (error) {
        next(error);
    }
};