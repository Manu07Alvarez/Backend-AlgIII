    SELECT u.id, u.email, u.rol, u.activo, u.nombre_apellido
    FROM Usuario u
    INNER JOIN Reporte r
      ON r.usuario_id = u.id