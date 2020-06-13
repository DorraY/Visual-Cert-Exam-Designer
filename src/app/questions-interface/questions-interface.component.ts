import { Component, OnInit, ViewChild } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'

import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import {Themes,Exam} from '../shared/exam'
import {Question} from '../shared/question'
import { QuestionService } from '../services/question-service';
import { ChoixService } from '../services/choix.service';
import { ChapterService } from '../services/chapter.service';
import { ExplicationService } from '../services/explication.service';
import { Choix } from '../shared/choice';
import { ExamService } from '../services/exam-service';
import { Chapter } from '../shared/chapter';
import { Explication } from '../shared/explication';
import { error } from 'protractor';
import { DataTransferService } from '../services/data-transfer.service';

@Component({
  selector: 'app-questions-interface',
  templateUrl: './questions-interface.component.html',
  styleUrls: ['./questions-interface.component.css']
})
export class QuestionsInterfaceComponent implements OnInit {
  @ViewChild('qform') questionFormDirective
  QuestionForm: FormGroup
  
  question: Question = new Question()
  chapters
  chapitre: Chapter = new Chapter()
  explication: Explication = new Explication()
  questionOrdre=1
  exisitngQuestions= []
  
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
    }

  }

  constructor(private router: Router, 
    private dataTransferService: DataTransferService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private QuestionService : QuestionService,
    private explicationService: ExplicationService,
    private ChapterService: ChapterService,
    private ExamenService: ExamService) { 
  }

  reloadExisitngQuestion() {
    this.QuestionService.getQuestionList().subscribe(data => {
      for (let i=0;i<data.length;i++) {
        this.exisitngQuestions.push(data[i].quOrdre)

      }
    }) 

    let maximumValue 

    maximumValue = Math.max(...this.exisitngQuestions)

    console.log(this.exisitngQuestions.lastIndexOf)
    console.log(maximumValue)

  
  }

  ngOnInit() {
    
    this.exisitngQuestions=[]
    this.reloadExisitngQuestion()
    this.chapters = []
    
    this.createForm()
    this.reloadChapters()
  }

  reloadChapters() {
      this.ChapterService.getChapterList().subscribe(
        (chapter) => {
          for (let i=0;i<chapter.length;i++) {
            this.chapters.push(chapter[i])
          }
        }
      )
    
  }

  createForm() {
    this.QuestionForm = this.fb.group({

      question: ['', Validators.required ],
      explication: ['',Validators.required],
      chapitre: ['',[Validators.required]]

    })

    this.QuestionForm.valueChanges.subscribe( data => 
        this.onValueChanged())
    this.onValueChanged()

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
    })
    this.questionFormDirective.resetForm()

  }


  onSubmit() {
        
    let questionText = this.question.quText
    let questionChapter = this.question.quChCode
    let explicationText = this.explication.exTextExplanation
    console.log(explicationText)

    this.ExamenService.getExam(this.route.snapshot.params['id']).subscribe(
      (data) => {
        console.log(data)
        this.question.exCode  = data
        this.question.quText = questionText
        this.question.quChCode = questionChapter
        console.log(explicationText)        
        this.explication.exTextExplanation = explicationText
        console.log(this.explication.exTextExplanation)
        this.question.quOrdre = this.questionOrdre
        console.log(this.question)
        this.QuestionService.createQuestion(this.question).subscribe(
          (QuData) => {
            console.log(QuData)
            this.explication.exQucode = <Question> QuData
            console.log(this.explication)
            this.explicationService.createExplication(this.explication).subscribe(
              (data) => {
                console.log(data)
            console.log(QuData)
            let properiete = (Object.keys(QuData)[0])
            this.router.navigate(['/choix-interface',this.route.snapshot.params['id'],QuData[properiete]])
              }, (error) => {console.log(error)}
            )
          }, (error) => {console.log(error)}
        )
      }
    )
    this.questionOrdre++
    this.reset()

  }
  onSubmitExam() {

    let questionText = this.question.quText
    let questionChapter = this.question.quChCode
    let explicationText = this.explication.exTextExplanation
    console.log(explicationText)

    this.ExamenService.getExam(this.route.snapshot.params['id']).subscribe(
      (data) => {
        console.log(data)
        this.question.exCode  = data
        this.question.quText = questionText
        this.question.quChCode = questionChapter
        console.log(explicationText)        
        this.explication.exTextExplanation = explicationText
        console.log(this.explication.exTextExplanation)
        this.question.quOrdre = this.questionOrdre
        console.log(this.question)
        this.QuestionService.createQuestion(this.question).subscribe(
          (QuData) => {
            console.log(QuData)
            this.explication.exQucode = <Question> QuData
            console.log(this.explication)
            this.explicationService.createExplication(this.explication).subscribe(
              (data) => {
                console.log(data)
            console.log(QuData)
            let properiete = (Object.keys(QuData)[0])
            this.router.navigate(['/choix-interface',this.route.snapshot.params['id'],QuData[properiete]])
            

              }, (error) => {console.log(error)}
            )
          }, (error) => {console.log(error)}
        )
      }
    )
    this.questionOrdre++
    this.reset()
    

    this.router.navigateByUrl('/finished')

  }

}