CREATE DATABASE IF NOT EXISTS concesionario_rmz;
USE concesionario_rmz;

CREATE TABLE T_COCHE (
    identificador INT PRIMARY KEY,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    cilindrada int NOT NULL,
    CONSTRAINT CHK_CILINDRADA_POSITIVA CHECK (cilindrada > 0)
);

insert into T_COCHE values (1,'Renault', 'Megane', 1500);
insert into T_COCHE values (2,'Seat', 'León', 1600);
insert into T_COCHE values (3,'Suzuki', 'Vitara', 1900);
insert into T_COCHE values (4,'Seat', 'Clio', 1400);
insert into T_COCHE values (5,'Seat', 'Ibiza', 1400);
insert into T_COCHE values (6,'Peugeot', '308', 2000);
insert into T_COCHE values (7,'Renault', 'Megane', 1500);