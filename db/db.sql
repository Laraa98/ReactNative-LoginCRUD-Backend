use delivery;

CREATE TABLE users(
	idUsers BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(128) NOT NULL,
    lastname VARCHAR(128) NOT NULL,
    phone VARCHAR(64) NOT NULL,
    image VARCHAR(255) NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) not null
);
CREATE TABLE roles (
	idRoles BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(128) NOT NULL UNIQUE,
    image VARCHAR(255) NULL,
    route VARCHAR(128) NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL
);
INSERT INTO roles(name, route, created_at, updated_at) 
VALUES ("ADMIN", "/restaurant/orders/list", "2023-05-23", "2023-05-23");

INSERT INTO roles(name, route, created_at, updated_at) 
VALUES ("REPARTIDOR", "/delivery/orders/list", "2023-05-23", "2023-05-23");

INSERT INTO roles(name, route, created_at, updated_at) 
VALUES ("CLIENTE", "/client/products/list", "2023-05-23", "2023-05-23");

CREATE TABLE user_has_roles(
    idUsers BIGINT NOT NULL,
    idRoles BIGINT NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL,
    FOREIGN KEY(idUsers) REFERENCES users(idUsers) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(idRoles) REFERENCES roles(idRoles) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY(idUsers, idRoles)
);

CREATE TABLE categories(
    idCategories BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255) NULL,
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL
);
