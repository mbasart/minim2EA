const Station = require('../models/station');
const Bike = require('../models/bike');

const bikeCtrl = {};

bikeCtrl.getAllBikes = async (req,res) => {
    const bike = await Bike.find();
    res.json(bike);
}

bikeCtrl.getUnassignedBikes = async (req,res) => {
    const bikes = await Bike.find();
    res.json(bikes.filter(x => x.assigned == false));
}

bikeCtrl.createBike = async (req,res)=> {
    const bike = new Bike({
        name: req.body.name,
        kms: req.body.kms,
        description: req.body.description,
        assigned: req.body.assigned
    });
    await bike.save();
    res.json({
        'status': 'Saved bike'
    });
}

bikeCtrl.deleteBike = async (req, res, next) => {
    await Bike.findByIdAndRemove(req.params.id);
    res.json({status: 'bike Deleted'});
};

module.exports = bikeCtrl;