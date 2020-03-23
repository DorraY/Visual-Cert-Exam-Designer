import { Component, OnInit, ViewChild, Input, Directive } from '@angular/core';
import {Router} from '@angular/router'

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Themes,Exam} from '../shared/exam'
import {Question} from '../shared/question'

import {routes} from '../app-routing/routes'

@Component({
  selector: 'app-questions-interface',
  templateUrl: './questions-interface.component.html',
  styleUrls: ['./questions-interface.component.css']
})
export class QuestionsInterfaceComponent implements OnInit {
  @ViewChild('qform') examFormDirective
  QuestionForm: FormGroup
  exam: Exam
  themes=Themes
  question: Question

  formErrors = {
    'question': '',
    'reponses': '',
    'explication': '',
    'chapitre': ''

  }

  validationMessages = {
    'question': {
      'required': 'Une question est obligatoire'
    },
    'reponses': {
      'required': 'Une réponse est obligatoire'
    },
    'temps': {
      'pattern' : 'La durée est composée uniquement de chiffres',
      'required' : 'La durée est obligatoire',
      'max' : 'La durée maximum est 360 minutes',
    },
    'score' : {
      'pattern' : 'Le score est composé uniquement de chiffres',
      'required' : 'Le score est obligatoire',
      'min' : 'Le score est une valeur positive'
    }
  }

  constructor(private router: Router,private fb: FormBuilder) { 
    
  }

  ngOnInit() {
    this.createForm()
  }

  createForm() {
    this.QuestionForm = this.fb.group({

      question: ['', Validators.required ],
      reponses: ['',Validators.required],
      explication: ['',Validators.required],
      chapitre: ['',[Validators.required]]
    })

    this.QuestionForm.valueChanges.subscribe( data => 
        this.onValueChanged(data))
    this.onValueChanged()

  }

  onValueChanged(data?:any) {
    if (!this.QuestionForm) {return ;}

    const form = this.QuestionForm

    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = ''
        const control = form.get(field)
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field]
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] +=messages[key] + ''
            }
          }
        }
      }
    }
    // this.QuestionForm.get('theme').valueChanges.subscribe(
    //   selectedTheme => {
    //     if (this.themes.includes(selectedTheme)) {
    //       this.QuestionForm.get('nom').reset()
    //       this.QuestionForm.get('nom').disable()
    //     }
    //     else {
    //       this.QuestionForm.get('nom').enable()
    //     }
    //   }
    // )

  }

  reset() {
    this.QuestionForm.reset({
      theme: '',
      nom: '',
      score: 0,
      temps: 0,
    })
    this.examFormDirective.resetForm()

  }


  onSubmit() {
    this.question = this.QuestionForm.value
    
    
    

    this.reset()

  }

}