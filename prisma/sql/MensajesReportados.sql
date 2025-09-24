    SELECT m.id, m.contenido, m.id_autor, m.id_post, m.createdAt, m.updatedAt
    FROM Mensaje m
    INNER JOIN Reporte r
      ON r.mensaje_id = m.id