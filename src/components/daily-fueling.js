import { LitElement, html } from '@polymer/lit-element';
import * as TimeStamp from './time-stamp.js';
import { clock } from './my-icons.js';

const fuelingColor = '#2E578D';

class DailyFueling extends LitElement {
  _render(props) {
    const id = `fueling${this.index}`;
    
    return html`
      <style>
        div {
          font-size: 16px;
          cursor: pointer;
          
          margin: 0.25em;
          padding: 0.25em;

          border: 2px solid black;
          border-color: #2E578D;
          border-radius: 0.5em;
          
          background-color: white;
          color: #2E578D44;
        }
      </style>
      
      <div id="${id}">${this.index}<time-stamp time="${this.time}" on-change="${(e) => this._timeChanged(e)}"></time-stamp></div>
    `;
  }
  
  _timeChanged(e) {
    this.time = e.detail.newTime;
    this.dispatchEvent(new CustomEvent('change', {detail: {originalEvent: e, fueling: this}}))
  }

  static get properties() { return {
    index: Number,
    time: String,
    choice: String
  }}

  constructor() {
    super();
    this.time = '';
    this.choice = '';
    this.index = -1;
  }
}

window.customElements.define('daily-fueling', DailyFueling);
