import { Component, OnInit } from '@angular/core';

import { Model3Service } from '../models/model3.service';
import { DataPreparer } from '../shared/data-preparer';

@Component({
  selector: 'app-model3',
  templateUrl: './model3.component.html',
  styleUrls: ['./model3.component.scss'],
  providers: [DataPreparer, Model3Service]
})
export class Model3Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
