    SELECT m.id, m.contenido, m.id_autor
    FROM Mensaje m
    INNER JOIN Reporte r
      ON r.mensaje_id = m.id