import { Component, OnInit, ViewChild, Input, Directive, ElementRef, Renderer2 } from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router'
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import {Themes,Exam} from '../shared/exam'
import { ExamService } from '../services/exam-service';
import { DataTransferService } from '../services/data-transfer.service';
import { ThemeService } from '../services/theme.service';
import { Observable } from 'rxjs';
import { cp } from '@angular/core/src/render3';
import { Theme } from '../shared/theme';

@Component({
  selector: 'app-exam-interface',
  templateUrl: './exam-interface.component.html',
  styleUrls: ['./exam-interface.component.css']
})

export class ExamInterfaceComponent implements OnInit {
  
  @ViewChild('eform') examFormDirective
  ExamenForm: FormGroup
  exam: Exam= new Exam()
  theme: Theme= new Theme()
  themes
  updateRequest=false
  
  
  formErrors = {
    'theme': '',
    'nom': '',
    'temps': '',
    'score': ''

  }

  validationMessages = {
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
  constructor(private router: Router,
    private fb: FormBuilder, 
    private examService: ExamService,
    private dataTransferService: DataTransferService,
    private themeService: ThemeService
    ) {  
  }
  reloadThemes() {
    this.themeService.getThemeList().subscribe(
      (theme) => {
        for (let i=0;i<theme.length;i++) {
          this.themes.push(theme[i])
        }
      }
    )
  }

  // save(){
  //   this.examService.createExam(this.exam).subscribe(
  //     data =>  {  
  //       console.log(data)
  //     }
  //     , error => console.log(error)
  //   )
  //   this.exam = new Exam()    

  // }

  ngOnInit() {
    this.themes = []
    this.createForm()
    this.reloadThemes()
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
      theme: ['', Validators.required ],
      nom: ['',Validators.required],
      score: [null,Validators.required],
      temps: [null,[Validators.required, Validators.max(360)]],
    })

    this.ExamenForm.valueChanges.subscribe( data => 
        this.onValueChanged(data))
    this.onValueChanged()
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
      theme: '',
      nom: '',
      score: 0,
      temps: 0,
    })
    this.examFormDirective.resetForm()
  }

  

  onSubmit() {
    console.log(this.exam)
    
    this.examService.createExam(this.exam).subscribe(
      data =>  {  
        console.log(data)
        let properiete = (Object.keys(data)[0])
        

        
        
        
        this.router.navigate(['/questions-interface',data[properiete]])
      }
      , error => console.log(error)
    )
    this.reset()

  }
  

}
