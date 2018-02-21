import { Component } from '@angular/core';
import { ApiService } from './api.service'

import * as Plotly from 'plotly.js';
import {Config, Data, Layout} from 'plotly.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})

export class AppComponent {

  dots = <any>[];

  constructor(private ApiService: ApiService) {}

  ngOnInit() {
    this.ApiService.getDots().subscribe(
      data => {this.dots = data['data']},
      err => console.log(err),
      () => this.plotData()
    )
  }

  plotData() {
    let data = [{
      type: 'scattermapbox',
      lat: this.dots.map(d => d.lat),
      lon: this.dots.map(d => d.long),
      text: this.dots.map(d => d.qrtext),
      marker: {size: 14, color: "rgba(10,10,250,.5)"}
    }];

    let layout = {
      autosize: true,
      hovermode: 'closest',
      margin: {
        t: 20, //top margin
        l: 20, //left margin
        r: 20, //right margin
        b: 20 //bottom margin
      },
	  mapbox: {
		style: "light",
		bearing:0,
		center: {
			lat:40,
			lon:99
		}
	  }
    };

    Plotly.setPlotConfig({
      mapboxAccessToken: 'pk.eyJ1IjoiYW1lbGxuaWsiLCJhIjoiY2pkcXo2dnhuMjdxZTJ3bzRlNnJodWp6ZyJ9.9gjX--THlOHcPP580QlJ8w'
    });

    Plotly.plot('bigPlot', data, layout)
  }

}
