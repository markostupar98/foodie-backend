const driverService = require("../services/driverService");

exports.getDriverProfile = async (req, res) => {
  try {
    const profile = await driverService.fetchDriverProfile(req.params.driverId);
    if (!profile) {
      console.log(`Driver not found: ${req.params.driverId}`);
      return res.status(404).send("Driver not found");
    }
    res.json(profile);
  } catch (error) {
    console.log(`Error fetching Driver profile: ${error}`);
    res.status(500).send(error.message);
  }
};

exports.updateDriverProfile = async (req, res) => {
  try {
    const profile = await driverService.updateDriverProfile(
      req.params.driverId,
      req.body
    );
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
