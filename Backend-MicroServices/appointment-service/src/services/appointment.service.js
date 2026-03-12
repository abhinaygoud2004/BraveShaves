const db = require("../config/db");
const publisher = require("../events/publisher");
const repo = require("../repositories/appointment.repository");



const shopClient = require("../gRPC/appointment-services.grpc.client")

const getServicesByIds = (ids) => {

  return new Promise((resolve, reject) => {

    shopClient.GetServicesByIds(
      { ids },
      (err, response) => {

        if (err) {
          return reject(err);
        }

        resolve(response.services);
      }
    );

  });

};

exports.create = async (userId, data) => {

  if (!userId) throw new Error("Unauthorized");

  const { email,selectedTime, selectedServices } = data;
  console.log("email in appoitnemt create",data)

  if (!selectedTime) throw new Error("Start time is required");

  if (!selectedServices || selectedServices.length === 0) {
    throw new Error("At least one service must be selected");
  }

  const barber_id = selectedServices[0].barber_id;
  if (!barber_id) {
    throw new Error("Invalid service selection");
  }

  const totalDurationMinutes = selectedServices.reduce(
    (total, service) =>
      total + Number(service.duration_minutes || 0),
    0
  );

  if (totalDurationMinutes <= 0) {
    throw new Error("Invalid service duration");
  }

  const startTime = new Date(selectedTime);
  const endTime = new Date(
    startTime.getTime() + totalDurationMinutes * 60000
  );

  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    const overlap = await repo.overlap(
      barber_id,
      startTime,
      endTime,
      conn
    );

    if (overlap) throw new Error("Slot unavailable");

    const appointmentId = await repo.create(
      {
        user_id: userId,
        barber_id,
        start_time: startTime,
        end_time: endTime,
        payment_status: "PENDING",
        status: "CONFIRMED",
      },
      conn
    );

    const serviceIds = selectedServices.map(s => s?.id);

    await repo.attachServices(
      appointmentId,
      serviceIds,
      conn
    );

    await conn.commit();

    // 🔥 Publish event
    await publisher.publishAppointmentCreated({
      appointmentId,
      userId,
      email,
      barber_id,
      startTime,
      endTime,
      serviceIds
    });

    return appointmentId;

  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};


/**
 * Get appointments by user
 */
exports.getByUser = async (userId) => {

  const rows = await repo.findByUser(userId);

  console.log("in get by user: ",rows[0].service_id)

  if (!rows.length) return [];

  // collect service IDs
  const serviceIds = [...new Set(rows.map(r => r.service_id))];

  // 🔥 call shop service via gRPC
  const services = await getServicesByIds(serviceIds);

  const serviceMap = {};
  services.forEach(s => serviceMap[s.id] = s);

  // attach services
  return rows.map(r => ({
    ...r,
    service: serviceMap[r.service_id]
  }));

};


/**
 * Get appointments by barber
 */
exports.getByBarber = async (barber_id) => {
  return repo.findByBarber(barber_id);
};


/**
 * Cancel appointment
 */
exports.cancel = async (appointmentId) => {
  return repo.cancel(appointmentId);
};