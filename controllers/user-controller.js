const { userModal } = require("../modals/index");

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

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  // const user = await userModal.findById(id);
  const user = await userModal.findById({ _id: id }); // here we match DB id with our req. id...
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user doesn't exist",
    });
  }
  return res.status(200).json({
    success: true,
    data: user,
  });
};

exports.createNewUser = async (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({
      success: false,
      message: "no data to add",
    });
  }

  // here .create is a internal method of MongoDB
  await userModal.create(data);

  // in the above line we didn't check if the user is alrady present or not because, in MongoDB Id is generated automatically
  const allUsers = await userModal.find();

  return res.status(200).json({
    success: true,
    message: "user created",
    data: allUsers,
  });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  // here .deleteOne is a internal method of MongoDB
  const user = await userModal.deleteOne({ _id: id });

  if (!user) {
    return res.status(404).jason({
      success: false,
      message: "user not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "user deleted",
    data: user,
  });
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  // we don't need to crosscheck with the id like if user is present or not because, if there is any other id ratherthan one
  // present in the DB then the connection automatically get crashed
  // .findOneAndUpdate is a MongoDB method
  const updatedUser = await userModal.findOneAndUpdate(
    {
      _id: id,
    },
    // data,
    {
      $set: {
        ...data, // another approch ..
      },
    },
    {
      new: true,
    }
  );
  return res.status(200).json({
    success: true,
    message: "user updated successfuly",
    data: updatedUser,
  });
};
