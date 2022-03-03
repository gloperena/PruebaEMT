import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';
import { AuthenticationService, CredentialsService } from '@app/auth';
import { RequestService } from './request.service';
import { Request } from './request';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  numberInput: number = 0;
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

  constructor(
    private quoteService: QuoteService,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private requestService: RequestService
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

  onSubmit() {
    this.isSending = true;

    //Get an array of the multiples of the number
    let multiples = this.getMultiples(this.numberInput);

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
    this.result = this.numberInput + ' [' + text + ']';

    //Store request in DB
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    var dateTime = date + ' ' + time;

    let request = <NgForm>{
      value: {
        number_requested: this.numberInput,
        result: this.result,
        requested_by: this.username,
        requested_at: dateTime,
      },
    };

    this.requestService.storeRequest(request.value);
    this.isSending = false;
  }

  getMultiples(num: number) {
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

  createText(multiples: any) {
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

  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.username : null;
  }
}
