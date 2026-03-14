CREATE TABLE IF NOT EXISTS barbers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  experience_years INT,
  rating DECIMAL(3,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS shops (
  id INT PRIMARY KEY AUTO_INCREMENT,
  barber_id INT,
  shop_name VARCHAR(255),
  address TEXT,
  open_time TIME,
  close_time TIME
);

CREATE TABLE IF NOT EXISTS services (
  id INT PRIMARY KEY AUTO_INCREMENT,
  barber_id INT,
  name VARCHAR(100),
  price DECIMAL(10,2),
  duration_minutes INT
);