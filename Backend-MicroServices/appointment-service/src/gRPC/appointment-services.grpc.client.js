const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const PROTO_PATH = path.join(__dirname, "../../shared/proto/shop.proto");

const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true
});

const shopProto = grpc.loadPackageDefinition(packageDef).shop;

const client = new shopProto.ShopService(
  process.env.SHOP_GRPC_URL || "shop-service:50051",
  grpc.credentials.createInsecure()
);

module.exports = client;