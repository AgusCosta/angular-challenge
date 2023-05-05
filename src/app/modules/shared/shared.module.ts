import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material/material.module';
import { TopbarComponent } from './components/topbar/topbar.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TopbarComponent],
  imports: [CommonModule],
  exports: [MaterialModule, TopbarComponent, ReactiveFormsModule],
})
export class SharedModule {}
