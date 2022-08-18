<template>
  <div class="index-conntainer">
    <div class="head-card">
      <div class="avatar">
        <el-avatar :size="50" :src="avatar"></el-avatar>
      </div>
      <div class="head-card-content">
        <h2 class="title">{{ sayHi }}! Vue3-Admin, {{ t('indexPage.descTitle') }}</h2>
        <p class="desc"> Welcome </p>
      </div>
    </div>
    <div class="content"> </div>
  </div>
</template>

<script>
  export default {
    name: 'Index',
  };
</script>

<script setup>
  import { ref, computed, reactive, onBeforeMount } from 'vue';

  import { CountTo } from 'vue3-count-to';
  import Echarts from '@/components/Echarts/index.vue';

  import packpage from '../../../package.json';
  import { useI18n } from 'vue-i18n';

  import { useStore } from 'vuex';
  const store = useStore();

  const { t } = useI18n();

  const state = reactive({
    list: [],
    prefix: '',
    orderList: [],
    skillList: [],
  });

  const hour = new Date().getHours();
  const thisTime =
    hour < 8
      ? t('sayHi.early')
      : hour <= 11
      ? t('sayHi.morning')
      : hour <= 13
      ? t('sayHi.noon')
      : hour < 18
      ? t('sayHi.afternoon')
      : t('sayHi.evening');
  const sayHi = ref(thisTime);
  const avatar = ref('https://i.gtimg.cn/club/item/face/img/2/15922_100.gif');

  const series2 = reactive([
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true,
    },
  ]);

  const xAxis = reactive({
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  });

  const yAxis = reactive({
    type: 'value',
  });

  const toolbox = reactive({
    show: true,
  });

  const isMobile = computed(() => {
    return store.getters['setting/isMobile'];
  });

  const handleToDetail = (url) => {
    window.open(url);
  };

  onBeforeMount(() => {});
</script>

<style lang="scss" scoped>
  .index-conntainer {
    width: $base-width;
    .head-card {
      display: flex;
      align-items: center;
      padding: $base-main-padding;
      background-color: $base-color-white;
      &-content {
        padding-left: 15px;
        .desc {
          color: $base-font-color;
        }
      }
    }
    .content {
      margin: 15px 0;
      .count-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .item {
          display: flex;
          flex-direction: column;
          text-align: center;
          .label {
            padding: 10px 0;
            font-size: $base-font-size-big;
          }
          .count {
            font-size: $base-font-size-max;
            font-weight: bolder;
            color: $base-color-primary;
            &.error {
              color: var(--el-color-danger);
            }
            &.success {
              color: var(--el-color-success);
            }
          }
        }
      }
      .title {
        margin: 0;
      }
      .skill-title {
        padding: 10px 0;
        font-weight: 500;
      }
      .card {
        margin-bottom: 15px;
        &-body {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          &.mobile {
            grid-template-columns: repeat(1, 1fr);
          }
          .item {
            box-sizing: border-box;
            padding: 10px 20px;
            margin-top: -1px;
            margin-left: -1px;
            overflow: hidden;
            cursor: pointer;
            border: 1px solid black;
            border: 1px solid #eee;
            transition: box-shadow 0.5;
            .lf {
              display: flex;
              align-items: center;
              max-width: 140px;
              .img {
                width: auto;
                max-width: 120px;
                height: auto;
                max-height: 40px;
              }
            }
            &:hover {
              box-shadow: $base-box-shadow;
            }
            .title {
              padding-left: 5px;
              font-size: 18px;
              font-weight: bold;
            }
            .desc {
              padding: 5px 0;
              font-size: 13px;
              line-height: 1.5;
              color: $base-font-color;
            }
          }
        }
      }
    }
  }
</style>
