import { AbstractInteraction, EventType, ModificationKeyType } from '@vcmap/core';
import { WindowSlot } from '@vcmap/ui';
import HelloWorld from './featureInfoUuid.vue';
import { name } from '../package.json';

// export function myHelper() {}

export default class FeatureUuidInteraction extends AbstractInteraction {
  constructor(app, info) {
    super(EventType.CLICK, ModificationKeyType.CTRL);
    this._app = app;
    console.log("HHHHHHHHHHHHHHHHHHH");
    console.log(info);
  }

  async pipe(event) {
    if (event.feature) {
      // eslint-disable-next-line no-console
      console.log(event.feature.getId());
    }
    event.stopPropagation = true;

    this._app.windowManager.add({
      id: 'featureUuidInfo-window',
      component: HelloWorld, // Wo kommt das HelloWorld her, PlugIn Name? Theoretisch vermute ich, dass das der Import aus *.vue ist, im Beispiel haben wir aber kein HelloWorld im vue-File, Dateiname in Groß? in der vue ist ein export ohne Klassenname angegeben
      slot: WindowSlot.DETACHED,
      state: {
        headerTitle: event.feature.getId(),
      },
      props: {
        featureId: event.feature.getId(),
      },
      position: {
        width: 500,
      },
    }, name);
    return event;
  }
}
