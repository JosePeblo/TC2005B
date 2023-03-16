CREATE DATABASE foreignrecipescom;

USE foreignrecipescom;

CREATE TABLE user (
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE recipe (
    id_recipe INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT,
    name VARCHAR(255),
    description VARCHAR(255),
    src VARCHAR(255),
    href VARCHAR(255),
    recipe TEXT,
    ingredients TEXT,
    FOREIGN KEY (id_user) REFERENCES user(id_user)
);

CREATE TABLE likes (
    id_user INT,
    id_recipe INT,
    PRIMARY KEY (id_user, id_recipe),
    FOREIGN KEY (id_user) REFERENCES user(id_user),
    FOREIGN KEY (id_recipe) REFERENCES recipe(id_recipe)
);

INSERT INTO user (username, password) VALUES
('Admin', '$2a$12$gX.qEnjv47B47/UIeIxP5O0K/UVXi1.scZ19e4XzSOQUvviDp10ia'),
('Pablo', '$2a$12$72/YpNQ405DXsSUlI38Ffux6y9tt6cHJu5N5iwHMtn4xdcNQP9doa');

INSERT INTO recipe (id_user, name, description, src, recipe, ingredients) VALUES
(2, 'Yakitori con arroz' , 'Brochetas de pollo con una deliciosa salsa agridulce', '/images/yakitori.jpeg', null, '[["Muslos de pollo",""]]'),
(2, 'Yakiudon', 'Fideos de udon salteados con carne y verduras', '/images/yakiudon.jpeg', null, null),
(2, 'Huevos benedictinos', 'No te dejes intimidar por este clásico del desayuno', '/images/huevosBenedictinos.jpeg', null, null),
(2, 'Lasaña', 'Deliciosa, fácil de hacer y excelente para tener que comer durante la semana', '/images/lasagna.jpeg', null, null),
(2, 'Paella sin romper la cartera', '¡Tranquilos! es más facil de lo que suena', '/images/paella.jpeg', null, null),
(1, 'Pizza!!!', 'Una receta de pizza muy fácil de hacer. Agrégale los toppings que quieras.', '/uploads/pizza.jpg', null, '[["Harina","156g"],["Agua","89ml"],["Sal","5g"],["Levadura","0.3g"],["Pasta de tomate","1 lata"],["Albahaca","5 - 6 hojas"],["Queso mozzarella","200g"]]'),
(1, 'Falafel', 'Es vegano!!!', '/uploads/WEPX4216.JPG', 'Una noche antes, deja remojar los garbanzos.\r\n\r\nAl día siguiente, licúalos ligeramente sin que se vuelvan completamente puré, deben tener una consistencia de arena gruesa; reserva en un tazón.\r\n\r\nLicúa la cebolla, el jalapeño, el diente de ajo, el cilantro y el perejil completamente y luego incorpora con los garbanzos, la sal, el comino, la harina y el polvo para hornear.\r\n\r\nMezclalo todo junto y forma esferas del tamaño de una pelota de ping-pong.\r\n\r\nPuedes freír profundamente falafel (dependiendo de que tanto quieras limpiar), también puedes aplanar las esferas y utilizar menos aceite o usar una freidora de aire rociándolas con aceite en spray.', '[["Garbanzos secos","100g"],["Cebolla","1/4"],["Jalapeño","1/2"],["Ajo","1 diente"],["Cilantro","1/2 taza"],["Perejil","1/2 taza"],["Harina","2 cucharadas"],["Sal","1 cucharada"],["Polvo para hornear","1 cucharadita"],["Comino en polvo","1/2 cucharadita"],["Aceite vegetal","(para freir)"]]');

INSERT INTO likes (id_user, id_recipe) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(2, 1),
(2, 2),
(2, 6),
(2, 7);
