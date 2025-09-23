    SELECT p.id, p.titulo, p.contenido, p.published, p.id_autor, p.id_tema
    FROM Post p
    INNER JOIN Reporte r
      ON r.post_id = p.id