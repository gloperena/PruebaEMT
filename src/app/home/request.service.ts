import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireList } from '@angular/fire/compat/database';
import { Request } from './request';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  requestList!: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase) {}

  getRequests() {
    return (this.requestList = this.firebase.list('requests'));
  }

  storeRequest(request: Request) {
    this.requestList.push({
      number_requested: request.number_requested,
      result: request.result,
      requested_by: request.requested_by,
      requested_at: request.requested_at,
    });
  }
}
