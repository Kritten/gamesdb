<template>
  <div class="col">
    <q-card>
      <q-card-section horizontal>
        <q-toolbar>
          <q-toolbar-title>
            {{ title }}
          </q-toolbar-title>
        </q-toolbar>
      </q-card-section>

      <!--      <q-card-section>-->
      <component
        :is="card.component"
      />
      <!--      </q-card-section>-->
    </q-card>
  </div>
</template>

<script lang=ts>
import { Component, defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'DataCard',
  props: {
    card: {
      required: true,
      type: Object,
    },
  },
  setup(props) {
    const title = ref<string>(props.card.header);
    const headerActions = ref<Component | null>(null);
    const isOpenMenu = ref(false);
    const component = ref(null);

    // const keyUserSettingCardActive = `data-card-active/${props.card.id}`;
    // const keyUserSettingCardWidth = `data-card-width/${props.card.id}`;

    // const { getSetting, setSetting, getIsModeEdit } = useUserSettings();
    // const settingIsCardActive = getSetting(keyUserSettingCardActive);
    // const isCardActive = computed<boolean>({
    //   get() {
    //     return settingIsCardActive.value !== false;
    //   },
    //   set(value) {
    //     setSetting(keyUserSettingCardActive, value);
    //   },
    // });
    //
    // const settingIsCardWidth = getSetting(keyUserSettingCardWidth);
    // const selectedWidthColumn = computed<number>({
    //   get() {
    //     if (settingIsCardWidth.value === undefined) {
    //       return props.card.cols === undefined ? 12 : props.card.cols;
    //     }
    //
    //     return settingIsCardWidth.value;
    //   },
    //   set(value) {
    //     isOpenMenu.value = false;
    //
    //     if (component.value.redraw) {
    //       component.value.redraw();
    //     }
    //
    //     setSetting(keyUserSettingCardWidth, value);
    //   },
    // });

    const updateTitle = (titlePassed: string) => {
      title.value = titlePassed;
    };

    const updateHeaderActions = (headerActionsPassed: Component) => {
      headerActions.value = headerActionsPassed;
    };

    return {
      updateTitle,
      updateHeaderActions,
      title,
      headerActions,
      // isCardActive,
      isOpenMenu,
      // selectedWidthColumn,
      component,
      // isEditModeActive: getIsModeEdit(),
      // cardWidths: [{
      //   text: i18n.t('data.card.widthFull'),
      //   value: 12,
      // }, {
      //   text: i18n.t('data.card.widthHalf'),
      //   value: 6,
      // }],
    };
  },
});
</script>

<style scoped>
.card-handler {
  cursor: pointer;
}
</style>
