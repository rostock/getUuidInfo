import { ToolboxType, ButtonLocation } from '@vcmap/ui';
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
      // eslint-disable-next-line no-console
      console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH'); // wird immer mehrfach (4x) ausgegeben
      // GetFeatureInfo hinzufügen
      const interaction = new FeatureUuidInteraction(vcsUiApp, config.serviceendpoint);
      vcsUiApp.maps.eventHandler.addPersistentInteraction(interaction);
      // vcsUiApp.maps.eventHandler.addExclusiveInteraction(interaction);

      // Button in die Toolbox
      vcsUiApp.navbarManager.add(
        {
          id: 'uuidInfo',
          title: 'UUIDInfo',
          type: ToolboxType.SINGLE,
          action: {
            name: 'uuid-info',
            title: 'UuidInfo',
            icon: 'mdi-triangle-outline',
            active: false,
            callback() {
              this.active = !this.active;
              if (this.active) {
                interaction.setActive(true);
                // eslint-disable-next-line no-console
                console.log('bin aktiv');
              } else {
                interaction.setActive(false);
                // eslint-disable-next-line no-console
                console.log('bin nicht aktiv');
              }
            },
          },
        },
        'getUuidInfo',
        ButtonLocation.MENU, // TOOLBOX gibt es nicht ????
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
