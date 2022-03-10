import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';
import { AuthenticationService, CredentialsService } from '@app/auth';
import { RequestService } from './request.service';
import { Request } from './request';
import { FormGroup, FormControl, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  matcher = new MyErrorStateMatcher();

  quote: string | undefined;
  isLoading = false;
  isSending = false;
  resultColor = '';
  result = '';
  colores = {
    green: '#53FF33',
    red: '#FF3333',
    blue: '#334EFF',
    black: '#000000',
  };

  NumberForm = new FormGroup({
    number: new FormControl(1, [Validators.required, Validators.min(1)]),
  });

  public get number() {
    return this.NumberForm.get('number');
  }

  constructor(
    private quoteService: QuoteService,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private requestService: RequestService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.requestService.getRequests();
    this.isLoading = true;
    this.quoteService
      .getRandomQuote({ category: 'dev' })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((quote: string) => {
        this.quote = quote;
      });
  }

  public onSubmit() {
    if (this.NumberForm.valid) {
      this.executeSumbit(this.NumberForm.value.number);
    }
  }

  private executeSumbit(numberInput: number) {
    this.isSending = true;

    //Get an array of the multiples of the number
    let multiples = this.getMultiples(numberInput);

    //Check the smaller multiple and assign the color
    if (multiples[0] == '3') {
      this.resultColor = this.colores['green'];
    } else if (multiples[0] == '5') {
      this.resultColor = this.colores['red'];
    } else if (multiples[0] == '7') {
      this.resultColor = this.colores['blue'];
    } else {
      this.resultColor = this.colores['black'];
    }

    //Generate the text from multiples separated by commas
    let text = this.createText(multiples);

    //Save the final result
    this.result = numberInput + ' [' + text + ']';

    //Store request in DB
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    var dateTime = date + ' ' + time;

    let request = this.NumberForm;

    this.requestService.storeRequest(request.value);
    this.openSnackBar('Petición guardada');

    this.isSending = false;
  }

  private getMultiples(num: number) {
    var text = '';

    if (num % 3 == 0) {
      text = text + '3-';
    }

    if (num % 5 == 0) {
      text = text + '5-';
    }

    if (num % 7 == 0) {
      text = text + '7-';
    }

    var multiples = text.split('-');
    return multiples;
  }

  private createText(multiples: any) {
    let text = '';

    if (multiples.length - 1 == 3) {
      text = multiples[0] + ', ' + multiples[1] + ' y ' + multiples[2];
    } else if (multiples.length - 1 == 2) {
      text = multiples[0] + ' y ' + multiples[1];
    } else if (multiples.length - 1 == 1) {
      text = multiples[0];
    } else {
      text = 'No es múltiplo de 3, 5 o 7.';
    }

    return text;
  }

  private get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.username : null;
  }

  public openSnackBar(message: string) {
    this.snackBar.open(message, 'Aceptar', {
      duration: 3000,
    });
  }
}
