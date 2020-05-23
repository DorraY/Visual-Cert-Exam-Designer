import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Exam, Themes } from '../shared/exam';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamService } from '../services/exam-service';
import { DataTransferService } from '../services/data-transfer.service';

@Component({
  selector: 'app-exam-details',
  templateUrl: './exam-details.component.html',
  styleUrls: ['./exam-details.component.css']
})
export class ExamDetailsComponent implements OnInit {
  
  @ViewChild('eform') examFormDirective
  ExamenForm: FormGroup
  exam: Exam
  themes=Themes
  examId: number
  
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

  constructor(private router: Router,private fb: FormBuilder, 
    private examService: ExamService,
    private route: ActivatedRoute,
    private dataTransferService: DataTransferService
    ) {  

  }


  ngOnInit() {
    this.examId = this.route.snapshot.params['id'];

    this.dataTransferService.getpreviewMessage().subscribe(examen =>    
    {
        this.exam = examen
    })
    this.createForm()

    this.examService.getExam(this.examId).subscribe(
      data => {
        console.log(data)
        this.exam = data
      } , error => console.log(error)
    )
    console.log(this.exam)
    }

  updateExam() {
    this.examService.updateExam(this.examId, this.exam).subscribe(
      data => console.log(data), error => console.log(error)
    )
    this.exam = new Exam()

  
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
      theme: [this.exam.exThCode.thNom, Validators.required ],
      
      nom: [this.exam.exNom,Validators.required],
      score: [this.exam.exScore,Validators.required],
      temps: [this.exam.exTime,[Validators.required, Validators.max(360)]],
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
    console.log(this.exam.exNom)
    console.log("clicked")
    this.ExamenForm.reset({
      theme: this.exam.exThCode,
      nom: this.exam.exNom,
      score: this.exam.exScore,
      temps: this.exam.exTime,
    })
    this.examFormDirective.resetForm()

  }

  onSubmit() {
    this.updateExam()
    if (!this.themes.includes(this.exam[Object.keys(this.exam)[0]].trim())) {
      Themes.push(this.exam[Object.keys(this.exam)[0]])
    }
    
    

  }
  
}