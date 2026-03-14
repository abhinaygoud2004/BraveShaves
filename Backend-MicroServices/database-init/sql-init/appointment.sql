CREATE TABLE IF NOT EXISTS appointments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  barber_id INT,
  start_time DATETIME,
  end_time DATETIME,
  status VARCHAR(50),
  payment_status VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS appointment_services (
  appointment_id INT,
  service_id INT,
  PRIMARY KEY (appointment_id, service_id)
);