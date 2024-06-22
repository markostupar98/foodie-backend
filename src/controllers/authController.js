const authService = require('../services/authService');

// User sign up
exports.signup = async (req, res) => {
  try {
    const user = await authService.createUser(req.body);
    res.status(201).json({
      message: "User created successfully",
      userId: user.id
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User sign in
exports.signin = async (req, res) => {
  try {
    const user = await authService.validateUser(req.body.email, req.body.password);
    if (user) {
      const token = authService.generateToken(user);
      res.json({
        message: "Authentication successful",
        token: token,
        userId: user.id
      });
    } else {
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Driver sign up
exports.signupDriver = async (req, res) => {
  try {
    const driver = await authService.createDriver(req.body);
    res.status(201).json({
      message: "Driver created successfully",
      driverId: driver.id
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Driver sign in
exports.signinDriver = async (req, res) => {
  try {
    const driver = await authService.validateDriver(req.body.email, req.body.password);
    if (driver) {
      const token = authService.generateToken(driver);
      res.json({
        message: "Authentication successful",
        token: token,
        driverId: driver.id
      });
    } else {
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};