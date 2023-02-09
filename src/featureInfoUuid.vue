<template>
  <v-sheet class="uuid-info">
    <v-card class="pa-2 ma-2">
      <v-container>
        <v-row class="justify-center mb-4">
          <h1>{{ $t('getUuidInfo.title') }}</h1>
        </v-row>
        <span>{{ featureId }}</span>
      </v-container>
    </v-card>
  </v-sheet>
</template>

  <style scoped lang="scss">
  .h.uuid-info {
    background-color: rgb(247, 0, 255);  // wird irgendwie ignoriert,warum?
  }
  </style>
  <script>
  import { inject } from 'vue';
  import {
    VSheet,
    VCard,
    VContainer,
    VRow,
  } from 'vuetify/lib';

  // import { name } from '../package.json';

  export const windowId = 'get_uuid_info_window';
  // entspricht das hier eventuell einem export default HelloWorld bzw. (ich habe die Datei angepasst) FeatureInfoUuid
  export default {
    name: 'GetUuidInfo',
    components: {
      VSheet,
      VCard,
      VContainer,
      VRow,
    },
    props: {
      featureId: {
        type: String,
        required: true,
      },
    },
    setup() {
      const app = inject('vcsApp');

      return {
        closeSelf() {
          app.windowManager.remove(windowId);
        },
      };
    },
  };
  </script>
