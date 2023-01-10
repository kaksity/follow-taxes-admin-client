<template>
  <el-dialog v-model="props.show" title="Create Sector">
    <template #default>
      <el-form
        ref="validateForm"
        :model="inputForm"
        :rules="rules"
        label-width="auto"
        label-position="top"
      >
        <el-form-item prop="budgetCategory" label="Budget Category">
          <el-select v-model="inputForm.sector_id" filterable placeholder="Select the Category">
            <el-option
              v-for="mda in sectorOptions"
              :key="mda.id"
              :label="mda.sector_name"
              :value="mda.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="sectorName" label="Sector's Name">
          <el-input v-model="inputForm.sector_name" placeholder="Enter Sectors's Name" />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeModal">Cancel</el-button>
        <el-button type="primary" :loading="isLoading" @click="createNewSector"
          >Create Sector</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
  import { ref, reactive, unref } from 'vue';
  import { createSector } from '@/api/sector';
  const props = defineProps({
    show: Boolean,
  });
  const emits = defineEmits(['close', 'refresh']);
  const inputForm = reactive({
    sector_name: '',
  });
  const validateForm = ref(null);
  const isLoading = ref(false);
  const rules = reactive({
    sector_name: [
      {
        required: true,
        message: 'Please enter the name of the Sector',
      },
    ],
  });
  function clearInputs() {
    inputForm.sector_name = '';
  }
  async function createNewSector() {
    try {
      const form = unref(validateForm);
      if (!form) return;

      await form
        .validate((valid) => {
          if (valid) {
            isLoading.value = true;
            console.log(inputForm);
            createSector(inputForm).then(() => {
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
