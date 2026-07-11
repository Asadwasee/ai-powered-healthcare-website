import Medicine from '../models/Medicine.js';

// @desc    Get all medicines with advanced search & filtering
// @route   GET /api/medicines
export const getAllMedicines = async (req, res) => {
    try {
        const { search, category, minPrice, maxPrice, inStock } = req.query;
        let query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        if (category) {
            query.category = category;
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        if (inStock === 'true') {
            query.stock = { $gt: 0 };
        }

        const medicines = await Medicine.find(query).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: medicines.length,
            data: medicines
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error while fetching medicines',
            error: error.message
        });
    }
};

// @desc    Get single medicine details by ID
// @route   GET /api/medicines/:id
export const getMedicineById = async (req, res) => {
    try {
        const medicine = await Medicine.findById(req.params.id);

        if (!medicine) {
            return res.status(404).json({
                success: false,
                message: 'Medicine item not found'
            });
        }

        res.status(200).json({
            success: true,
            data: medicine
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error while retrieving details',
            error: error.message
        });
    }
};