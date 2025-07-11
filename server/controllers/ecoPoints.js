const EcoPoints = require('../models/ecoPoints');
const User = require('../models/user');

function toTwoDecimals(num) {
  return Math.round(num * 100) / 100;
}

// Add eco points after successful payment
exports.addEcoPoints = async (req, res) => {
    try {
        const { userId, orderData } = req.body;
        
        if (!userId || !orderData) {
            return res.status(400).json({ message: 'User ID and order data are required' });
        }

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find or create eco points record for user
        let ecoPointsRecord = await EcoPoints.findOne({ userId });
        
        if (!ecoPointsRecord) {
            ecoPointsRecord = new EcoPoints({
                userId,
                points: 0,
                totalCO2Offset: 0,
                treesPlanted: 0,
                totalSpent: 0,
                orders: []
            });
        }

        // Add new order to eco points (rounded)
        const newOrder = {
            orderId: `ORDER_${Date.now()}`,
            amount: toTwoDecimals(orderData.totalAmount),
            co2Offset: toTwoDecimals(orderData.co2Offset),
            treesPlanted: orderData.treesPlanted,
            ecoPoints: toTwoDecimals(orderData.ecoPoints),
            date: new Date()
        };

        ecoPointsRecord.orders.push(newOrder);
        ecoPointsRecord.points = toTwoDecimals(ecoPointsRecord.points + orderData.ecoPoints);
        ecoPointsRecord.totalCO2Offset = toTwoDecimals(ecoPointsRecord.totalCO2Offset + orderData.co2Offset);
        ecoPointsRecord.treesPlanted += orderData.treesPlanted;
        ecoPointsRecord.totalSpent = toTwoDecimals(ecoPointsRecord.totalSpent + orderData.totalAmount);

        await ecoPointsRecord.save();

        res.status(200).json({
            message: 'Eco points added successfully',
            ecoPoints: ecoPointsRecord
        });

    } catch (error) {
        console.error('Error adding eco points:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get user's eco points data
exports.getEcoPoints = async (req, res) => {
    try {
        const { userId } = req.params;
        
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find eco points record for user
        let ecoPointsRecord = await EcoPoints.findOne({ userId });
        
        if (!ecoPointsRecord) {
            // Create new eco points record if none exists
            ecoPointsRecord = new EcoPoints({
                userId,
                points: 0,
                totalCO2Offset: 0,
                treesPlanted: 0,
                totalSpent: 0,
                orders: []
            });
            await ecoPointsRecord.save();
        }

        res.status(200).json({
            message: 'Eco points retrieved successfully',
            ecoPoints: ecoPointsRecord
        });

    } catch (error) {
        console.error('Error getting eco points:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get leaderboard - all users sorted by eco points
exports.getLeaderboard = async (req, res) => {
    try {
        console.log('Fetching leaderboard...');
        
        // Get all eco points records
        const ecoPointsRecords = await EcoPoints.find()
            .sort({ points: -1 }) // Sort by points descending
            .limit(50); // Limit to top 50 users

        console.log(`Found ${ecoPointsRecords.length} eco points records`);

        // Get user data for each eco points record
        const leaderboard = [];
        
        for (let i = 0; i < ecoPointsRecords.length; i++) {
            const record = ecoPointsRecords[i];
            try {
                const user = await User.findById(record.userId);
                
                if (user) {
                    leaderboard.push({
                        rank: i + 1,
                        userId: record.userId,
                        name: user.name,
                        email: user.email,
                        points: record.points,
                        totalCO2Offset: record.totalCO2Offset,
                        treesPlanted: record.treesPlanted,
                        totalSpent: record.totalSpent
                    });
                } else {
                    console.log(`User not found for ID: ${record.userId}`);
                }
            } catch (userError) {
                console.error(`Error fetching user ${record.userId}:`, userError);
            }
        }

        console.log(`Returning ${leaderboard.length} leaderboard entries`);

        res.status(200).json({
            message: 'Leaderboard retrieved successfully',
            leaderboard: leaderboard
        });

    } catch (error) {
        console.error('Error getting leaderboard:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}; 