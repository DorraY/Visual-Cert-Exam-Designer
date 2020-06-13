import { Component, OnInit, ViewChild } from '@angular/core';
import { Choix } from '../shared/choice';
import { ChoixService } from '../services/choix.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuestionService } from '../services/question-service';
import { Question } from '../shared/question';

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
  ReponseIndex=1

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
    private fb: FormBuilder, 
     private router: Router
    ) { }

  ngOnInit() {
    
    this.associatedExam = this.activatedRoute.snapshot.params['exId']
    console.log(this.associatedExam)
    this.associatedQuestion = this.activatedRoute.snapshot.params['quId']
    console.log(this.associatedQuestion)
    this.createForm()
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


  ajouterQuestion() {
    this.router.navigate(['/questions-interface',this.associatedExam])
  }

  terminer() {
    this.router.navigateByUrl('/finished')
  }
}
