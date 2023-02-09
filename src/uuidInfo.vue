<template>
  <VcsButton
    @click="toggle"
    :active="active"
    :background="background"
    :disabled="disabled"
    :has-update="update"
    tooltip="SECONDARY BUTTON"
  />
</template>

<script>
  import { VcsButton } from '@vcmap/ui';
  import { ref } from 'vue';

  export default {
    name: 'NotifierTester',
    components: {
      VcsButton,
    },
    setup() {
      const active = ref(false);

      return {
        toggle() {
          active.value = !active.value;
        },
      };
    },
  };
</script>

<style scoped>

</style>

