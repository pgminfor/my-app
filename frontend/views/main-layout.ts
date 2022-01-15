import '@vaadin/app-layout';
import '@vaadin/avatar/vaadin-avatar';
import '@vaadin/context-menu';
import '@vaadin/tabs';
import '@vaadin/tabs/vaadin-tab';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { router } from '../index';
import { views } from '../routes';
import { appStore } from '../stores/app-store';
import { Layout } from './view';

interface RouteInfo {
  path: string;
  title: string;
  icon: string;
}

@customElement('main-layout')
export class MainLayout extends Layout {
  render() {
    return html`
      <vaadin-app-layout>
        <header class="bg-base border-b border-contrast-10 box-border flex flex-col w-full" slot="navbar">
          <div class="flex h-xl items-center px-l">
            <h1 class="my-0 me-auto text-l">${appStore.applicationName}</h1>
          </div>
          <nav class="flex gap-s overflow-auto px-m">
            <ul class="flex list-none m-0 p-0">
              ${this.getMenuRoutes().map(
                (viewRoute) => html`
                  <li>
                    <a
                      ?highlight=${viewRoute.path == appStore.location}
                      class="flex 
                  h-m items-center px-s relative text-secondary"
                      href=${router.urlForPath(viewRoute.path)}
                    >
                      <span class="${viewRoute.icon} me-s text-l"></span>
                      <span class="font-medium text-s whitespace-nowrap">${viewRoute.title}</span>
                    </a>
                  </li>
                `
              )}
            </ul>
          </nav>
        </header>
        <slot></slot>
      </vaadin-app-layout>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add('block', 'h-full');
  }

  private getMenuRoutes(): RouteInfo[] {
    return views.filter((route) => route.title) as RouteInfo[];
  }
}
