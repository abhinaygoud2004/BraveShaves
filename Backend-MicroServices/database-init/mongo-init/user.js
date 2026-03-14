db = db.getSiblingDB("userdb");

db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "passwordHash", "role", "createdAt"],
      properties: {
        name: { bsonType: "string", minLength: 2 },
        email: {
          bsonType: "string",
          pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
        },
        passwordHash: { bsonType: "string" },
        role: { enum: ["user", "barber", "admin"] },
        createdAt: { bsonType: "date" }
      }
    }
  }
});

db.users.createIndex({ email: 1 }, { unique: true });