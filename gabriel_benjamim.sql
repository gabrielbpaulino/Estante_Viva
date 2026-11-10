CREATE DATABASE estante_viva;

USE estante_viva;

CREATE TABLE livro (
id_livro INT NOT NULL AUTO_INCREMENT KEY,
titulo VARCHAR(150) NOT NULL,
autor VARCHAR(120) NOT NULL,
preco DECIMAL(10,2) NOT NULL,
quantidade_estoque INT NOT NULL
);