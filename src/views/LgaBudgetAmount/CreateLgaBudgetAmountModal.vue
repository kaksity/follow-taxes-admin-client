<template>
  <el-dialog v-model="props.show" title="Create LGA Budget Amount">
    <template #default>
      <el-form
        ref="validateForm"
        :model="inputForm"
        :rules="rules"
        label-width="auto"
        label-position="top"
      >
        <el-form-item prop="projectSector" label="Project Sector">
          <el-select v-model="inputForm.sector_id" filterable placeholder="Select the Sector">
            <el-option
              v-for="mda in sectorOptions"
              :key="mda.id"
              :label="mda.sector_name"
              :value="mda.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="lga" label="LGA">
          <el-select v-model="inputForm.lga_id" filterable placeholder="Pick the LGA">
            <el-option
              v-for="lga in lgaOptions"
              :key="lga.id"
              :label="lga.lga_name"
              :value="lga.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="amount" label="Amount">
          <el-input v-model="inputForm.amount" placeholder="Enter Amount" />
        </el-form-item>
        <el-form-item prop="year" label="Year">
          <el-input v-model="inputForm.year" placeholder="Enter Year" />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeModal">Cancel</el-button>
        <el-button type="primary" :loading="isLoading" @click="createNewLGABudgetAmount"
          >Create LGA Budget Amount</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
  import { ref, reactive, onMounted, unref } from 'vue';
  import { getStates } from '@/api/state';
  import { getAllLGAs } from '@/api/lga';
  import { getSectors } from '@/api/sector';
  import { createLGABudgetAmount } from '@/api/lga.budget.amount';
  const props = defineProps({
    show: Boolean,
  });
  const emits = defineEmits(['close', 'refresh']);
  const inputForm = reactive({
    lga_id: '',
    year: '',
    amount: '',
  });
  const validateForm = ref(null);
  const isLoading = ref(false);
  const sectorOptions = ref([]);
  const rules = reactive({
    year: [
      {
        required: true,
        message: 'Please enter the name of the year',
      },
    ],
    amount: [
      {
        required: true,
        message: 'Please enter the name of the amount',
      },
    ],
    sector_id: [
      {
        required: true,
        message: 'Please enter the name of the Sector',
      },
    ],
    lga_id: [
      {
        required: true,
        message: 'Please enter the name of the LGA',
      },
    ],
  });
  function clearInputs() {
    inputForm.amount = '';
    inputForm.year = '';
  }
  const lgaOptions = ref([]);
  async function loadSelectInputs() {
    const { data: lgaData } = await getAllLGAs();
    lgaOptions.value = lgaData;

    const { data: sectorData } = await getSectors();
    sectorOptions.value = sectorData;
  }
  onMounted(async () => {
    await loadSelectInputs();
  });
  async function createNewLGABudgetAmount() {
    try {
      const form = unref(validateForm);
      if (!form) return;

      await form
        .validate((valid) => {
          if (valid) {
            isLoading.value = true;
            createLGABudgetAmount(inputForm).then(() => {
              closeModal();
            });
          }
        })
        .finally(() => {
          isLoading.value = false;
        });
    } catch (error) {
      console.log(error);
    }
  }
  function closeModal() {
    clearInputs();
    emits('close');
    emits('refresh');
  }
</script>
<style scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>
