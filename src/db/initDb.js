import getPool from "./getPool.js";

// Creamos una función para generar tablas dentro de nuestra DB
const create = async () => {
  try {
    let pool = await getPool();

    // En caso de ya existir, borramos las tablas antes de crear unas nuevas
    console.log("Borrando tablas...");
    await pool.query("DROP TABLE IF EXISTS registros, lugares, usuarios");

    console.log("Creando tabla usuarios...");
    await pool.query(`
    CREATE TABLE usuarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre_usuario VARCHAR(50) NOT NULL,
      correo_electronico VARCHAR(100) UNIQUE NOT NULL,
      clave_hash VARCHAR(255) NOT NULL,
      fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      esta_activo BOOLEAN DEFAULT true
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  
`);

    // Una vez borradas, las volvemos a crear
    console.log("Creando tabla lugares...");
    await pool.query(`
    CREATE TABLE lugares (
        id INT NOT NULL,
        coordenadas varchar(255) DEFAULT NULL,
        nombre varchar(255) DEFAULT NULL,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci  
        
        `);

    console.log("Creando tabla registros...");
    await pool.query(`
    CREATE TABLE registros (
        id INT NOT NULL AUTO_INCREMENT,
        lugar_id INT NOT NULL,
        usuario_id INT NOT NULL,
        altura_marea double DEFAULT NULL,
        altura_ola double DEFAULT NULL,
        direccion_ola smallint(6) DEFAULT NULL,
        direccion_viento smallint(6) DEFAULT NULL,
        foto_sesion varchar(255) DEFAULT NULL,
        fotos varchar(255) DEFAULT NULL,
        fotos_sesion varchar(255) DEFAULT NULL,
        gente int(11) DEFAULT NULL,
        lluvia double DEFAULT NULL,
        momento datetime(6) DEFAULT NULL,
        nubes double DEFAULT NULL,
        numero_olas tinyint(4) DEFAULT NULL,
        periodo_ola double DEFAULT NULL,
        punto_marea double DEFAULT NULL,
        que_tal_olas tinyint(4) DEFAULT NULL,
        que_tal_yo tinyint(4) DEFAULT NULL,
        subiendo_marea BOOLEAN DEFAULT NULL,
        temperatura_agua double DEFAULT NULL,
        temperatura_ambiente double DEFAULT NULL,
        texto varchar(255) DEFAULT NULL,
        tiempo smallint(6) DEFAULT NULL,
        velocidad_viento double DEFAULT NULL,
        PRIMARY KEY (id),
        KEY FK7qvo8m1q3g953sr897hxgfy6d (lugar_id),
        FOREIGN KEY (lugar_id) REFERENCES lugares (id)
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
        `);

    console.log("Insertando valores iniciales a lugares...");
    await pool.query(`
    INSERT INTO lugares (id, coordenadas, nombre) VALUES
(1, '43.3333,-9.2167', 'Malpica'),
(2, '43.3000,-9.1833', 'Seiruga'),
(3, '43.2667,-9.1500', 'Baluarte'),
(4, '43.2333,-9.1167', 'Marola'),
(5, '43.2000,-9.0833', 'Razo'),
(6, '43.1667,-9.0500', 'Barizo'),
(7, '43.1333,-9.0167', 'Laxe'),
(8, '43.1000,-8.9833', 'Soesto'),
(9, '43.0667,-8.9500', 'Traba'),
(10, '43.0333,-8.9167', 'Balarés'),
(11, '43.0000,-8.8833', 'Pantín'),
(12, '42.9667,-8.8500', 'Vilarrube'),
(13, '42.9333,-8.8167', 'A Frouxeira'),
(14, '42.9000,-8.7833', 'Valdoviño'),
(15, '42.8667,-8.7500', 'Cabo Home'),
(16, '42.8333,-8.7167', 'Cabo Ortegal'),
(17, '42.8000,-8.6833', 'San Jorge'),
(18, '42.7667,-8.6500', 'Cariño'),
(19, '42.7333,-8.6167', 'Ortigueira'),
(20, '43.6667,-8.0000', 'Cedeira');
  
        `);

    console.log("Insertando valores de pruebas a registros...");
    await pool.query(`
    INSERT INTO registros (lugar_id, usuario_id, altura_marea, altura_ola, direccion_ola, direccion_viento, foto_sesion, fotos, fotos_sesion, gente, lluvia, momento, nubes, numero_olas, periodo_ola, punto_marea, que_tal_olas, que_tal_yo, subiendo_marea, temperatura_agua, temperatura_ambiente, texto, tiempo, velocidad_viento)
    VALUES
    (1, 1, 1.5, 2.3, 180, 270, 'sesion1.jpg', 'foto1.jpg', 'sesion_fotos1.jpg', 10, 0.5, '2024-02-25 12:00:00', 3.5, 5, 8.2, 30.5, 2, 4, true, 22.5, 25.5, 'Descripción de la sesión 1', 1, 15.2),
    (2, 2, 1.8, 2.5, 220, 180, 'sesion2.jpg', 'foto2.jpg', 'sesion_fotos2.jpg', 15, 0.8, '2024-02-25 12:30:00', 4.2, 7, 9.5, 28.5, 3, 5, false, 23.5, 24.5, 'Descripción de la sesión 2', 2, 14.5),
    -- ... (repetir el patrón para las filas restantes)
    (20, 5, 2.1, 3.0, 300, 200, 'sesion20.jpg', 'foto20.jpg', 'sesion_fotos20.jpg', 18, 1.2, '2024-02-25 16:30:00', 5.0, 10, 10.8, 25.5, 4, 4, true, 21.5, 26.5, 'Descripción de la sesión 20', 3, 16.0);
    `);

    console.log("Insertando valores de pruebas a usuarios...");
    await pool.query(`INSERT INTO usuarios (nombre_usuario, correo_electronico, clave_hash, fecha_registro, esta_activo)
VALUES
('usuario1', 'usuario1@example.com', 'hashed_password_1', '2024-02-25 10:00:00', true),
('usuario2', 'usuario2@example.com', 'hashed_password_2', '2024-02-25 10:15:00', true),
('usuario3', 'usuario3@example.com', 'hashed_password_3', '2024-02-25 10:30:00', false),
('usuario4', 'usuario4@example.com', 'hashed_password_4', '2024-02-25 10:45:00', true),
('usuario5', 'usuario5@example.com', 'hashed_password_5', '2024-02-25 11:00:00', true),
('usuario20', 'usuario20@example.com', 'hashed_password_20', '2024-02-25 14:45:00', false);
`);

    await pool.end();
  } catch (error) {
    console.log(error);
  } finally {
    process.exit();
  }
};

//Aquí ejecutamos la función para crear la base de datos con las tablas
create();

// Propuesta: insertar datos por defecto en la tabla categorías para poder insertar registros desde el principio.
// Si hacemos la gestión de las mismas en el frontend, ahí ya el usuario puede cambiar los nombres, borrar o insertar
/*
 */
