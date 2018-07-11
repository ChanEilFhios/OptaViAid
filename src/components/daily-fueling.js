import { LitElement, html } from '@polymer/lit-element';

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
        
        div > input {
          margin-left: 0.25em;
          border: none;
        }
      </style>
      
      <div id="${id}">${this.index}<input min="00:00" max="24:00" type="time" value="${this.time}" /></div>
    `;
  }
  
  _checkChanged(...args) {
    this.time = new Date().toLocaleTimeString().match(/(\d\d:\d\d)(?::\d\d)?( AM|PM)?/).slice(1,3).join('');
    this.dispatchEvent(new CustomEvent('change', {detail: {originalArgs: args, fueling: this}}))
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
