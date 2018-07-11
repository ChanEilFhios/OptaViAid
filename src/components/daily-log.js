import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

// These are the components used by this page.
import * as dailyFueling from './daily-fueling.js';

class DailyLog extends PageViewElement {
  _fuelingChanged(e) {
    console.log('fuelingChanged', e);
  }
  
  _render(props) {
    return html`
      ${SharedStyles}
      
      <style>
        :host {
          height: 100%;
          width: 100%;
          margin: 0;
          overflow: scroll;
        }
        
        form {
          margin: 0.25em;
          display:grid;
        }
        
        #fuelingsWrapper {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
        }
        
        daily-fueling {
          margin: auto;
        }
      </style>
      
      <form>
        <label for="logdate">
          Log Date:
          <input id="logdate" type="date" />
        </label>
        
          <Label for="fuelingsWrapper">
            Fuelings:
            <div id="fuelingsWrapper">
              <daily-fueling index="1" on-change="${(e) => this._fuelingChanged(e)}"></daily-fueling>
              <daily-fueling index="2" on-change="${(e) => this._fuelingChanged(e)}"></daily-fueling>
              <daily-fueling index="3" on-change="${(e) => this._fuelingChanged(e)}"></daily-fueling>
              <daily-fueling index="4" on-change="${(e) => this._fuelingChanged(e)}"></daily-fueling>
              <daily-fueling index="5" on-change="${(e) => this._fuelingChanged(e)}"></daily-fueling>
            </div>
          </label>
          
          <label for="leans">
            
          </label>
          
          <label for="greens">
            
          </label>
          
          <label for="water">
          
          </label>
      </form>
    `;
  }
}

window.customElements.define('daily-log', DailyLog);
