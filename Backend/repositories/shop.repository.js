const db = require("../config/db");

exports.create = async ({ barber_id, shop_name, address, open_time, close_time }) => {
  const [r] = await db.query(
    `INSERT INTO shops (barber_id,shop_name,address,open_time,close_time)
     VALUES (?,?,?,?,?)`,
    [barber_id, shop_name, address, open_time, close_time]
  );
  return { id: r.insertId };
};

exports.findByBarber = async (barberId) => {
  const [[row]] = await db.query(
    "SELECT * FROM shops WHERE barber_id=?",
    [barberId]
  );
  return row;
};

exports.update = async (id, data) => {
  await db.query(
    "UPDATE shops SET shop_name=?, address=?, open_time=?, close_time=? WHERE id=?",
    [data.shop_name, data.address, data.open_time, data.close_time, id]
  );
};
