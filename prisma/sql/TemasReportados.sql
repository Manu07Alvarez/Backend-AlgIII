    SELECT t.id, t.nombre, t.titulo, t.id_creador, t.contenido, t.id_carrera, t.cerrado,t.createdAt, t.updatedAt
    FROM Tema t
    INNER JOIN Reporte r
      ON r.tema_id = t.id