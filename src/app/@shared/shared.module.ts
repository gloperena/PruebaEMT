import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { LoaderComponent } from './loader/loader.component';

//Modules
import { ReactiveFormsModule } from '@angular/forms';

//Angular material
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

const material = [
  MatInputModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatButtonModule,
  ReactiveFormsModule,
  MatDividerModule,
];

@NgModule({
  imports: [TranslateModule, CommonModule, material],
  declarations: [LoaderComponent],
  exports: [LoaderComponent, material],
})
export class SharedModule {}
