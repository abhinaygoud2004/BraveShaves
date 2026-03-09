const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const serviceService = require("../services/service.service")

const PROTO_PATH = path.join(__dirname, "../../shared/proto/shop.proto");

const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true
});

const shopProto = grpc.loadPackageDefinition(packageDef).shop;

const getServicesByIds = async (call, callback) => {
  try {

    const ids = call.request.ids;

    const services = await serviceService.getServicesByIds(ids);

    callback(null, { services });

  } catch (err) {
    callback(err);
  }
};

function startGrpcServer() {

  const server = new grpc.Server();

  server.addService(shopProto.ShopService.service, {
    GetServicesByIds: getServicesByIds
  });

  server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    () => {
      console.log("Shop gRPC server running on 50051");
      server.start();
    }
  );
}

module.exports = startGrpcServer;