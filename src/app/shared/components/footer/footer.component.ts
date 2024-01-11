import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentYear: number;
  constructor() {
    const currentDate = new Date();
    this.currentYear = currentDate.getFullYear();

   }

  ngOnInit() {
  }

}
