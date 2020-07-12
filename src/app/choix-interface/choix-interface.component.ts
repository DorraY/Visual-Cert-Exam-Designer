import { Component, OnInit, ViewChild } from '@angular/core';
import { Choix } from '../shared/choice';
import { ChoixService } from '../services/choix.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuestionService } from '../services/question-service';
import { Question } from '../shared/question';
import { MatDialog } from '@angular/material';
import { QuestionsComponent } from '../questions/questions.component';
import { ChoicesComponent } from '../choices/choices.component';

@Component({
  selector: 'app-choix-interface',
  templateUrl: './choix-interface.component.html',
  styleUrls: ['./choix-interface.component.css']
})
export class ChoixInterfaceComponent implements OnInit {

  choix: Choix = new Choix()
  @ViewChild('cform') choixFormDirective
  ChoixForm: FormGroup
  associatedExam: number
  associatedQuestion: number
  reponseCorrect=false
  ReponseIndex
  existingChoices

  formErrors= {
    'enonce': ''
  }

  validationMessages = {
    'enonce': {
      'required' : 'Une énoncé de la réponse est obligatoire'
    }
  }

  constructor(private choixService: ChoixService,
    private questionService: QuestionService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder, 
     private router: Router
    ) { }


  ngOnInit() {
    this.existingChoices=[]
    this.associatedExam = this.activatedRoute.snapshot.params['exId']
    console.log(this.associatedExam)
    this.associatedQuestion = this.activatedRoute.snapshot.params['quId']
    console.log(this.associatedQuestion)
    this.createForm()
    
    this.reloadExisitngChoiceOrdre()
  }
  createForm() {
    this.ChoixForm = this.fb.group( {
      enonce: ['', Validators.required],
      correct: [null]
    })

    this.ChoixForm.valueChanges.subscribe( data => 
      this.onValueChanged(data))
  this.onValueChanged()
  }

  onValueChanged(data?:any) {
    if (!this.ChoixForm) {return ;}
    const form = this.ChoixForm 
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {   
        this.formErrors[field] = ''
        const control = form.get(field)
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field]
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
               console.log(control.errors) 
              this.formErrors[field] +=messages[key] + ''
            } 
          }
        }
      }
    }
  }

  reset() {
    this.ChoixForm.reset({
      enonce: '',
      correct: false
    })
    this.choixFormDirective.resetForm()
  }

  ajouterChoix() {
    this.reponseCorrect ? this.choix.chCorrect=1 : this.choix.chCorrect=0
    this.choix.choixOrdre=this.ReponseIndex
    this.questionService.getQuestion(this.associatedQuestion).subscribe(
      (data) => {
        this.choix.chQuCode = <Question> data
        console.log(this.choix)
        this.choixService.createChoix(this.choix).subscribe(
          (data) => {
            console.log(data)
            this.ReponseIndex++

          }
        )      
        , error => console.log(error)
      }
    ), error => console.log(error)
    
  }

  openExistingResponses() {
    this.dialog.open(ChoicesComponent,{width:'800px',height:'500px'})
  }

  reloadExisitngChoiceOrdre() {
    this.choixService.getChoixList().subscribe(data => {
      for (let i=0;i<data.length;i++) {
        if(data[i].chQuCode.quCode==this.associatedQuestion) { 
          this.existingChoices.push(data[i])
        }
      }
      this.ReponseIndex = (Math.max.apply(Math, 
        this.existingChoices.map(function(o) { return o.choixOrdre; }))) +1
      if (this.ReponseIndex===-Infinity) {
        this.ReponseIndex=1
      }
    }) 
    console.log(this.existingChoices)
    console.log(this.ReponseIndex)
  
  }


  ajouterQuestion() {
    this.router.navigate(['/questions-interface',this.associatedExam])
  }

  terminer() {
    this.router.navigateByUrl('/finished')
  }
}
