const barberRepo = require("../repositories/barber.repository");
const shopRepo = require("../repositories/shop.repository");
const userClient = require("../gRPC/user.grpc.client");

// helper to call grpc
const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    userClient.GetUserById({ id }, (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
};

const getUsersByIds = (ids) => {
  return new Promise((resolve, reject) => {
    userClient.GetUsersByIds({ ids }, (err, res) => {
      if (err) return reject(err);
      resolve(res.users);
    });
  });
};

exports.create = async ({ user_id, shop_id, experience_years }) => {

  if (!user_id || !shop_id) {
    throw new Error("User ID and Shop ID are required");
  }

  // Validate user via gRPC
  const user = await getUserById(user_id);
  if (!user) throw new Error("User does not exist");

  // Check if shop exists
  const shop = await shopRepo.findById(shop_id);
  if (!shop) throw new Error("Shop does not exist");

  // Prevent duplicate barber
  const existing = await barberRepo.findByUserId(user_id);
  if (existing) throw new Error("Barber already exists");

  return barberRepo.create({ user_id, shop_id, experience_years });
};

exports.list = async () => {

  const barbers = await barberRepo.findAll();
  if (!barbers.length) return [];

  // collect user ids
  const userIds = [...new Set(barbers.map(b => b.user_id))];

  // bulk grpc call
  const users = await getUsersByIds(userIds);

  // convert to map
  const userMap = {};
  users.forEach(u => {
    userMap[u.id] = u;
  });

  // merge barber + user
  return barbers.map(barber => {
    const user = userMap[barber.user_id];
  
    if (!user) return barber;
  
    const { id, ...userData } = user; // remove user id
  
    return {
      ...barber,
      ...userData
    };
  });
};

exports.getById = async (id) => {

  const barber = await barberRepo.findById(id);
  if (!barber) throw new Error("Barber not found");

  // fetch user via grpc
  const user = await getUserById(barber.user_id);

  return {
    ...barber,
    user
  };
};