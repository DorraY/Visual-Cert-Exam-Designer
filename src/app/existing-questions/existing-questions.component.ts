import { Component, OnInit } from '@angular/core';
import { ExamService } from '../services/exam-service';
import { Observable } from 'rxjs';
import { DataTransferService } from '../services/data-transfer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionService } from '../services/question-service';
import { Question } from '../shared/question';
import { Explication } from '../shared/explication';
import { ExplicationService } from '../services/explication.service';
import { Choix } from '../shared/choice';
import { ChoixService } from '../services/choix.service';
import { ChoicesComponent } from '../choices/choices.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-existing-questions',
  templateUrl: './existing-questions.component.html',
  styleUrls: ['./existing-questions.component.css']
})
export class ExistingQuestionsComponent implements OnInit {

  questions: Observable<Question[]>
  questionsArray: Question[]
  examId: number
  explications: Observable<Explication[]>
  explicationsArray: Explication[]
  choixArray: Choix[]
  choix: Observable<Choix[]>
  questionExplicationCorrespondance

  constructor(
    private examService: ExamService, 
    private router: Router,
    public dialog: MatDialog,
    private dataTransferService: DataTransferService,
    private questionsService: QuestionService,
    private route: ActivatedRoute,
    private explicationService: ExplicationService,
    private choixService: ChoixService

    ) 
  { }

  async ngOnInit() {
    this.examId = this.route.snapshot.params['id']
    this.questionExplicationCorrespondance=[]
    this.questionsArray=[]
    this.explicationsArray=[]
    this.reloadData()
    console.log(this.questionsArray)

  }

  reloadData() {
    this.explications = this.explicationService.getExplicationList()
    this.explications.subscribe((explication) => {
      let i=0
      while(i!==explication.length) {
        this.explicationsArray.push(explication[i])
        //console.log(explication[i])
        i++
      }
    }) 
    //console.log(this.explicationsArray)

    this.questions = this.questionsService.getQuestionList()
    this.questions.subscribe((question) =>   
    {
      let i=0
      while (i!==question.length) {
        if (question[i].exCode.exId==this.examId) {
          
          for (let j=0;j<this.explicationsArray.length;j++) {
            if (question[i].quCode==this.explicationsArray[j].exQucode.quCode) {
              question[i].Explication = this.explicationsArray[j]
              this.questionsArray.push(question[i])
              
            }
          }
        }
        i++
      }
    }  )
    console.log(this.questionsArray)



    
  }

  deleteQuestion(id: number) {
    let associatedExplicationId 

    this.questionsService.deleteQuestion(id).subscribe(
      data =>
      {
        console.log(data) 
        location.reload()
      }, error => console.log(error)
    )
  }

  updateQuestion(id:number) {
    this.router.navigate(['/question-details',this.examId,id])

  }

  addNewQuestion() {

    let maximumQuestionOrdre = Math.max.apply(Math, this.questionsArray.map(function(question) 
    { return question.quOrdre }))
    
    this.dataTransferService.setpreviewdata(maximumQuestionOrdre)

    this.router.navigate(['questions-interface', this.examId] )
  }

  afficheChoix(quCode: number) {
    console.log(quCode)
    this.dialog.open(ChoicesComponent,
      {width:'800px',height:'500px',
      data: {
        questionCode: quCode
      }
    })
  }

}