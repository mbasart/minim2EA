const Station = require('../models/station');
const Bike = require('../models/bike');

const stationCtrl = {};

stationCtrl.getStations = async (req,res)=>{
    const stations = await Station.find();
    res.json(stations);
}


stationCtrl.getStation = async (req,res)=>{
    const stations = await Station.find()
        .populate({path: 'bikes'});
    res.json(stations.find(x => x.id === req.params.id));
}

stationCtrl.createStation = async (req,res) => {
    console.log(req.body);
    const station = new Station({
        name: req.body.name,
        state: req.body.state,
        description: req.body.description,
        bikes: req.body.bikes
    });
    await station.save();
    res.json({
        'status': 'Saved station'
    });
}

stationCtrl.addBike = async(req,res) => {
    const {id} = req.params;
    const bike = req.body._id;
    await Station.findByIdAndUpdate(id, {$push: {bikes: bike}});
    await Bike.findOneAndUpdate(
        { "_id" : bike },
        {$set: {assigned:true}}
    );
    res.json({status: 'station updated'});
}

stationCtrl.deleteBike = async(req,res) => {
    const {id} = req.params;
    const bike = req.body._id;
    await Station.findByIdAndUpdate(id, {$pull: {bikes: bike}});
    await Bike.findOneAndUpdate(
        { "_id" : bike },
        {$set: {assigned:false}}
    );
    res.json({status: 'station updated'});
}


stationCtrl.deleteStation = async (req, res, next) => {
    await Station.findByIdAndRemove(req.params.id);
    res.json({status: 'station Deleted'});
};

module.exports = stationCtrl;