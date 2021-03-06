import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../shared/servicios/data.service';
import {Store} from "@ngrx/store";
import {State} from "../redux/respuesta.reducer";
import {Router} from "@angular/router";
import {Entrada} from "../shared/model/entrada";
import {RespuestaService} from "../redux/respuesta.service";
import {HttpClient} from "@angular/common/http";
import {NetworkService} from "../shared/servicios/network.service";
import {ModalService} from "../shared/servicios/modal.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginComponent implements OnInit{
  public submitted: boolean;
  controlLogin: FormGroup;

  constructor(private dataService: DataService,
              private store: Store<State>,
              private respuestaService: RespuestaService,
              private router: Router,
              private http: HttpClient,
              private networkService: NetworkService,
              private modalService: ModalService,
              private translateService: TranslateService) { }

  ngOnInit() {
    this.controlLogin = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password:new FormControl('',[Validators.required])
    })
  }

  OnSubmit() {
    this.dataService.showLoading = true;
    this.submitted = true;
    if(this.controlLogin.valid) {
      let entrada = new Entrada();
      entrada.Email = this.controlLogin.get('email').value;
      entrada.Password = this.controlLogin.get('password').value;
      this.networkService.sendRequest("Usuario", entrada).subscribe(value => {
        if (value.Status === "KO"){
          this.dataService.menssageModal = this.translateService.instant(value.StatusMsg);
        } else if(value.Status === "OK"){
          localStorage.setItem("IdSession", JSON.stringify(value.usuario));
          console.log(localStorage.getItem("IdSession"));
          this.dataService.usuarioLoggeado = value.usuario;
          this.dataService.showLoading = false;
          this.router.navigate(['inicio']);
        }
      });
    }
  }
}
