import { Component, OnInit } from '@angular/core';
import { ShortUrlService } from '../../services/short-url.service';

@Component({
  selector: 'app-short-url',
  templateUrl: './short-url.component.html',
  styleUrls: ['./short-url.component.css']
})
export class ShortUrlComponent implements OnInit {

  nombreUrl: string;
  urlShort: string;
  urlProcesada: boolean;
  loading: boolean;
  mostrarError: boolean;
  textError: string;

  constructor(private shortUrlService: ShortUrlService) {
    this.nombreUrl = '';
    this.urlShort = '';
    this.urlProcesada = false;
    this.loading = false;
    this.mostrarError = false;
    this.textError = '';
  }

  ngOnInit(): void {
  }

  procesarUrl() {

    if(this.nombreUrl === '') {
      this.showError('Por favor ingresa una URL.');
      return;
    }
    this.urlProcesada = false;
    this.loading = true;

    setTimeout(() => {
      this.obtenerUrlShort();
    }, 2000);
  }

  obtenerUrlShort() {
    this.shortUrlService.getUrlShort(this.nombreUrl).subscribe(
      data => {
        this.loading = false;
        this.urlProcesada = true;
        this.urlShort = data.link;
      }, 
      error => {
        this.loading = false;
        this.nombreUrl = '';
        if(error.error.description === 'The value provided is invalid.')  {
          this.showError('La URL ingresada es inválida, por favor verifícala e intenta nuevamente.')
        }
      });
  }

  showError(valor: string) {
    this.mostrarError = true;
    this.textError = valor;
    setTimeout(() => {
      this.mostrarError = false;
    }, 4000);
  }

}
