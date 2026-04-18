const mongoose = require("mongoose");

const validateObjectId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new apiError("Invalid ID", 400));
  }
  next();
};

module.exports = validateObjectId;
