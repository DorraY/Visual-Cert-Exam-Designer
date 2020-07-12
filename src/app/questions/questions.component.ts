import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionService } from '../services/question-service';
import { Observable } from 'rxjs';
import { Question } from '../shared/question';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  
  questions: Observable<Question[]>
  questionsArray: Question[]
  examId

  constructor(private router: Router,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<QuestionsComponent> ,
    private questionService: QuestionService) { }

  ngOnInit() {
    this.questionsArray=[]
    this.examId = (this.router.url.split('/')[2])
    this.reloadData()
    console.log(this.questionsArray)
  }
  reloadData() {
    console.log(this.examId)
    this.questions = this.questionService.getQuestionList()
    this.questions.subscribe((questions) => {
      let i=0
      while (i!==questions.length) {
        if (questions[i].exCode.exId==this.examId) {
          this.questionsArray.push(questions[i])
                 }
        i++
      }
    } ) 
    console.log(this.questionsArray)
  }

}
