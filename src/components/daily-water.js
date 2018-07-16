import { LitElement, html } from '@polymer/lit-element';
import { SharedStyles } from './shared-styles.js';

class DailyWater extends LitElement {
  _render(props) {
    const id = `green${this.index}`;
    
    const markup = html`
      ${SharedStyles}
      
      <style>
        .glass {
          position: relative;
          width:1em;
          height: 2em;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          color: grey;
          border: none;
          background: none;
          margin: 0;
          padding: 0;
        }
        
        .empty:before {
          content: "";
          position: absolute;
          border: 1px solid grey;
          border-bottom-right-radius: 0.15em;
          border-bottom-left-radius: 0.15em;
          background: linear-gradient(
            to bottom,
            white,
            white 85%,
            var(--water-color) 10%,
            var(--water-color)
          );
      
          top: -4%; bottom: -25%; left: -3%; right: -3%;
          z-index: -1;
      
          -webkit-transform: perspective(5em) rotateX(-30deg);
          transform: perspective(5em) rotateX(-30deg);
        }
        
        .full:before {
          content: "";
          position: absolute;
          border: 1px solid grey;
          border-bottom-right-radius: 0.15em;
          border-bottom-left-radius: 0.15em;
          background: linear-gradient(
            to bottom,
            white,
            white 15%,
            var(--water-color) 10%,
            var(--water-color)
          );
      
          top: -4%; bottom: -25%; left: -3%; right: -3%;
          z-index: -1;
      
          -webkit-transform: perspective(5em) rotateX(-30deg);
          transform: perspective(5em) rotateX(-30deg);
        }
      </style>

      <button
        title="record a glass of water"
        class$="glass ${this.drunk ? 'empty' : 'full'}"
        id="${id}"
        on-click="${(e) => this._toggleDrunk(e)}"
      >
        ${this.index}
      </button>
    `;
    
    return markup;
  }
  
  _toggleDrunk(e) {
    this.drunk = !this.drunk;
  }
  
  static get properties() { return {
    index: Number,
    drunk: Boolean
  }}

  constructor() {
    super();
    this.drunk = false;
    this.index = -1;
  }
}

window.customElements.define('daily-water', DailyWater);