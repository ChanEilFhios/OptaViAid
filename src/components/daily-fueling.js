import { LitElement, html } from '@polymer/lit-element';
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
        
        input[type="time"] {
          margin-left: 0.25em;
          border: none;
        }
        
        button {
          padding: 0;
          border: none;
          background: transparent;
        }
      </style>
      
      <div id="${id}">${this.index}<input on-change="${(e) => this._checkChanged(e)}" min="00:00" max="24:00" type="time" value="${this.time}" /><button on-click="${() => this._setTime()}">${clock}</button></div>
    `;
  }
  
  _setTime() {
    this.time = new Date().toTimeString().match(/^\d\d:\d\d/)[0]
  }
  
  _checkChanged(e) {
    this.time = e.target.value;
    this.dispatchEvent(new CustomEvent('change', {detail: {originalEventArgs: e, fueling: this}}))
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
