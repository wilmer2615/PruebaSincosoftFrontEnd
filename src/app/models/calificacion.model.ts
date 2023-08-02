import { MateriaCalificada } from "./materiaCalificada.model"

export interface Calificacion{
    Id?:number,
    IdAlumno:number,
    Materias:MateriaCalificada[],
    IdAnioAcademico: number
}