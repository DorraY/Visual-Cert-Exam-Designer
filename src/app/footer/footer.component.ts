import { Component, OnInit } from '@angular/core';
import { AboutComponent } from '../about/about.component';

import { MatDialog, MatDialogRef } from '@angular/material';
import { AideComponent } from '../aide/aide.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  openAbout() {
    this.dialog.open(AboutComponent,{width:'500px',height:'450px'})
  }
  openAide(){
    this.dialog.open(AideComponent,{width:'500px',height:'450px'})
  }

}
