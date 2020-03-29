import { Component, OnInit, ViewChild, Input, Directive, ElementRef, Renderer2 } from '@angular/core';
import {Router} from '@angular/router'

import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import {Themes,Exam} from '../shared/exam'
import {Question} from '../shared/question'

import {routes} from '../app-routing/routes'

@Component({
  selector: 'app-exam-interface',
  templateUrl: './exam-interface.component.html',
  styleUrls: ['./exam-interface.component.css']
})

export class ExamInterfaceComponent implements OnInit {




  @ViewChild('eform') examFormDirective
  @ViewChild('nouveauTheme') nouveauTheme: ElementRef
  ExamenForm: FormGroup
  exam: Exam
  themes=Themes

  formErrors = {
    'newTheme': '',
    'theme': '',
    'nom': '',
    'temps': '',
    'score': ''

  }

  validationMessages = {
    'newTheme': {
      'newThemeValidator' : 'dsds'
    } , 

    'theme': {
      'required': 'Le thème est obligatoire'
    },
    'nom': {
      'required': 'Le nom est obligatoire'
    },
    'temps': {
      'pattern' : 'La durée est composée uniquement de chiffres',
      'required' : 'La durée est obligatoire',
      'max' : 'La durée maximum est 360 minutes',
    },
    'score' : {
      'pattern' : 'Le score est composé uniquement de chiffres',
      'required' : 'Le score est obligatoire',
      'min' : 'Le score est une valeur positive'
    }
  }

  constructor(private renderer: Renderer2, private router: Router,private fb: FormBuilder) { 
    
  }

  ngOnInit() {
    this.createForm()
  }

newThemeValidator(control: AbstractControl): { [key: string]: boolean } | null {
  console.log(control.value!==undefined)
  if (Themes.includes(control.value) ) {
      return { 'newTheme': true };
  }
  return null;
}

  createForm() {
    this.ExamenForm = this.fb.group({
      newTheme: new FormControl('', [this.newThemeValidator]),
      theme: ['', Validators.required ],
      nom: ['',Validators.required],
      score: [null,Validators.required],
      temps: [null,[Validators.required, Validators.max(360)]],
    })

    this.ExamenForm.valueChanges.subscribe( data => 
        this.onValueChanged(data))
    this.onValueChanged()

  }

  CreateNewTheme() {
    let newInput = this.renderer.createElement('div')
    this.nouveauTheme.nativeElement.innerHTML = '<input>'
    this.renderer.appendChild(this.nouveauTheme.nativeElement,newInput)
  }

  onValueChanged(data?:any) {
    if (!this.ExamenForm) {return ;}


    const form = this.ExamenForm
    
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
    this.ExamenForm.reset({
      newTheme: '',
      theme: '',
      nom: '',
      score: 0,
      temps: 0,
    })
    this.examFormDirective.resetForm()

  }

  onSubmit() {
    this.exam = this.ExamenForm.value
    
    if (!this.themes.includes(this.exam[Object.keys(this.exam)[0]])) {
      Themes.push(this.exam[Object.keys(this.exam)[0]])
    }
    console.log(this.exam)
    console.log(Themes)
    this.router.navigateByUrl('/questions-interface')

    this.reset()

  }
  

}
