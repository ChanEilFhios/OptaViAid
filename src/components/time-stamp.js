import { LitElement, html } from '@polymer/lit-element';
import { clock } from './my-icons.js';

class TimeStamp extends LitElement {
  _render(props) {
    return html`
      <style>
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
      
      <button title="Use the current time" on-click="${(e) => this._setToNow(e)}">${clock}</button>
      <input on-change="${(e) => this._timeChanged(e)}" min="00:00" max="24:00" type="time" value="${this.time}" />
    `;
  }
  
  _setToNow(e) {
    this._setTime(new Date().toTimeString().match(/^\d\d:\d\d/)[0], e);
  }
  
  _timeChanged(e) {
    this._setTime(e.target.value, e);
  }
  
  _setTime(time, e) {
    this.time = time;
    this.dispatchEvent(new CustomEvent('change', {detail: {originalEvent: e, newTime: this.time}}))
  }
  
  static get properties() { return {
    time: String
  }}

  constructor() {
    super();
    this.time = '';
  }
}

window.customElements.define('time-stamp', TimeStamp);
