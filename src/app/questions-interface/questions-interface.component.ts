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
  questions: Question[]

  formErrors = {
    'question': '',
    'reponses': '',
    'explication': '',
    'chapitre': '',
    'reponseCorrecte': ''

  }

  validationMessages = {
    'question': {
      'required': 'Une question est obligatoire'
    },
    'reponses': {
      'required': 'Une réponse est obligatoire'
    },
    'explication': {
      'required': 'Une explication est obligatoire'
    },
    'chapitre': {
      'required': 'Un chapitre est obligatoire'
    },
    'reponseCorrecte': {
      'required': 'Au moins une réponse correcte est obligatoire'
    },

  }

  constructor(private router: Router,private fb: FormBuilder) { 
    
  }

  ngOnInit() {
    this.createForm()
  }

  createForm() {
    this.QuestionForm = this.fb.group({

      question: ['', Validators.required ],
      reponses: this.fb.group({
        reponse1: this.fb.group(
          {
            enonce1: ['',Validators.required],
            reponseCorrecte1: ['']
          }
        ),
        reponse2: this.fb.group(
          {
            enonce2: ['',Validators.required],
            reponseCorrecte2: ['']
          }
        ),
        reponse3: this.fb.group(
          {
            enonce3: ['',Validators.required],
            reponseCorrecte3: ['']
          }
        ),
        reponse4: this.fb.group(
          {
            enonce4: ['',Validators.required],
            reponseCorrecte4: ['']
          }
        ),
      }),
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

  }

  reset() {
    this.QuestionForm.reset({
      question: '',
      explication: '',
      chapitre: '',
      reponses: '',
      reponseCorrecte: ''

    })
    this.examFormDirective.resetForm()

  }


  onSubmit() {
    this.question = this.QuestionForm.value
    console.log(this.question)

    this.reset()

  }

}