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

@Component({
  selector: 'app-questions-interface',
  templateUrl: './questions-interface.component.html',
  styleUrls: ['./questions-interface.component.css']
})
export class QuestionsInterfaceComponent implements OnInit {
  @ViewChild('qform') questionFormDirective
  QuestionForm: FormGroup
  
  question: Question = new Question()
  choix: Choix = new Choix()
  chapters
  chapitre: Chapter = new Chapter()

  questionOrdre
  
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
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private QuestionService : QuestionService,
    private ChoixService : ChoixService,
    private ChapterService: ChapterService,
    private ExamenService: ExamService) { 
  }

  ngOnInit() {
    this.chapters = []
    this.questionOrdre =0
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
      reponses: this.fb.array([
        this.fb.group({
          enonce: ['',Validators.required],
          reponseCorrecte: [''],
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
        
    let questionText = this.question.quText
    let questionChapter = this.question.quChCode

    this.ExamenService.getExam(this.route.snapshot.params['id']).subscribe(
      (data) => {
        console.log(data)
        this.question.exCode  = data
        this.question.quText = questionText
        this.question.quChCode = questionChapter
        this.question.quOrdre = 1
        console.log(this.question)
        this.QuestionService.createQuestion(this.question).subscribe(
          (data) => {
            console.log(data)
          }, (error) => {console.log(error)}
        )
      }
    )
    this.questionOrdre++
    this.reset()

  }
  onSubmitExam() {
    this.questionOrdre++
    
    this.question = this.QuestionForm.value
    
    // for (let i=0;i<this.questions.length;i++) {
    //   this.questions[i].questionId=i+1
    //   for (let j=0;j<this.questions[i].reponses.length;j++) {
    //     this.questions[i].reponses[j].reponseId=j+1
    //   }
    // }

    
    this.router.navigateByUrl('/finished')

  }

}