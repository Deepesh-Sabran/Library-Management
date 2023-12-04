const { userModal, bookModal } = require("../modals/index");

// using async & await because we are dealing with the MongoDB
// getting all users details
exports.getAllUsers = async (req, res) => {
  const users = await userModal.find();

  if (users.length === 0) {
    return res.status(404).json({
      success: false,
      message: "no user found",
    });
  }
  return res.status(200).json({
    success: true,
    data: users,
  });
};
