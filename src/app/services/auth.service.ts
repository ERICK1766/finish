import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable(); // Suscribirse al usuario actual

  private apiUrl = 'http://localhost:3000/usuario'; // Tu API base

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(usuario: { nombre: string, contrasena: string, tipousuario: string }): Observable<any> {
    return this.http.post<any>('http://localhost:3000/usuario/login', usuario).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        console.log(localStorage.getItem('token'));
        this.setUsuario(response.user);
      })
    );
  }


  // Getter para el usuario actual
  getUsuario() {
    return this.userSubject.asObservable();
  }

  // Método para establecer el usuario actual
  setUsuario(user: any) {
    this.userSubject.next(user);
  }
  
  // Método para registrar un nuevo usuario
  registrarusuario(usuario: { nombre: string; contrasena: string; email: string; numcontacto: number; tipousuario: string }): Observable<any> 
  {
    return this.http.post('http://localhost:3000/usuario',usuario);
  }

  // Método para obtener el token almacenado
  getToken() {
    return localStorage.getItem('token');
  }

  // Método para verificar si el usuario está autenticado
  estaAutenticado() {
    const token = this.getToken();
    return token != null; // Retorna true si hay un token en el localStorage
  }

  // Método para cerrar sesión
  logout() {
    // Limpiar el token y los datos del usuario
    localStorage.removeItem('token');
    this.userSubject.next(null); // Limpiar el usuario
  }

  //Metodo para registrar un nuevo evento
  registrarevento(evento: { nombre: string; tipo_evento: string; descripcion: string; id_usuario: string; id_espacio:string; fecha_evento:string; capacidad_personas: number; hora_inicio:number; hora_fin:number; tipo_pago:string }):Observable<any>
  {
    return this.http.post('http://localhost:3000/evento',evento);
  }
  
  //Metodo para registrar un nuevo espacio
  registrarespacio(espacio: { nombre: string; ubicacion:string; costo: number }):Observable<any>
  {
    return this.http.post('http://localhost:3000/espacio',espacio);
  }

  //Metodo para mostrar un evento al ingresar presidente y empresas
  mostrarevento_usuarionormal():Observable<any>
  {
    return this.http.get('http://localhost:3000/evento/eventos-Usernormal');
  }

  //Metodo para mostrar un evento al ingresar presidente y empresas
  mostrarevento_creador(NombreCreador: { NombreCreador: string }):Observable<any>
  {
    return this.http.post('http://localhost:3000/evento/eventos-Creador',NombreCreador);
  }

  //Metodo para mostrar un evento al ingresar un usuario administrador
  mostrarevento_admin(NombreAdmin: { NombreAdmin: string }):Observable<any>
  {
    return this.http.post('http://localhost:3000/evento/eventos-Admin',NombreAdmin);
  }

  //Metodo para mostrar un evento para filtrar fecha para el calendario
  mostrarevento_filtrarfecha(fecha: { fecha :string  }):Observable<any>
  {
    return this.http.post('http://localhost:3000/evento/filtrar-fecha',fecha);
  }

  //Metodo para mostrar un evento al ingresar un usuario normal
  mostrarevento_eventospendientes(NombreAdmin: { NombreAdmin: string }):Observable<any>
  {
    return this.http.post('http://localhost:3000/evento/eventos-pend',NombreAdmin);
  }
}

