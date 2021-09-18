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
export class FeedbackComponent {
  isChecked = false;
  formGroup: FormGroup;

  fullName: string = 'accp';

  constructor(formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      question: [''],
      isRequired: [this.isChecked],
    });
  }

  // addQuestion(){
  //   console.log("add more question")
  //   console.log(Object.keys(this.formGroup.value).length)
  //   let questNum = Object.keys(this.formGroup.value).length

  //   //this is how to create another form control
  //   //this.formGroup.addControl(`${questNum}` , new FormControl('',));

  // }

  checkboxset1 = 1;
  addcheckbox() {
    console.log('add checkbox ');
    this.checkboxset1 + 1;
  }

  onFormSubmit() {
    alert(JSON.stringify(this.formGroup.value, null, 2));
  }

  thequestion = '';

  survey: any[] = [
    {
      question: 'Question',
    },
  ];

  questiontypes = [
    { value: 'Shortanswer', viewValue: 'short answer' },
    { value: 'Multiplechoice', viewValue: 'Multiple choice' },
    { value: 'Checkbox', viewValue: 'checkbox' },
  ];

  //adding and removing of question
  addquestion() {
    console.log(this.survey);
    this.survey.push({ question: 'Question' });
    console.log(this.survey);
  }
  deleteQuestion(i) {
    this.survey.splice(i, 1);
  }
  //working on border. When selected soul d be blue

  totalqn = 0;
  currentqn;
  currentqntype = '';
  previousqntype = '';
  hide = null;

  aelement = document.getElementsByClassName('question');
  aelement2 = document.getElementsByClassName('displaydata');

  checkclick(eve, i) {
    // console.log('checkclick');
    //console.log(eve);
    this.currentqn = i;

    // console.log(this.aelement2);
    for (var ii = 0; ii < this.aelement2.length; ii++) {
      this.aelement2[ii].setAttribute('style', 'border-left:0px;');
    }

    this.aelement2[i].setAttribute(
      'style',
      'border-left: 0.5em solid #547DBF;border-top: 0.5em solid #66499D'
    );
  }
  //able to detect internal click
  // onClickOutside(event: Object, i = 0) {
  //   // console.log(event);

  //   if (event == 'outside') {
  //     // console.log('outside');
  //     // if (this.aelement[0].classList.contains('question') == false) {
  //     //   this.aelement[0].setAttribute('style', 'border-left: 0em ');
  //     console.log('outside. so i dw to log');
  //     // }
  //   } else if (event == 'inside') {
  //     console.log('inside');
  //   }
  // }

  //  https://stackoverflow.com/questions/46991497/how-properly-bind-an-array-with-ngmodel-in-angular-4
  trackByIdx(index: number, obj: any): any {
    return index;
  }

  //settings for type of questions
  questiontype(e, i) {
    console.log('questiontype');

    this.previousqntype = this.currentqntype;
    this.currentqntype = e.value;
    this.currentqn = i;

    if (this.previousqntype !== '') {
      console.log('previousqntype not null');
      delete this.survey[this.currentqn][this.previousqntype];
      delete this.survey[i]['questiontype'];
    }

    if (this.currentqntype == 'Multiplechoice') {
      this.survey[i][this.currentqntype] = ['option'];
      this.survey[i]['questiontype'] = this.currentqntype;
    } else if (this.currentqntype == 'Checkbox') {
      this.survey[i][this.currentqntype] = ['checkbox value'];
      this.survey[i]['questiontype'] = this.currentqntype;
    }
  }
  //questiontype
  //mcq
  addMCQ(i) {
    console.log('addMCQ');
    console.log(this.survey[i].Multiplechoice.push('option'));
    console.log(this.survey);
  }
  deleteMCQ(i, ind) {
    console.log('deleteMCQ');
    this.survey[i].Multiplechoice.splice(ind, 1);
    console.log(this.survey);
  }

  //checkbox
  addCheckbox(i) {
    console.log('addCheckbox');
    console.log(this.survey[i].Checkbox.push('checkbox value'));
    console.log(this.survey);
  }
  deleteCheckbox(i, ind) {
    console.log('deleteCheckbox');
    console.log(this.survey[i].Checkbox.splice(ind, 1));
    console.log(this.survey);
  }

  check() {
    // console.log(this.isChecked)
    // console.log(this.thequestion)
    console.log(this.survey[0]);
    console.log('Multiplechoice' in this.survey[0]);
    console.log('Checkbox' in this.survey[0]);

    console.log(this.survey);
  }
  //navigation
}

/*
how the form will look like for user.
1 Survey form
{
  Question: answer
  multiple choice: [choice]
  checkbox: [option1,option2, option3]
  shortanswer: asdasd
}

for developer pov
{
  Question: [short anser]
  multiple choice: [choice]
  checkbox: [option1,option2, option3]
  shortanswer: asdasd
}

*/
