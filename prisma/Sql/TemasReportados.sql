    SELECT t.id, t.nombre, t.titulo, t.id_creador, t.contenido, t.carrera, t.createdAt, t.updatedAt
    FROM Tema t
    INNER JOIN Reporte r
      ON r.mensaje_id = t.id