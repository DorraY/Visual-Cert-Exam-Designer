import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Exam, Themes } from '../shared/exam';
import { Question } from '../shared/question';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionService } from '../services/question-service';
import { ExplicationService } from '../services/explication.service';
import { ChoixService } from '../services/choix.service';
import { DataTransferService } from '../services/data-transfer.service';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})
export class QuestionDetailsComponent implements OnInit {
  @ViewChild('qform') questionFormDirective
  QuestionForm: FormGroup
  exam: Exam
  themes=Themes
  currentQuestion: Question
  questionId

  
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

  constructor(private router: Router,
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private explicationService: ExplicationService,
    private choixService: ChoixService,
    private dataTransferService: DataTransferService,
    private fb: FormBuilder) { 
  }

  ngOnInit() {

     this.createForm()
     this.reloadData()
    



  }

  createForm() {
     this.QuestionForm = this.fb.group({

      question: ['', Validators.required ],
      reponses: this.fb.array([
        this.fb.group({
          enonce: ['',Validators.required],
          reponseCorrecte: [''],
        })
      ]),
      explication: ['',Validators.required],
      chapitre: [this.currentQuestion.quChCode.chNom,[Validators.required]]

    })

    this.QuestionForm.valueChanges.subscribe( data => 
        this.onValueChanged())
    this.onValueChanged()

  }




  reloadData() {
    this.questionId = this.route.snapshot.params['quid']

    //this.currentQuestion =   this.questionService.getQuestion(this.questionId)
  
    console.log(this.currentQuestion)
    
  }

  

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
    console.log(this.currentQuestion)



  }
  onSubmitExam() {
    console.log(this.currentQuestion)


  }
}
