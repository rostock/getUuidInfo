import { AbstractInteraction, EventType, ModificationKeyType } from '@vcmap/core';
import { WindowSlot } from '@vcmap/ui';
import HelloWorld from './featureInfoUuid.vue';
import { name } from '../package.json';

// export function myHelper() {}

export default class FeatureUuidInteraction extends AbstractInteraction {
  constructor(app, config) {
    super(EventType.CLICK, ModificationKeyType.NONE);
    this._app = app;
    this._config = config; // aus config könnte ein Array werden.
  }

  async pipe(event) {
    event.stopPropagation = true;
    this._app.windowManager.remove('featureUuidInfo-window');
    if (event.feature !== undefined) {
      this._app.windowManager.add({
        id: 'featureUuidInfo-window',
        component: HelloWorld, // Wo kommt das HelloWorld her, PlugIn Name? Theoretisch vermute ich, dass das der Import aus *.vue ist, im Beispiel haben wir aber kein HelloWorld im vue-File, Dateiname in Groß? in der vue ist ein export ohne Klassenname angegeben
        slot: WindowSlot.DETACHED,
        state: {
          headerTitle: event.feature.getId(),
        },
        props: {
          featureId: event.feature.getId(),
          serviceEndpoint: this._config,
        },
        position: {
          width: 500,
        },
      }, name);
    }

    return event;
  }
}
