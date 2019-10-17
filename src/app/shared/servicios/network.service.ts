import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Observable} from "rxjs";

import {DataService} from "./data.service";
import {Entrada} from "../model/entrada";
import {Respuesta} from "../model/respuesta";
import {Peticion} from "../model/peticion";
import {environment} from "../../../environments/environment";

/**
 *
 */
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
};

/**
 * Servicio para la conexión con back-end
 */
@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  /**
   * Servicio de back
   */
  private readonly CONTROLLER_SERVICE: string = 'controller';

  constructor(private httpClient: HttpClient,
              private _dataService: DataService) {
  }

  /**
   * Metodo que gestiona la entrada para la peticion de back
   * @param metodoPeticion {string} metodo de la peticion
   * @param entrada {Entrada} entrada de la peticion
   * @param action
   */
  public sendRequest(metodoPeticion: string,entrada: Entrada,action: string): Observable<Respuesta> {
    const body: Peticion = {
      Servicio: this.CONTROLLER_SERVICE,
      Metodo: metodoPeticion,
      IdiomaWeb: this._dataService.idiomaWeb,
      Action: action,
      Entrada: entrada
    };
    return this.httpClient.post<Respuesta>(`${environment.servers.urlPowerGaming}`, body, httpOptions);
  }

}
