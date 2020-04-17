import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router'

import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import {Themes,Exam} from '../shared/exam'
import {Question} from '../shared/question'

import {DataShareService} from '../services/data-share.service'

@Component({
  selector: 'app-questions-interface',
  templateUrl: './questions-interface.component.html',
  styleUrls: ['./questions-interface.component.css']
})
export class QuestionsInterfaceComponent implements OnInit {
  @ViewChild('qform') questionFormDirective
  QuestionForm: FormGroup
  exam: Exam
  themes=Themes
  question: Question
  questions: Question[]= []
  DataShare: DataShareService
  
  message: string

  formErrors = {
    'question': '',
    'reponses': '',
    'explication': '',
    'chapitre': '',

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

  }
  message$: any;

  constructor(private router: Router,private dataShare: DataShareService, private fb: FormBuilder) { 
    this.message$ = this.dataShare.getData()
    console.log(this.message$)
    

    
  }

  ngOnInit() {
    this.createForm()
  }

  createForm() {
    this.QuestionForm = this.fb.group({

      question: ['', Validators.required ],
      reponses: this.fb.array([
        this.fb.group({
          enonce: ['',Validators.required],
          reponseCorrecte: ['']
        })
      ]),
      explication: ['',Validators.required],
      chapitre: ['',[Validators.required]]

    })

    this.QuestionForm.valueChanges.subscribe( data => 
        this.onValueChanged())
    this.onValueChanged()

  }

  get reponses() {
    return this.QuestionForm.get('reponses') as FormArray
  }

  ajoutReponse() {
    this.reponses.push(this.fb.group({
      enonce: ['',Validators.required],
      reponseCorrecte: ['']}))
  }

  supprimerReponse(index) {
    this.reponses.removeAt(index)
  }

  *

  onValueChanged() {
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
    this.questionFormDirective.resetForm()

  }


  onSubmit() {
    this.question = this.QuestionForm.value
    this.questions.push(this.question)
    console.log(this.questions)
    
    this.reset()

  }
  onSubmitExam() {
    console.log("clicked")
    this.question = this.QuestionForm.value
    this.questions.push(this.question)
    
    console.log(this.questions)
    this.router.navigateByUrl('/finished')

  }

}