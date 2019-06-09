import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss']
})
export class AnalyzeComponent implements OnInit {

  @Input() mins = null;
  @Input() maxs = null;
  @Input() averages = null;

  constructor() { }

  ngOnInit() {
  }

}
