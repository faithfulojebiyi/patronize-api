/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS user_info(
  id BINARY(16) PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW()
);

CREATE TABLE IF NOT EXISTS wallet_info(
  id BINARY(16) PRIMARY KEY,
  user_id BINARY(16) NOT NULL,
  balance DECIMAL(19,4) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  FOREIGN KEY (user_id) REFERENCES user_info(id)
);

CREATE TABLE IF NOT EXISTS transactions(
  id BINARY(16) PRIMARY KEY,
  user_id BINARY(16) NOT NULL,
  wallet_id BINARY(16) NOT NULL,
  operation ENUM ('credit', 'debit') NOT NULL,
  narration VARCHAR(200),
  amount DECIMAL(19,4) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  FOREIGN KEY (user_id) REFERENCES user_info(id),
  FOREIGN KEY (wallet_id) REFERENCES wallet_info(id)
);

CREATE TABLE IF NOT EXISTS beneficiaries(
  id BINARY(16) PRIMARY KEY,
  user_id BINARY(16) NOT NULL,
  account_no VARCHAR(10) NOT NULL,
  bank_code VARCHAR(100) NOT NULL,
  bank_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  FOREIGN KEY (user_id) REFERENCES user_info(id)
);