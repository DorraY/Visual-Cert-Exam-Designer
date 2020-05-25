import { Component, OnInit } from '@angular/core';
import { ExamService } from '../services/exam-service';
import { Observable } from 'rxjs';
import { Exam } from '../shared/exam';
import { DataTransferService } from '../services/data-transfer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionService } from '../services/question-service';
import { Question } from '../shared/question';
import { Explication } from '../shared/explication';
import { ExplicationService } from '../services/explication.service';

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

  


  constructor(
    private dataTransferService: DataTransferService , 
    private examService: ExamService, 
    private router: Router,
    private questionsService: QuestionService,
    private route: ActivatedRoute,
    private explicationService: ExplicationService

    ) 
  { }

  async ngOnInit() {
    this.examId = this.route.snapshot.params['id']

    this.questionsArray=[]
    this.explicationsArray=[]
    this.reloadData()
    console.log(this.questionsArray)

  }

  reloadData() {
    this.questions = this.questionsService.getQuestionList()
    this.questions.subscribe((question) =>   
    {
      let i=0
      while (i!==question.length) {
        if (question[i].exCode.exId==this.examId) {
          this.questionsArray.push(question[i])
        }
        i++
      }
    }  )

    this.explications = this.explicationService.getExplicationList()
    this.explications.subscribe((explication) => {
      let i=0
      while(i!==explication.length) {
        this.explicationsArray.push(explication[i])
        console.log(explication[i])
        i++
      }
    }) 
    console.log(this.explicationsArray)
  }

  deleteQuestion(id: number) {
    this.questionsService.deleteQuestion(id).subscribe(
      data =>
      {
        console.log(data) 
        location.reload()
      }, error => console.log(error)
    )
  }

  updateQuestion(id:number) {
    //this.dataTransferService.setpreviewdata(this.examsArray[id-1])
    this.router.navigate(['question-details', id] )
  }

}