import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-aide',
  templateUrl: './aide.component.html',
  styleUrls: ['./aide.component.css']


})
export class AideComponent implements OnInit {


  constructor(private router: Router,public dialogRef: MatDialogRef<AideComponent>  ) { }

  paragraphe1 = ''
  paragraphe2 = ''
  paragraphe3 = ''


  ngOnInit() {
    switch (this.router.url) {
      case "/home":
        this.paragraphe1 = "Cliquez sur le premier button pour créer une nouveau examen"
        this.paragraphe2 = "Cliquez sur le deuxième button pour charger un examen existant"
        break;
      case "/questions-interface":
        this.paragraphe1 = "Tous les champs sont obligatoire. Pour indiquer qu'une réponse est correcte, veuillez cocher sa case."
        this.paragraphe2 = "Pour valider votre question actuelle et ajouter une autre question, cliquez sur ajout question. Si vous voulez terminer l'examen, cliquer sur valider examen."

      case "/existing-exams"  :
        this.paragraphe1 = "Vous trouvez ici tous les examens enregistrés."
        this.paragraphe2 = "Vous pouvez ensuite supprimer un certain examen, ou bien le modifier/consulter en détails."

        break
      case "/exam-interface":
        this.paragraphe1 = "Tous les champs sont obligatoires. "
        this.paragraphe2 = "Le score et la durée doivent être des entiers positifs. La durée maximale est 360 minutes"
        break;
      case "/themes":
          this.paragraphe1 = "Vous pouvez insérer, supprimer et visualiser vos thèmes ici. "
          this.paragraphe2 = ""
          break;
    }


  }

  ngOnDestroy()	{
    this.dialogRef.close()
  }

}
