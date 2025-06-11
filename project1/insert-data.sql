CREATE TABLE groups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    creator_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE group_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    group_id INT,
    user_id INT
);
CREATE TABLE plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50),
  price INT,
  duration_minutes INT
);

INSERT INTO plans (name, price, duration_minutes)
VALUES ('Free', 0, 5), ('Bronze', 10, 7), ('Silver', 50, 10), ('Gold', 100, 9999);

CREATE TABLE user_plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  plan_id INT,
  purchase_date DATETIME,
  expires_on DATETIME
);


CREATE TABLE user_plans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    plan_id INT,
    purchase_date DATETIME,
    expires_on DATETIME
);
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    video_id INT,
    content TEXT,
    city VARCHAR(100),
    language VARCHAR(10),
    likes INT DEFAULT 0,
    dislikes INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE downloads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    video_id INT,
    downloaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
