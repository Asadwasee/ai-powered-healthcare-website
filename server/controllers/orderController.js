import Order from '../models/Order.js';
import Medicine from '../models/Medicine.js';

export const createOrder = async (req, res) => {
    try {
        const { customerName, phone, shippingAddress, items, totalAmount, paymentMethod } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ success: false, message: "Cart is empty" });
        }

        // 1. Stock validation loop check
        for (const item of items) {
            const medicine = await Medicine.findById(item._id);
            if (!medicine) {
                return res.status(404).json({ success: false, message: `Medicine ${item.name} not found` });
            }
            if (medicine.stock < item.quantity) {
                return res.status(400).json({ success: false, message: `Insufficient stock for ${medicine.name}` });
            }
        }

        // 2. Reduce stock inventory counts safely
        for (const item of items) {
            await Medicine.findByIdAndUpdate(item._id, {
                $inc: { stock: -item.quantity }
            });
        }

        // 3. Format items array for schema injection
        const formattedItems = items.map(item => ({
            medicine: item._id,
            name: item.name,
            quantity: item.quantity,
            price: item.price
        }));

        // 4. Save new order details document record
        const newOrder = new Order({
            customerName,
            phone,
            shippingAddress,
            items: formattedItems,
            totalAmount,
            paymentMethod
        });

        await newOrder.save();

        res.status(201).json({
            success: true,
            message: "Order placed successfully!",
            data: newOrder
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};