import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConstantsService } from './../services/constants.service';
import { uiComponents } from './components';

@NgModule({
    declarations: [
        ...uiComponents
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        ...uiComponents,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        ConstantsService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UIKitModule { }