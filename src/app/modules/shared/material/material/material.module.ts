import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
	declarations: [],
	imports: [CommonModule],
	exports: [MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatProgressSpinnerModule],
})
export class MaterialModule {}
