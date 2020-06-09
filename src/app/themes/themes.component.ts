import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Theme } from '../shared/theme';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css']
})
export class ThemesComponent implements OnInit {
  
  @ViewChild('tform') themeFormDirective
  ThemeForm:FormGroup
  theme: Theme= new Theme()


  formErrors = {
    'themeNom': ''
  }

  validationMessages = {
    'themeNom': {
      'required': 'Le nom est obligatoire'
    }
  }

  themes

  constructor(private themeService: ThemeService,
    private fb: FormBuilder, 

    ) { }

  ngOnInit() {
    this.createForm()
    this.themes = []
    this.reloadThemes()
    console.log(this.themes)
  }

  reloadThemes() {
    this.themeService.getThemeList().subscribe(
      (data) => {
        for (let i=0;i<data.length;i++) {
          this.themes.push(data[i])
        }
      }
    ) 
  }

  createForm() {
    this.ThemeForm = this.fb.group({
      themeNom: ['', Validators.required ],
      
    })

    this.ThemeForm.valueChanges.subscribe( data => 
        this.onValueChanged(data))
    this.onValueChanged()
  }

  onValueChanged(data?:any) {
    if (!this.ThemeForm) {return ;}
    const form = this.ThemeForm 
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
    this.ThemeForm.reset({
      themeNom: ''
    })
    this.themeFormDirective.resetForm()
  }

  UpdateTheme(id:number) {
    console.log(document.querySelector('#themeNom').nodeValue)
    document.querySelector('#themeNom').nodeValue = "test"
    console.log(id)
    this.themeService.getTheme(id).subscribe(
      (data) => {
        console.log(data)
        

      }
    )
    
    


  }

  

  onSubmit() {
    
    this.theme.thNom = this.theme.thNom.trim()
    this.themeService.createTheme(this.theme).subscribe(
      data =>  {  
        console.log(data)
        location.reload()
        
        
      }
      , error => console.log(error)
    )
    this.reset()

  }
  




}
