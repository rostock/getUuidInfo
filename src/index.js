import { ToolboxType } from '@vcmap/ui';
import { version, name } from '../package.json';
import FeatureUuidInteraction from './featureUuidInteraction.js';


/**
 * @typedef {Object} PluginState
 * @property {any} prop
 */

/**
 * @param {T} config - the configuration of this plugin instance, passed in from the app.
 * @param {string} baseUrl - the absolute URL from which the plugin was loaded (without filename, ending on /)
 * @returns {import("@vcmap/ui/src/vcsUiApp").VcsPlugin<T, PluginState>}
 * @template {Object} T
 */
export default function getUuidInfoPlugin(config, baseUrl) {
  // eslint-disable-next-line no-console
  console.log(config, baseUrl);

  return {
    get name() { return name; },
    get version() { return version; },
    /**
     * @param {import("@vcmap/ui").VcsUiApp} vcsUiApp
     * @param {PluginState=} state
     * @returns {Promise<void>}
     */
    initialize: async (vcsUiApp, state) => {
      // eslint-disable-next-line no-console
      console.log('Called before loading the rest of the current context. Passed in the containing Vcs UI App ', vcsUiApp, state);


      // GetFeatureInfo hinzufügen
      // const interaction = new FeatureUuidInteraction(vcsUiApp, config.serviceendpoint);
      // vcsUiApp.maps.eventHandler.addPersistentInteraction(interaction);
      // vcsUiApp.maps.eventHandler.addExclusiveInteraction(
      //  interaction,
      //  () => { stop?.(); },
      // );

      // Button in die Toolbox
      // vcsUiApp.navbarManager.add(
      vcsUiApp.toolboxManager.add(
        {
          type: ToolboxType.SINGLE,
          action: {
            name: 'uuid-info',
            title: 'UUIDInfo',
            icon: 'mdi-triangle-outline',
            active: false,
            _remove() {},
            callback() {
              this._remove();
              this.active = !this.active;
              if (this.active) {
                this._remove = vcsUiApp.maps.eventHandler.addExclusiveInteraction(
                  new FeatureUuidInteraction(vcsUiApp, config.serviceendpoint),
                  () => {
                    this.active = false;
                    this._remove = () => {};
                  },
                );
              } else {
                // eslint-disable-next-line no-console
                vcsUiApp.windowManager.remove('featureUuidInfo-window');
                this._remove = () => {};
              }
            },
            destroy() {
              this._remove();
            },
          },
        },
        'getUuidInfo',
      );
    },
    /**
     * @param {import("@vcmap/ui").VcsUiApp} vcsUiApp
     * @returns {Promise<void>}
     */
    onVcsAppMounted: async (vcsUiApp) => {
      // eslint-disable-next-line no-console
      console.log('Called when the root UI component is mounted and managers are ready to accept components', vcsUiApp);
    },
    /**
     * @returns {T}
     */
    toJSON() {
      // eslint-disable-next-line no-console
      console.log('Called when serializing this plugin instance');
      return {};
    },
    /**
     * should return the plugins state
     * @param {boolean} forUrl
     * @returns {PluginState}
     */
    getState(forUrl) {
      // eslint-disable-next-line no-console
      console.log('Called when collecting state, e.g. for create link', forUrl);
      return {
        prop: '*',
      };
    },
    i18n: {
      en: {
        getUuidInfo: {
          title: 'Information',
          close: 'Close',
        },
      },
      de: {
        getUuidInfo: {
          title: 'Information',
          close: 'Schließen',
        },
      },
    },
    destroy() {
      // eslint-disable-next-line no-console
      console.log('hook to cleanup');
    },
  };
}
