import { html } from '@polymer/lit-element';

export const SharedStyles = html`
<style>
  :host {
    --fueling-color: #2E578D;
    --lean-color: #5E494D;
    --green-color: #004712;
    --water-color: #79BDE8;
    --optional-color: #A1A1A4;
    --fat-color: #7D4199;
    --condiment-color: #B5121B;
    --snack-color: #6996B0;
    --body-color: #F68A33;
  }
  
  .logPill {
    font-size: 16px;
    cursor: pointer;
    
    margin: 0.25em;
    padding: 0.25em;

    border: 2px solid black;
    border-radius: 0.5em;
    
    background-color: white;
  }
  
  .fueling.logPill {
    color: var(--fueling-color);
    border-color: var(--fueling-color);
  }
  
  .lean.logPill {
    color: var(--lean-color);
    border-color: var(--lean-color);
  }
  
  .green.logPill {
    color: var(--green-color);
    border-color: var(--green-color);
  }
</style>
`;
