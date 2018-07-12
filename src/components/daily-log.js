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
        
        input[type="time"] {
          margin-left: 0.25em;
        }
        
        input[type="number"] {
          width: 4em;
        }
      </style>
      
      <form>
        <div id="dateweightwrapper">
          <label for="logdate">
            Log Date:
            <input id="logdate" type="date" />
          </label>
          
          <label for="weight">
            Weight:
            <input id="weight" type="number" min="1" />
            <select id="weightunits">
              <option value="lbs">Pounds</option>
              <option value="kg">Kilos</option>
            </select>
          </label>
        </div>
        
        <fieldset>
          <legend>Fuelings:</legend>
          <div id="fuelingsWrapper">
            <daily-fueling index="1" on-change="${(e) => this._fuelingChanged(e)}"></daily-fueling>
            <daily-fueling index="2" on-change="${(e) => this._fuelingChanged(e)}"></daily-fueling>
            <daily-fueling index="3" on-change="${(e) => this._fuelingChanged(e)}"></daily-fueling>
            <daily-fueling index="4" on-change="${(e) => this._fuelingChanged(e)}"></daily-fueling>
            <daily-fueling index="5" on-change="${(e) => this._fuelingChanged(e)}"></daily-fueling>
          </div>
        </fieldset>
        
        <fieldset id="leanandgreen">
          <legend>
            Lean and Green Meal:
          </legend>
          <fieldset id="leanpart">
            <legend>Lean:<input type="time" id="leantime" /></legend>
            <label for="leanest">
              <input type="radio" id="leanest" name="lean" />
              Leanest
            </label>
            <label for="leaner">
              <input type="radio" id="leaner" name="lean" />
              Leaner
            </label>
            <label for="lean">
              <input type="radio" id="lean" name="lean" />
              Lean
            </label>
          </fieldset>
          
          <fieldset id="greenpart">
            <legend>Green:<input type="time" id="greentime" />
          </fieldset>
        </fieldset>
        
        <fieldset id="water">
          <legend>Water:</legend>
        </fieldset>
        
        <fieldset id="optional">
          <legend>Optional:</legend>
          <label for="fat">
            Healthy Fat:
          </label>
          <label for="condiment">
            Condiments:
          </label>
          <label for="snack">
            Snack:
          </label>
        </fieldset>
      </form>
    `;
  }
}

window.customElements.define('daily-log', DailyLog);
