import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

// These are the components used by this page.
import * as dailyFueling from './daily-fueling.js';
import * as timeStamp from './time-stamp.js';
import * as dailyGreen from './daily-green.js';
import * as dailyWater from './daily-water.js';

class DailyLog extends PageViewElement {
  _fuelingChanged(e) {
    console.log('fuelingChanged', e.detail);
  }
  
  _LandGChanged(e) {
    this._leanChanged(e);
    this._greenChanged(e);
  }
  
  _leanChanged(e) {
    console.log('leanChanged', e.detail, e.target.id);
  }
  
  _greenChanged(e) {
    console.log('greenChanged', e.detail);
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
        
        .multiWrapper {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
        }
        
        daily-fueling {
          margin: auto;
        }
        
        input[type="number"] {
          width: 4em;
        }
        
        fieldset {
          margin-top: 0.5em;
        }
        
        fieldset.fueling {
          border-color: var(--fueling-color);
        }
        
        fieldset.lean {
          border-color: var(--lean-color);
        }
        
        fieldset.green {
          border-color: var(--green-color);
        }
        
        fieldset.water {
          border-color: var(--water-color);
        }
        
        fieldset.optional {
          border-color: var(--optional-color);
        }
        
        #dateweightwrapper > label {
          display: inline-block;
        }
         
        .fueling > legend {
          background-color: var(--fueling-color);
          color: white;
        }
        
        .lean > legend {
          background-color: var(--lean-color);
          color: white;
        }
        
        .green > legend {
          background-color: var(--green-color);
          color: white;
        }
        
        .water > legend {
          background-color: var(--water-color);
          color: white;
        }
        
        .optional > legend {
          background-color: var(--optional-color);
          color: white;
        }
        
        label[for='fat1'] > span{
          background-color: var(--fat-color);
          color: white;
        }
        
        label[for='condiment1'] > span {
          background-color: var(--condiment-color);
          color: white;
        }
        
        label[for='snack'] > span {
          background-color: var(--snack-color);
          color: white;
        }
        
        label[for='weight'] > span {
          background-color: var(--body-color);
          color: white;
        }
        
        label[for='excercise'] > span {
          background-color: var(--body-color);
          color: white;
        }
        
        label[for='excercise']{
          margin-top: 0.25em;
        }
        
        label {
          display: inline-block;
        }
        
        .optional label {
          margin-top: 0.25em;
        }
      </style>
      
      <form>
        <div id="dateweightwrapper">
          <label for="logdate">
            <span>Log Date:</span>
            <input id="logdate" type="date" />
          </label>
          
          <label for="weight">
            <span>Weight:</span>
            <input id="weight" type="number" min="1" />
            <select id="weightunits">
              <option value="lbs">Pounds</option>
              <option value="kg">Kilos</option>
            </select>
          </label>
        </div>
        
        <fieldset class="fueling">
          <legend>Fuelings:</legend>
          <div class="multiWrapper">
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
            <time-stamp on-change="${(e) => this._LandGChanged(e)}"></time-stamp>
          </legend>
          <fieldset class="lean" id="leanpart">
            <legend>Lean:</legend>
            <div class="multiWrapper">
              <label for="leanest">
                <input type="radio" id="leanest" name="lean" on-change="${(e) => this._leanChanged(e)}" />
                <span>Leanest</span>
              </label>
              <label for="leaner">
                <input type="radio" id="leaner" name="lean" on-change="${(e) => this._leanChanged(e)}" />
                <span>Leaner</span>
              </label>
              <label for="lean">
                <input type="radio" id="lean" name="lean" on-change="${(e) => this._leanChanged(e)}" />
                <span>Lean</span>
              </label>
            </div>
            <div class="multiWrapper">
              <label for="leanchoice">
                <span>I&nbsp;had:</span>
                <input type="text" id="leanchoice" on-change="${(e) => this._leanChanged(e)}" />
              </label>
            </div>
          </fieldset>
          
          <fieldset class="green" id="greenpart">
            <legend>Greens:</legend>
            <div class="multiWrapper">
              <daily-green index="1"></daily-green>
              <daily-green index="2"></daily-green>
              <daily-green index="3"></daily-green>
            </div>
          </fieldset>
        </fieldset>
        
        <fieldset class="water" id="water">
          <legend>Water:</legend>
          <div class="multiWrapper">
            <daily-water index="1"></daily-water>
            <daily-water index="2"></daily-water>
            <daily-water index="3"></daily-water>
            <daily-water index="4"></daily-water>
            <daily-water index="5"></daily-water>
            <daily-water index="6"></daily-water>
            <daily-water index="7"></daily-water>
            <daily-water index="8"></daily-water>
          </div>
        </fieldset>
        
        <fieldset class="optional" id="optional">
          <legend>Optional:</legend>
          <label for="fat1">
            <span>Healthy Fat:</span>
            <input type="checkbox" id="fat1" />
            <input type="checkbox" id="fat2" />
          </label>
          <br />
          <label for="condiment1">
            <span>Condiment:</span>
            <input type="checkbox" id="condiment1" />
            <input type="checkbox" id="condiment2" />
            <input type="checkbox" id="condiment3" />
          </label>
          <br />
          <label for="snack">
            <span>Snack:</span>
            <input type="checkbox" id="snack" />
          </label>
        </fieldset>
        
        <label for="excercise">
          <span>Excercise:</span>
          <input type="text" id="excercise" />
        </label>
      </form>
    `;
  }
}

window.customElements.define('daily-log', DailyLog);
