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
      <el-form-item prop="lga_id" label="LGA">
          <el-select v-model="inputForm.lga_id" filterable placeholder="Pick the LGA">
            <el-option
              v-for="lga in lgaOptions"
              :key="lga.id"
              :label="lga.lga_name"
              :value="lga.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="budget_item_id" label="Budget Item">
          <el-select v-model="inputForm.budget_item_id" filterable placeholder="Select the Item">
            <el-option
              v-for="item in budgetItemOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="proposed_amount" label="Proposed Amount">
          <el-input v-model="inputForm.proposed_amount" placeholder="Enter Proposed Amount" />
        </el-form-item>
        <el-form-item prop="revised_amount" label="Revised Amount">
          <el-input v-model="inputForm.revised_amount" placeholder="Enter Revised Amount" />
        </el-form-item>
        <el-form-item prop="actual_amount" label="Actual Amount">
          <el-input v-model="inputForm.actual_amount" placeholder="Enter Actual Amount" />
        </el-form-item>
        <el-form-item prop="approved_amount" label="Approved Amount">
          <el-input v-model="inputForm.approved_amount" placeholder="Enter Approved Amount" />
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
  import { getAllLGAs } from '@/api/lga';
  import { getAllBudgetItem } from '@/api/budget.item';
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
    proposed_amount: '',
    approved_amount: '',
    revised_amount: '',
    actual_amount: '',
  });
  const validateForm = ref(null);
  const isLoading = ref(false);
  const sectorOptions = ref([]);
  const budgetItemOptions = ref([]);
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
    budget_item_id: [
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
    proposed_amount: [
      {
        required: true,
        message: 'Pleaase enter the proposed amount',
      },
    ],
    approved_amount: [
      {
        required: true,
        message: 'Pleaase enter the approved amount',
      },
    ],
    revised_amount: [
      {
        required: true,
        message: 'Pleaase enter the revised amount',
      },
    ],
    actual_amount: [
      {
        required: true,
        message: 'Pleaase enter the required actual amount',
      },
    ],
  });
  function clearInputs() {
    inputForm.amount = '';
    inputForm.year = '';
    inputForm.proposed_amount = '';
    inputForm.approved_amount = '';
    inputForm.revised_amount = '';
    inputForm.actual_amount = '';
  }
  const lgaOptions = ref([]);
  async function loadSelectInputs() {
    const { data: lgaData } = await getAllLGAs();
    lgaOptions.value = lgaData;

    const { data: sectorData } = await getSectors();
    sectorOptions.value = sectorData;

    const { data: budgetItemData } = await getAllBudgetItem();
    budgetItemOptions.value = budgetItemData;
  }
  
  onMounted(async () => {
    await loadSelectInputs();
  });
  async function createNewLGABudgetAmount() {
    try {
      const form = unref(validateForm);
      console.log(form);
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
