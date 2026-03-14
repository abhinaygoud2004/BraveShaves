db = db.getSiblingDB("shopdb");

db.createCollection("shops", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["shopName", "address", "barber", "services", "createdAt"],
      properties: {
        shopName: { bsonType: "string" },
        address: { bsonType: "string" },

        barber: {
          bsonType: "object",
          required: ["userId", "experienceYears"],
          properties: {
            userId: { bsonType: "string" },
            experienceYears: { bsonType: "int" }
          }
        },

        services: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["serviceId", "name", "price"],
            properties: {
              serviceId: { bsonType: "string" },
              name: { bsonType: "string" },
              price: { bsonType: "double" }
            }
          }
        },

        createdAt: { bsonType: "date" }
      }
    }
  }
});

db.shops.createIndex({ "barber.userId": 1 });