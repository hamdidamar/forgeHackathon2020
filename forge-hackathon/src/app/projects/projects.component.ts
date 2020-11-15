import { Component, OnInit } from '@angular/core';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document
  ) { }

  ngOnInit(): void {
    const s1 = this.renderer2.createElement('script');
    s1.type = 'text/javascript';
    s1.src = '../assets/js/BoundBox.js';
    s1.text = ``;
    this.renderer2.appendChild(this._document.body, s1);
  }

}
