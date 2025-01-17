import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ControlValueAccessor, FormArray, FormBuilder, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { map, Observable, tap } from 'rxjs';
import { InterpolatingTextFormControlComponent } from '../interpolating-text-form-control/interpolating-text-form-control.component';
import { InsertMentionOperation } from '../interpolating-text-form-control/utils';

@Component({
  selector: 'app-array-form-control',
  templateUrl: './array-form-control.component.html',
  styleUrls: ['./array-form-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ArrayFormControlComponent,
    },
  ],
})
export class ArrayFormControlComponent implements ControlValueAccessor {
  onChange = val => { };
  onTouched = () => { };
  valueChanges$: Observable<void>;
  formArray: FormArray<FormControl>;
  constructor(private fb: FormBuilder) {
    this.formArray = this.fb.array([new FormControl('')]);
    this.valueChanges$ = this.formArray.valueChanges.pipe(tap(val => {
      this.onChange(val);
    }), map(() => { return void 0; }))
  }
  writeValue(obj: string[]): void {
    if (obj) {
      this.formArray.clear();
      obj.forEach(val => {
        this.formArray.push(new FormControl(val), { emitEvent: false });
      });
      if (this.formArray.controls[this.formArray.length - 1].value) {
        this.formArray.push(new FormControl(''));
      }

    }

  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formArray.disable();
    }
    else {
      this.formArray.enable();
    }
  }
  addValue() {
    this.formArray.push(new FormControl(''));
  }
  removeValue(index: number) {
    if (this.formArray.controls.length > 1) {
      this.formArray.removeAt(index);
    }
  }

 async addMention(textControl:InterpolatingTextFormControlComponent ,mention :InsertMentionOperation)
 {
   await textControl.addMention(mention);
 }
}
