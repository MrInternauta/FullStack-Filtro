import { Component } from '@angular/core';
import { Producto } from './modelos/producto';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Tipo } from './modelos/tipos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  buscadorText: string = '';
  buscardorSelect: string = 'Seleccionar';
  precioMinimo: string = '';
  precioMaximo: string = '';
  public productos: Producto[] = [];
  productosAll: Producto[] = [];
  public tipos: Tipo[] = [];

  //Paginacion
  page = 0;
  maximusPage =  3;
  productosbyPage = 11;
  paginacionButton: any;
  constructor(private http: HttpClient) {
    this.obtenerTipos();
    this.obtenerProductos();
  }

  cambioBuscador() {
    console.log(this.buscadorText);
    this.obtenerProductos();
  }
  cambioSelect() {
    console.log(this.buscardorSelect);
    this.obtenerProductos();
  }
  cambioMinimo() {
    console.log(this.precioMinimo);
    this.obtenerProductos();
  }
  cambioMaximo() {
    console.log(this.precioMaximo);
    this.obtenerProductos();
  }

  buscar() {
    console.log('Buscar');
    this.obtenerProductos();
  }

  limpiarInput(){
    this.buscadorText = '';
    this.buscardorSelect = 'Seleccionar';
    this.precioMaximo = '';
    this.precioMinimo = '';
    this.obtenerProductos();
  }

  openAlertEmail() {
    let form = `
    <form>
  <div class="mb-3">
    <label for="nombre" class="form-label">*Nombre</label>
    <input type="email" class="form-control" maxlength="50" id="nombre" aria-describedby="nombre">
  </div>
  <div class="mb-3">
    <label for="email" class="form-label">*Email</label>
    <input type="email" class="form-control" id="email">
  </div>
  <div class="mb-3">
  <label for="mensaje" class="form-label">Mensaje</label>
  <textarea class="form-control" id="mensaje" rows="3" maxlength="100"></textarea>
  </div>
</form>
    `
    Swal.fire({
      title: 'Contáctanos y déjanos tus comentarios',
      html: form,
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        let nombre = (<HTMLInputElement>document.getElementById('nombre')).value;
        let email = (<HTMLInputElement>document.getElementById('email')).value;
        let mensaje = (<HTMLInputElement>document.getElementById('mensaje')).value;
        //Obtener los valores del inputs
        console.log(nombre, email, mensaje);
        if (!nombre || !email || !mensaje) {
           Swal.fire({
            title: `Faltan ingresar todos los datos`,
            icon: 'warning'
          });
        }else {
          const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          let isValidEmail = re.test(email);
          if (!isValidEmail) {
             Swal.fire({
              title: `Correo electrónico incorrecto.`,
              icon: 'warning'
            });
          }else{
            if (nombre.length > 50) {
              nombre = nombre.slice(0, 50);
            }
            if (mensaje.length > 100) {
              mensaje = mensaje.slice(0, 100);
            }
            this.enviarEmail(nombre, email, mensaje)
            .subscribe((response: any) => {
              if (response.status) {
                Swal.fire({
                  title: response.message || `Enviado correctamente`,
                  icon: 'success'
                })
              }
            }, (e)=>{
              Swal.fire({
                title: `No se pudo enviar el correo`,
                icon: 'error'
              });
            })
          }
        }


      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
      }
    })
  }

  obtenerTipos() {
    //Obtener tipos
    this.get().subscribe((response: any) => {
      if (response.status) {
        this.tipos = response.data;
        console.log(this.tipos);
      }
    })
  }

  obtenerProductos() {
    //Obtener todos los productos
    this.post('http://localhost:5000/api/v1.0/anuncio',{
      titulo: this.buscadorText,
      tipo: this.buscardorSelect == 'Seleccionar' ? '': this.buscardorSelect,
      minimo: this.precioMinimo,
      maximo: this.precioMaximo
    }).subscribe((response: any) => {
      if (response.status) {
        this.productosAll = (response.data);
        this.maximusPage =  Math.ceil(this.productosAll.length / this.productosbyPage) - 1;
        this.paginacionButton = Array.from(Array(this.maximusPage + 1),(x,i)=>i);

        // this.page ++;
        this.loadClients();
      }
    })
  }


  enviarEmail(nombre: string, email:string, mensaje:string) {
    //Obtener todos los productos
    return this.post('http://localhost:5000/api/v1.0/sendEmail', {
      nombre, email, mensaje
    })
  }

  /**
 * @version 0.0.1
 * @function post
 * @description permite realizar una peticion http post
 * @param {string} url direccion a la que se realizara la petición
 * @param {any} params parametros de la petición
 */
  post(url: string  = '', params: any = {}) {
    return this.http
      .post(url, params, {})
  }
  /**
* @version 0.0.1
* @function post
* @description permite realizar una peticion http post
* @param {string} url direccion a la que se realizara la petición
* @param {any} params parametros de la petición
*/
  get() {
    return this.http
      .get('http://localhost:5000/api/v1.0/tipos')
  }

    /**
     * @alias loadClients
     * @description Logica para cargar los cliente de forma progresiva
     * @param {any} event evento para mostrar loader en la vista
     * @returns {void}
     */
    loadClients(){
      if (this.page == 0) {
        this.productos = this.productosAll.slice(0, this.productosbyPage - 1);
      }else {
        let start =  (this.page * this.productosbyPage) - 1;
        let end = (this.page +  1) * this.productosbyPage - 1;
        let nextClients = this.productosAll.slice(start , end);
          this.productos = nextClients;
      }
    }

    paginacion(item: number){
      this.page = item --;
      this.loadClients();
    }
}
