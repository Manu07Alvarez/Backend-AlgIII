import {Type, Static} from 'typebox';
export const CurriculumSchema = Type.Object({
    nombre: Type.String(),
    apellido: Type.String(),
    fecha_nacimiento: Type.String({format: 'date', errorMessage: 'El formato de la fecha es inválido'}),
    telefono: Type.Optional(Type.String({errorMessage: 'El formato del teléfono es inválido'})),
    email: Type.String ({format: 'email', errorMessage: 'El formato del email es inválido'}),
    ultimo_titulo: Type.Optional(Type.String({errorMessage: 'El formato del título es inválido'})),
    experiencia: Type.Optional(Type.String({errorMessage: 'El formato de la experiencia es inválido'})),
    habilidades_blandas: Type.Optional(Type.String({errorMessage: 'El formato de las habilidades blandas es inválido'})),
    habilidades_duras: Type.Optional(Type.String({errorMessage: 'El formato de las habilidades duras es inválido'})),
    idiomas: Type.Optional(Type.String({errorMessage: 'El formato de los idiomas es inválido'})),
    presentacion: Type.Optional(Type.String({errorMessage: 'El formato de la presentación es inválido'})),
    disponibilidad_horaria: Type.Optional(Type.String({errorMessage: 'El formato de la disponibilidad horaria es inválido'})),
    perfil_in: Type.Optional(Type.String({errorMessage: 'El formato del perfil de LinkedIn es inválido'})),
});

export type Curriculum = Static<typeof CurriculumSchema>;