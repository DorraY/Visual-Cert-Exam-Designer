import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Themes,Exam} from '../shared/exam'
import {Question} from '../shared/question'

@Component({
  selector: 'app-exam-interface',
  templateUrl: './exam-interface.component.html',
  styleUrls: ['./exam-interface.component.css']
})
export class ExamInterfaceComponent implements OnInit {

  @ViewChild('eform') examFormDirective
  ExamenForm: FormGroup
  exam: Exam
  themes=Themes

  formError = {
    'theme': '',
    'nom': '',
    'temps': '',
    'score': ''

  }

  validationMessage = {
    'theme': {
      'required': 'Le thème est obligatoire'
    },
    'nom': {
      'required': 'Le nom est obligatoire'
    },
    'temps': {
      'required' : 'La durée est obligatoire',
      'pattern' : 'La durée est composée uniquement de chiffres',
      'max' : 'Durée maximum est 360 minutes'
    },
    'score' : {
      'required' : 'Le score est obligatoire',
      'pattern' : 'Le score est composé uniquement de chiffres',

    }
  }


  constructor(private fb: FormBuilder) { 
    this.createForm()
  }

  ngOnInit() {
  }

  createForm() {
    this.ExamenForm = this.fb.group({
      theme: ['', Validators.required ],
      nom: ['',Validators.required],
      score: [0,Validators.required],
      temps: [0,[Validators.required, Validators.max(360)]],
      questions: []
    })

  }
  onSubmit() {
    this.exam = this.ExamenForm.value
    console.log('le theme ' + this.exam.theme)

    if (!this.themes.includes(this.exam.theme)) {
      Themes.push(this.exam.theme)
    }
    console.log(this.exam)
    this.ExamenForm.reset({
      theme: '',
      nom: '',
      score: 0,
      temps: 0,
      questions: []
    })
    this.examFormDirective.resetForm()
  }

}
