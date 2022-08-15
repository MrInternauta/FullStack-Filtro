import { Tipo } from './tipos';
export interface Producto{
  id: number,
  titulo: string,
  tipoid?: string,
  imagen: string,
  precio: number,
  tipo?: Tipo
}
