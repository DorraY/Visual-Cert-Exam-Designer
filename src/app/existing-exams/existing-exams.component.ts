import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Exam } from '../shared/exam';
import { ExamService } from '../services/exam-service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { DataTransferService } from '../services/data-transfer.service';
import { QuestionService } from '../services/question-service';
import { ChoixService } from '../services/choix.service';
import { ExplicationService } from '../services/explication.service';

@Component({
  selector: 'app-existing-exams',
  templateUrl: './existing-exams.component.html',
  styleUrls: ['./existing-exams.component.css']
})
export class ExistingExamsComponent implements OnInit {
  exams: Observable<Exam[]>
  examsArray: Exam[]
  
  constructor(
    private examService: ExamService,
    private router: Router,
    private questionService: QuestionService,
    private choixService: ChoixService,
    private explicationService: ExplicationService) 
  { }

  async ngOnInit() {
    this.examsArray=[]
    this.reloadData()
    //console.log(this.examsArray)
  }

  reloadData() {
    this.exams = this.examService.getExamList()
    this.exams.subscribe((exams) => 
     {  
       let i=0
       while (i!==exams.length) {
        this.examsArray.push(exams[i])
        i++
       }
     })
  }

  deleteExam(id: number) {

    this.examService.deleteExam(id).subscribe(
      data =>
      {
        console.log(data) 
        location.reload()
      }, error => console.log(error)
    )
  }

  updateExam(id:number) {
  //  this.dataTransferService.setpreviewdata(this.examsArray[id-1])
    this.router.navigate(['exam-details', id] )
  }

}
