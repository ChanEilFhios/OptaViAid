import { LitElement, html } from '@polymer/lit-element';
import { SharedStyles } from './shared-styles.js';

class DailyGreen extends LitElement {
  _changedGreen(e) {
    this.dispatchEvent(new CustomEvent('change', {detail: {originalEvent: e, green: this.choice}}));
  }
  
  _render(props) {
    const id = `green${this.index}`;
    
    return html`
      ${SharedStyles}
      
      <style>
        input {
          width: 7em;
        }
      </style>

      <div class="logPill green" id="${id}">${this.index}<input type="text" value="${this.choice}" on-change="${(e) => this._changedGreen(e)}" /></div>
    `;
  }
  
  static get properties() { return {
    index: Number,
    choice: String
  }}

  constructor() {
    super();
    this.choice = '';
    this.index = -1;
  }
}

window.customElements.define('daily-green', DailyGreen);
