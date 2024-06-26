exports.getDriverProfile = async (req, res) => {
  try {
    const profile = await userService.fetchUserProfile(req.params.userId);
    if (!profile) {
      console.log(`User not found: ${req.params.userId}`);
      return res.status(404).send("User not found");
    }
    res.json(profile);
  } catch (error) {
    console.log(`Error fetching user profile: ${error}`);
    res.status(500).send(error.message);
  }
};

exports.updateDriverProfile = async (req, res) => {
  try {
    const profile = await userService.updateDriverProfile(
      req.params.driverId,
      req.body
    );
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
