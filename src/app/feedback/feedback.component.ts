import {
  AfterViewInit,
  Component,
  Input,
  NgModule,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  EmailValidator,
} from '@angular/forms';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { ClickOutside } from 'src/directives/click-outside';
// import { ThemePalette } from '@angular/material/core';
// import { ClickOutsideDirective } from 'src/directives/clickoutside';
import { HighlightOnHoverDirective } from 'src/directives/directives';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FeedbackComponent implements OnInit {
  isChecked = false;
  aformGroup: FormGroup;

  fullName: string = 'accp';

  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.aformGroup = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      feedback: new FormControl('', [
        Validators.required,
        Validators.minLength(20),
      ]),
      //      isRequired: new FormControl ( this.isChecked),
    });
  }

  getErrorMessage() {
    // if (this.aformGroup.email.hasError('required')) {
    //   return 'You must enter a value';
    // }
    // return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  check() {
    console.log(this.aformGroup.controls['feedback']);
    console.log(this.aformGroup.controls['feedback'].hasError('required'));
  }
  onSubmit() {
    console.log(this.aformGroup.value);
    console.log(this.aformGroup.value.name);

    console.warn(this.aformGroup);
  }
}
