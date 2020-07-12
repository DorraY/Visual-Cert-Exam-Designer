import { Component, OnInit, ViewChild } from '@angular/core';
import { ChapterService } from '../services/chapter.service';
import { Chapter } from '../shared/chapter';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-chapitres',
  templateUrl: './chapitres.component.html',
  styleUrls: ['./chapitres.component.css']
})
export class ChapitresComponent implements OnInit {

  @ViewChild('tform') themeFormDirective
  ChapitreForm:FormGroup
  chapitre: Chapter= new Chapter()


  formErrors = {
    'chapitreNom': ''
  }

  validationMessages = {
    'chapitreNom': {
      'required': 'Le nom est obligatoire'
    }
  }

  chapters

  constructor(private chapterService: ChapterService,
    private fb: FormBuilder, 

    ) { }

  ngOnInit() {
    this.createForm()
    this.chapters = []
    this.reloadChapters()
    console.log(this.chapters)
  }

  reloadChapters() {
    this.chapterService.getChapterList().subscribe(
      (data) => {
        for (let i=0;i<data.length;i++) {
          this.chapters.push(data[i])
        }
      }
    ) 
  }

  createForm() {
    this.ChapitreForm = this.fb.group({
      chapitreNom: ['', Validators.required ],
      
    })

    this.ChapitreForm.valueChanges.subscribe( data => 
        this.onValueChanged(data))
    this.onValueChanged()
  }

  onValueChanged(data?:any) {
    if (!this.ChapitreForm) {return ;}
    const form = this.ChapitreForm 
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
    this.ChapitreForm.reset({
      themeNom: ''
    })
    this.themeFormDirective.resetForm()
  }

  DeleteChapter(id:number) {
    console.log(id)
    this.chapterService.deleteChapter(id).subscribe(
      (data) => {
        console.log(data)
        location.reload()


      }
    )
    
    


  }

  

  onSubmit() {
    
    this.chapitre.chNom=this.chapitre.chNom.trim()
    this.chapterService.createChapter(this.chapitre).subscribe(
      data =>  {  
        console.log(data)
        location.reload()        
      }
      , error => console.log(error)
    )
    this.reset()

  }
}
