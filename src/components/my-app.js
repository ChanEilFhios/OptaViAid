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
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import {
  navigate,
  updateOffline,
  updateLayout
} from '../actions/app.js';

// These are the elements needed by this element.
import './snack-bar.js';

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
      }
      
      header > h1 {
        margin: 0;
      }
      
      nav {
        grid-area: nav;
      }

      .toolbar-list > a {
        display: inline-block;
        color: black;
        text-decoration: none;
        padding: 0 8px;
      }

      .toolbar-list > a[selected] {
        font-weight: bold;
      }

      main {
        overflow: scroll;
        display: block; /* Workaround for IE11 displaying <main> as inline */
        grid-area: main;
      }

      .page {
        display: none;
      }

      .page[active] {
        display: block;
      }

      footer {
        border-top: 1px solid #ccc;
        text-align: center;
        grid-area: footer;
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
      }
    </style>

    <header>
      <h1>${appTitle}</h1>
    </header>

    <nav class="toolbar-list">
      <a selected?="${_page === 'view1'}" href="/view1">View One</a>|
      <a selected?="${_page === 'view2'}" href="/view2">View Two</a>|
      <a selected?="${_page === 'view3'}" href="/view3">View Three</a>
    </nav>

    <!-- Main content -->
    <main role="main" class="main-content">
      <my-view1 class="page" active?="${_page === 'view1'}"></my-view1>
      <my-view2 class="page" active?="${_page === 'view2'}"></my-view2>
      <my-view3 class="page" active?="${_page === 'view3'}"></my-view3>
      <my-view404 class="page" active?="${_page === 'view404'}"></my-view404>
    </main>

    <footer>
      <p>Made with &hearts; by the Polymer team.</p>
    </footer>

    <snack-bar active?="${_snackbarOpened}">
        You are now ${_offline ? 'offline' : 'online'}.</snack-bar>
    `;
  }

  static get properties() {
    return {
      appTitle: String,
      _page: String,
      _snackbarOpened: Boolean,
      _offline: Boolean
    }
  }

  _firstRendered() {
    installRouter((location) => store.dispatch(navigate(window.decodeURIComponent(location.pathname))));
    installOfflineWatcher((offline) => store.dispatch(updateOffline(offline)));
    installMediaQueryWatcher(`(min-width: 460px)`,
        (matches) => store.dispatch(updateLayout(matches)));
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
    this._snackbarOpened = state.app.snackbarOpened;
  }
}

window.customElements.define('my-app', MyApp);
