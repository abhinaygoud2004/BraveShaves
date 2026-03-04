CREATE TABLE IF NOT EXISTS payments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  appointment_id INT,
  amount DECIMAL(10,2),
  method VARCHAR(50),
  gateway VARCHAR(50),
  gateway_payment_id VARCHAR(100),
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);