<template>
  <div class="element-container"> </div>
</template>

<script setup>
  import { ArrowLeft, ArrowRight, Delete, Edit, Share } from '@element-plus/icons-vue';
  import Descrition from '@/components/Descrition/index.vue';
  import { ref, reactive } from 'vue';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
  const cityOptions = ['上海', '北京', '广州', '深圳'];
  const radio = ref(3);
  const radio2 = ref('上海');
  const checked1 = ref(true);
  const checked2 = ref();
  const checkbox = ref(['上海']);
  const date = ref();
  const dateTime = ref();
  const cities = reactive(cityOptions);
</script>

<style lang="scss" scoped>
  .element-container {
    padding: $base-main-padding;
    background-color: $base-color-white;
    .row {
      margin: 20px 0;
    }
    .group {
      margin: 0 20px;
    }
  }
</style>
