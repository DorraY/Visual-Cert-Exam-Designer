import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../shared/question';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { QuestionsComponent } from '../questions/questions.component';
import { QuestionService } from '../services/question-service';
import { ChoixService } from '../services/choix.service';
import { Choix } from '../shared/choice';
import {MAT_DIALOG_DATA} from '@angular/material';



@Component({
  selector: 'app-choices',
  templateUrl: './choices.component.html',
  styleUrls: ['./choices.component.css']
})
export class ChoicesComponent implements OnInit {

  choices: Observable<Choix[]>
  choicesArray: Choix[]
  questionId

  constructor(private router: Router,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<ChoicesComponent> ,
    private choixService: ChoixService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit() {
    this.choicesArray = []
    this.questionId = (this.router.url.split('/')[3])
    console.log(this.questionId)
    console.log(this.data)
    this.questionId===undefined ? this.questionId=this.data.questionCode : this.questionId=this.questionId
    this.reloadData()
    console.log(this.questionId)
  }

  reloadData() {
    this.choices = this.choixService.getChoixList()
    this.choices.subscribe((choices) => {
      let i=0
      while (i!==choices.length) {
        if (choices[i].chQuCode.quCode==this.questionId) {
          this.choicesArray.push(choices[i])
        }
        i++
      }
    })
    console.log(this.choicesArray)
  }

}
