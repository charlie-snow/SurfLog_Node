// Importaciones
import getPool from "../../db/getPool.js";

// Importamos e usamos el gestor de conexión a la DB
const pool = await getPool();

// Creamos una función para listar regeriencias con opciones de filtrado donde busca y extrae las coincidencias en las regeriencias publicadas buscando en lugares y categorías, y es capaz de orodenar por votos, según los parámetros introducidos
const getRegsitrosController = async (req, res, next) => {
  try {
    // declaramos las variables con partes de sql para hacer combinaciones
    let query = "";
    const query_select = `SELECT
    r.id AS registro_id,
    r.lugar_id,
    l.nombre,
    l.coordenadas,
    r.usuario_id,
    u.nombre_usuario,
    u.correo_electronico,
    r.altura_marea,
    r.altura_ola,
    r.direccion_ola,
    r.direccion_viento,
    r.foto_sesion,
    r.fotos,
    r.fotos_sesion,
    r.gente,
    r.lluvia,
    r.momento,
    r.nubes,
    r.numero_olas,
    r.periodo_ola,
    r.punto_marea,
    r.que_tal_olas,
    r.que_tal_yo,
    r.subiendo_marea,
    r.temperatura_agua,
    r.temperatura_ambiente,
    r.texto,
    r.tiempo,
    r.velocidad_viento
FROM
    registros r
JOIN
    lugares l ON r.lugar_id = l.id
JOIN
    usuarios u ON r.usuario_id = u.id;
`;

    query = query_select;
    const [list] = await pool.query(query);
    console.log(list);
    res.send({
      status: "Correcto",
      data: list,
    });

    // const query_where = `WHERE
    //         reg.place LIKE ? OR lug.name LIKE ? OR reg.title LIKE ? OR reg.subTitle LIKE ? OR reg.text LIKE ? OR u.name LIKE ?`;
    // const query_group = `GROUP BY
    //         reg.id `;
    // let query_order = ` ORDER BY
    //         reg.id DESC`;

    // // hay 2 opciones principales: lista simple o lista filtrada
    // const query_list = query_select + "\n" + query_group;
    // const query_filtered_list =
    //   query_select + "\n" + query_where + "\n" + query_group;

    // // Obtenemos el valor de los parámetros
    // const search = req.query.search;
    // const orderBy = req.query.orderBy;
    // const orderDirection = req.query.orderDirection;

    // // si se quiere ordenar por votos, se añade el order by al final de la query
    // if (orderBy === "votes" && orderDirection) {
    //   query_order = " ORDER BY likes " + orderDirection;
    // }
    // query += query_order;

    // // si se va a filtrar por un texto, se elige la lista filtrada, se realiza la búsqueda y se devuelve el resultado
    // if (search) {
    //   query = query_filtered_list + "\n" + query;
    //   const [list] = await pool.query(query, [
    //     `%${search}%`,
    //     `%${search}%`,
    //     `%${search}%`,
    //     `%${search}%`,
    //     `%${search}%`,
    //     `%${search}%`,
    //   ]);
    //   // console.log(list);
    //   res.send({
    //     status: "Correcto",
    //     data: list,
    //   });
    // }
    // // si no se va a filtrar por un texto, se elige la lista simple, se realiza la búsqueda y se devuelve el resultado
    // else {
    //   query = query_list + "\n" + query;
    //   const [list] = await pool.query(query);
    //   console.log(list);
    //   res.send({
    //     status: "Correcto",
    //     data: list,
    //   });
    // }

    // console.log("query: " + query);
  } catch (error) {
    // En caso de error pasamos el error al middleware de gestión de errores
    next(error);
  }
};

// Exportamos la función
export default getRegsitrosController;
