import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit, AfterViewInit {

  constructor(private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document) {
    this.viewerHeight = this.IsSettingsOpen ? 70 : 100;
    this.viewerWidth = this.properties ? 69.5 : 80.8;

    
  }

  ngOnInit(): void {
    const s = this.renderer2.createElement('script');
    s.type = 'text/javascript';
    s.text = `
var viewer;
var options = {
    env: 'AutodeskProduction',
    api: 'derivativeV2',  // for models uploaded to EMEA change this option to 'derivativeV2_EU'
    getAccessToken: function(onTokenReady) {
        var token = 'eyJhbGciOiJIUzI1NiIsImtpZCI6Imp3dF9zeW1tZXRyaWNfa2V5In0.eyJzY29wZSI6WyJkYXRhOnJlYWQiLCJkYXRhOndyaXRlIiwiZGF0YTpjcmVhdGUiLCJidWNrZXQ6cmVhZCIsImJ1Y2tldDpjcmVhdGUiXSwiY2xpZW50X2lkIjoiSTFuemI0MXFUenJrajdRSTJwUzdLUWoxenRQR2J0ZDkiLCJhdWQiOiJodHRwczovL2F1dG9kZXNrLmNvbS9hdWQvand0ZXhwNjAiLCJqdGkiOiJyd0lkYnVGR2IzQ1R6bjRlN2hHb2k4ajByTU13MDI0UWswVVdoSDFHRHEyQWVUbWtNVWRlNzFFbUx6N2h0MXptIiwiZXhwIjoxNjA1MjY1MjE4fQ.WOR6V8i4zn6O-w25iBFbJHUxWNR0CP3ygtk0vL4DPKk';
        var timeInSeconds = 3600; // Use value provided by Forge Authentication (OAuth) API
        onTokenReady(token, timeInSeconds);
    }
};

Autodesk.Viewing.Initializer(options, function() {

    var htmlDiv = document.getElementById('forgeViewer');
    viewer = new Autodesk.Viewing.GuiViewer3D(htmlDiv);
    var startedCode = viewer.start();
    if (startedCode > 0) {
        console.error('Failed to create a Viewer: WebGL not supported.');
        return;
    }

    console.log('Initialization complete, loading a model next...');

});
`;
    this.renderer2.appendChild(this._document.body, s);
  }

  ngAfterViewInit() {
    const s = this.renderer2.createElement('script');
    s.type = 'text/javascript';
    s.text = `
    var documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Y21yZHdmL0Rvb3IuaXB0';
Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);

function onDocumentLoadSuccess(viewerDocument) {
    var defaultModel = viewerDocument.getRoot().getDefaultGeometry();
    viewer.loadDocumentNode(viewerDocument, defaultModel);
}

function onDocumentLoadFailure() {
    console.error('Failed fetching Forge manifest');
}
`;
    this.renderer2.appendChild(this._document.body, s);
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

  scenePath: string = "";
  itemName: string = "";
  itemColor: string = "";

  IsSettingsOpen: boolean = false;

  viewerHeight: number;
  viewerWidth: number;



  sidebarFunction() {
    this.sidebar = !this.sidebar;
    if (this.sidebar == true) {
      this.sidebarbuttontext = "<";
      if (this.properties == true) {
        this.viewerWidth = 69.5;
      }
      else {
        this.viewerWidth = 80.8;
      }

    }
    else {
      this.sidebarbuttontext = ">";
      if (this.properties == true) {
        this.viewerWidth = 80.8;
      }
      else {
        this.viewerWidth = 97;
      }
    }
  }
  colorSettingsFunction() {
    this.scaleSettings = false;
    this.sceneSettings = false;
    this.colorSettings = !this.colorSettings;
    this.IsSettingsOpen = this.colorSettings ? true : false;
    this.viewerHeight = this.IsSettingsOpen ? 70 : 100;
  }
  scaleSettingsFunction() {
    this.colorSettings = false;
    this.sceneSettings = false;
    this.scaleSettings = !this.scaleSettings;
    this.IsSettingsOpen = this.scaleSettings ? true : false;
    this.viewerHeight = this.IsSettingsOpen ? 70 : 100;
  }
  sceneSettingsFunction() {
    this.colorSettings = false;
    this.scaleSettings = false;
    this.sceneSettings = !this.sceneSettings;
    this.IsSettingsOpen = this.sceneSettings ? true : false;
    this.viewerHeight = this.IsSettingsOpen ? 70 : 100;
  }

  saveFunction() {
    this.colorSettings = false;
    this.scaleSettings = false;
    this.sceneSettings = false;
    this.properties = false;
    this.IsSettingsOpen = false;
    this.viewerHeight = this.IsSettingsOpen ? 70 : 100;
    this.viewerWidth = 80.8;

  }
  propertiesFunction() {
    this.properties = !this.properties;

    if (this.properties == true) {
      this.propertiesbuttontext = ">";
      this.viewerWidth = 69.5;

      if (this.sidebar == true) {
        this.viewerWidth = 69.5;
      }
      else {
        this.viewerWidth = 80.8;
      }
    }
    else {
      this.propertiesbuttontext = "<";
      this.viewerWidth = 80.8;

      if (this.sidebar == true) {
        this.viewerWidth = 80.8;
      }
      else {
        this.viewerWidth = 97;
      }

    }
  }

  galleryItems = [
    { imgSrc: '../../assets/img/scenes/scene (1).jpg' },
    { imgSrc: '../../assets/img/scenes/scene (2).jpg' },
    { imgSrc: '../../assets/img/scenes/scene (3).jpg' },
    { imgSrc: '../../assets/img/scenes/scene (4).jpg' },
    { imgSrc: '../../assets/img/scenes/scene (5).jpg' }

  ];

  changeSceneFunction(scenePath) {
    this.scenePath = scenePath;
  }

  resetSceneFunction() {
    this.scenePath = "";
  }

  mainItems = [
    { name: 'Cube', color: '#ffffff' },
    { name: 'Sphere', color: '#ffffff' },
    { name: 'Square', color: '#ffffff' },
    { name: 'Cylinder', color: '#ffffff' }
  ]

  itemLoad(itemName) {
    this.itemName = itemName;

  }

  changeColor(itemColor) {
    this.itemColor = itemColor;
  }




}
