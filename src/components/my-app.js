/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html } from '@polymer/lit-element';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';
import { offlineIcon, onlineIcon } from './my-icons.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import {
  navigate,
  updateOffline
} from '../actions/app.js';

class MyApp extends connect(store)(LitElement) {
  _render({appTitle, _page, _snackbarOpened, _offline}) {
    // Anything that's related to rendering should be done in here.
    return html`
    <style>
      :host {
        display: grid;
        height: 100vh;
        margin: 0;
        grid-template-rows: auto auto 1fr auto;
        grid-template-areas:
          "header"
          "nav"
          "main"
          "footer";
      }

      header {
        grid-area: header;
        display: flex;
        align-items: center;
        padding-left: 0.25em;
        border-bottom: 1px solid #ccc;
      }
      
      header > h1 {
        margin: 0;
      }
      
      nav {
        grid-area: nav;
        background-color: #ccc;
      }

      .toolbar-list > a {
        display: inline-block;
        color: black;
        text-decoration: none;
        margin-left: 0.25em;
      }

      .toolbar-list > a[selected] {
        font-weight: bold;
      }

      main {
        overflow: scroll;
        display: block; /* Workaround for IE11 displaying <main> as inline */
        grid-area: main;
        padding-right: 0.25em;
      }

      .page {
        display: none;
      }

      .page[active] {
        display: block;
      }

      footer {
        border-top: 1px solid #ccc;
        grid-area: footer;
        display: flex;
        flex-direction: row-reverse;
      }

      /* Wide layout */
      @media (max-width: 460px) {
        :host {
          grid-template-rows: auto 1fr auto;
          grid-template-columns: auto 1fr;
          grid-template-areas:
            "header header"
            "nav    main"
            "footer footer";
        }
        
        nav {
          writing-mode: vertical-lr;
        }
        
        .toolbar-list > a {
          margin-left: 0;
          margin-top: 0.25em;
        }
      }
      
      .overlayIcon {
        position: relative;
        display: inline-block;
        width: 24px
      }
      
      .iconOverlay {
        position: absolute;
        left: 4px;
        top: 10px;
      }

    </style>

    <header>
      <h1>${appTitle}</h1>
    </header>

    <nav class="toolbar-list">
      <a selected?="${_page === 'logs'}" href="/logs">Logs</a>
      <a selected?="${_page === 'daily'}" href="/daily">Daily</a>
    </nav>

    <!-- Main content -->
    <main role="main" class="main-content">
      <log-view class="page" active?="${_page === 'logs'}"></log-view>
      <daily-log class="page" active?="${_page === 'daily'}"></daily-log>
      <my-view404 class="page" active?="${_page === 'view404'}"></my-view404>
    </main>

    <footer>
      ${_offline ? offlineIcon : onlineIcon}
    </footer>`
  }

  static get properties() {
    return {
      appTitle: String,
      _page: String,
      _offline: Boolean
    }
  }

  _firstRendered() {
    installRouter((location) => store.dispatch(navigate(window.decodeURIComponent(location.pathname))));
    installOfflineWatcher((offline) => store.dispatch(updateOffline(offline)));
  }

  _didRender(properties, changeList) {
    if ('_page' in changeList) {
      const pageTitle = properties.appTitle + ' - ' + changeList._page;
      updateMetadata({
          title: pageTitle,
          description: pageTitle
          // This object also takes an image property, that points to an img src.
      });
    }
  }

  _stateChanged(state) {
    this._page = state.app.page;
    this._offline = state.app.offline;
  }
}

window.customElements.define('my-app', MyApp);
