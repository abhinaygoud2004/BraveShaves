const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const repo = require("../repositories/user.repository");

const PROTO_PATH = path.join(__dirname, "../../shared/proto/user.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const userProto = grpc.loadPackageDefinition(packageDefinition).user;

async function GetUserById(call, callback) {
  try {
    const userId = call.request.id;

    const user = await repo.findById(userId);

    if (!user) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: "User not found",
      });
    }

    callback(null, {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });

  } catch (err) {
    callback(err);
  }
}

async function GetUsersByIds(call, callback) {
  try {
    const ids = call.request.ids;

    if (!ids || !ids.length) {
      return callback(null, { users: [] });
    }

    const users = await repo.findByIds(ids);

    const response = users.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      phone: u.phone,
      role: u.role,
    }));

    callback(null, { users: response });

  } catch (err) {
    callback(err);
  }
}

function startGrpcServer() {
  const server = new grpc.Server();

  server.addService(userProto.UserService.service, {
    GetUserById,
    GetUsersByIds,
  });

  server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    () => {
      console.log("User gRPC Server running on port 50051");
      server.start();
    }
  );
}

module.exports = startGrpcServer;