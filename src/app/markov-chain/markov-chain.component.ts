import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-markov-chain',
  templateUrl: './markov-chain.component.html',
  styleUrls: ['./markov-chain.component.scss']
})
export class MarkovChainComponent implements OnInit {
  config = [
    {
      type: 'button',
      name: 'add row',
      label: 'add row'
    },
    {
      type: 'button',
      name: 'add column',
      label: 'add column'
    }
  ];

  constructor() {}

  ngOnInit() {}
}
