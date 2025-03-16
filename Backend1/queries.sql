CREATE TABLE classroom_keys (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    classroom_name VARCHAR(255) NOT NULL,
    block_name VARCHAR(255) NOT NULL,
    is_available BOOLEAN DEFAULT TRUE
);
CREATE TABLE key_requests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    classroom_key_id BIGINT NOT NULL,
    request_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(255) DEFAULT 'PENDING', 
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (classroom_key_id) REFERENCES classroom_keys(id)
);
CREATE TABLE bicycles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    qr_code VARCHAR(255) NOT NULL UNIQUE,
    is_available BOOLEAN DEFAULT TRUE
);
CREATE TABLE borrow_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    bicycle_id BIGINT NOT NULL,
    borrow_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    return_time TIMESTAMP,
    feedback TEXT,
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (bicycle_id) REFERENCES bicycles(id)
);
