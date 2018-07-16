import { LitElement, html } from '@polymer/lit-element';
import * as TimeStamp from './time-stamp.js';
import { SharedStyles } from './shared-styles.js';

class DailyFueling extends LitElement {
  _render(props) {
    const id = `fueling${this.index}`;
    
    return html`
      ${SharedStyles}

      <div class="logPill fueling" id="${id}">${this.index}<time-stamp time="${this.time}" on-change="${(e) => this._timeChanged(e)}"></time-stamp></div>
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
