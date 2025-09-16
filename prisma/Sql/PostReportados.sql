    SELECT p.id, p.titulo, u.contenido
    FROM Post p
    INNER JOIN Reporte r
      ON r.post_id = u.id