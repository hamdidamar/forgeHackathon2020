import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  sidebar: boolean = true;
  sidebarbuttontext: string = "<";
  propertiesbuttontext: string = ">";
  colorSettings: boolean = false;
  scaleSettings: boolean = false;
  sceneSettings: boolean = false;
  properties: boolean = true;
  scaleX: Float64Array;
  scaleY: Float64Array;
  scaleZ: Float64Array;

  scenePath: string="";
  itemName: string="";
  itemColor: string="";


  sidebarFunction() {
    this.sidebar = !this.sidebar;
    if (this.sidebar == true) {
      this.sidebarbuttontext = "<";
    }
    else {
      this.sidebarbuttontext = ">";
    }
  }
  colorSettingsFunction() {
    this.scaleSettings = false;
    this.sceneSettings = false;
    this.colorSettings = !this.colorSettings;
  }
  scaleSettingsFunction() {
    this.colorSettings = false;
    this.sceneSettings = false;
    this.scaleSettings = !this.scaleSettings;
  }
  sceneSettingsFunction() {
    this.colorSettings = false;
    this.scaleSettings = false;
    this.sceneSettings = !this.sceneSettings;
  }

  saveFunction() {
    this.colorSettings = false;
    this.scaleSettings = false;
    this.sceneSettings = false;
    this.properties = false;

  }
  propertiesFunction() {
    this.properties = !this.properties;

    if (this.properties == true) {
      this.propertiesbuttontext = ">";
    }
    else {
      this.propertiesbuttontext = "<";
    }
  }

  galleryItems = [
    {imgSrc: '../../assets/img/scenes/scene (1).jpg'},
    {imgSrc: '../../assets/img/scenes/scene (2).jpg'},
    {imgSrc: '../../assets/img/scenes/scene (3).jpg'},
    {imgSrc: '../../assets/img/scenes/scene (4).jpg'},
    {imgSrc: '../../assets/img/scenes/scene (5).jpg'}

    ];

  changeSceneFunction(scenePath){
    this.scenePath = scenePath;
  }

  resetSceneFunction(){
    this.scenePath = "";
  }

  mainItems = [
    {name: 'Cube',color:'#ffffff'},
    {name: 'Sphere',color:'#ffffff'},
    {name: 'Square',color:'#ffffff'},
    {name: 'Cylinder',color:'#ffffff'}
  ]

  itemLoad(itemName){
    this.itemName = itemName;
    
  }
  
  changeColor(itemColor){
    this.itemColor =itemColor;
  }
  

}
