CREATE TABLE `video_session`
(
    `id`          INT NOT NULL AUTO_INCREMENT,
    `customer_id` INT NOT NULL,
    `employee_id` INT NOT NULL,
    `start_time`  DATETIME(6) NOT NULL,
    `end_time`    DATETIME(6) NOT NULL,
    `status`      ENUM('scheduled', 'completed', 'cancelled') NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `car`
(
    `id`               INT            NOT NULL AUTO_INCREMENT,
    `brand`            VARCHAR(50)    NOT NULL,
    `model`            VARCHAR(50)    NOT NULL,
    `category`         VARCHAR(50)    NOT NULL,
    `availability`     BOOLEAN        NOT NULL,
    `price`            DECIMAL(10, 2) NOT NULL,
    `status`           ENUM('available', 'rented', 'maintenance') NOT NULL,
    `nr_of_doors`      INT            NOT NULL,
    `nr_of_seats`      INT            NOT NULL,
    `engine_type`      VARCHAR(50)    NOT NULL,
    `color`            VARCHAR(50)    NOT NULL,
    `year_of_creation` DATE           NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `promotion`
(
    `id`              INT           NOT NULL AUTO_INCREMENT,
    `description`     VARCHAR(300)  NOT NULL,
    `start_date_time` DATETIME(6) NOT NULL,
    `end_date_time`   DATETIME(6) NOT NULL,
    `reduction`       DECIMAL(5, 2) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id`) REFERENCES `car` (`id`)
);

CREATE TABLE `customer`
(
    `id`           INT          NOT NULL AUTO_INCREMENT,
    `user_id`      INT          NOT NULL,
    `address`      VARCHAR(120) NOT NULL,
    `language`     ENUM('english', 'french', 'spanish', 'german') NOT NULL,
    `phone_number` VARCHAR(15)  NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `agency`
(
    `id`      INT          NOT NULL AUTO_INCREMENT,
    `name`    VARCHAR(100) NOT NULL,
    `address` VARCHAR(120) NOT NULL,
    `contact` VARCHAR(50)  NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `employee`
(
    `id`        INT         NOT NULL AUTO_INCREMENT,
    `name`      VARCHAR(50) NOT NULL,
    `agency_id` INT         NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`agency_id`) REFERENCES `agency` (`id`)
);

CREATE TABLE `chat`
(
    `id`          INT NOT NULL AUTO_INCREMENT,
    `customer_id` INT NOT NULL,
    `employee_id` INT NOT NULL,
    `start_time`  DATETIME(6) NOT NULL,
    `end_time`    DATETIME(6),
    `status`      ENUM('Open', 'Closed') NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`),
    FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`)
);

CREATE TABLE `user`
(
    `id`         INT          NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(50)  NOT NULL,
    `last_name`  VARCHAR(50)  NOT NULL,
    `email`      VARCHAR(100) NOT NULL,
    `password`   VARCHAR(255) NOT NULL,
    `birth_date` DATE         NOT NULL,
    `address`    VARCHAR(120) NOT NULL,
    `photo`      VARCHAR(255),
    `created_at` DATETIME(6) NOT NULL,
    `updated_at` DATETIME(6) NOT NULL,
    `role`       ENUM('Customer', 'Employee') NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `chat_message`
(
    `id`        BIGINT       NOT NULL AUTO_INCREMENT,
    `chat_id`   INT          NOT NULL,
    `sender_id` INT          NOT NULL,
    `content`   VARCHAR(500) NOT NULL,
    `timestamp` DATETIME(6) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`chat_id`) REFERENCES `chat` (`id`)
);

CREATE TABLE `reservation`
(
    `id`              INT            NOT NULL AUTO_INCREMENT,
    `user_id`         INT            NOT NULL,
    `car_id`          INT            NOT NULL,
    `agency_id`       INT            NOT NULL,
    `start_date_time` DATETIME(6) NOT NULL,
    `end_date_time`   DATETIME(6) NOT NULL,
    `status`          ENUM('pending', 'confirmed', 'cancelled') NOT NULL,
    `price`           DECIMAL(10, 2) NOT NULL,
    `created_at`      DATETIME(6) NOT NULL,
    `updated_at`      DATETIME(6) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
    FOREIGN KEY (`car_id`) REFERENCES `car` (`id`),
    FOREIGN KEY (`agency_id`) REFERENCES `agency` (`id`)
);

CREATE TABLE `payment`
(
    `id`             INT            NOT NULL AUTO_INCREMENT,
    `reservation_id` INT            NOT NULL,
    `payment_date`   DATETIME(6) NOT NULL,
    `amount`         DECIMAL(10, 2) NOT NULL,
    `payment_method` VARCHAR(50)    NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`id`)
);

CREATE TABLE `maintenance`
(
    `id`               INT            NOT NULL AUTO_INCREMENT,
    `car_id`           INT            NOT NULL,
    `maintenance_date` DATE           NOT NULL,
    `description`      VARCHAR(255)   NOT NULL,
    `cost`             DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`car_id`) REFERENCES `car` (`id`)
);
