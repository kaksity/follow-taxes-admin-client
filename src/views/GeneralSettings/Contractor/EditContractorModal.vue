<template>
  <el-dialog v-model="props.show" title="Edit Contractor">
    <template #default>
      <el-form
        ref="validateForm"
        :model="inputForm"
        :rules="rules"
        label-width="auto"
        label-position="top"
      >
        <el-form-item prop="contractorName" label="Contractor Name">
          <el-input v-model="inputForm.contractor_name" placeholder="Enter Contractor Name" />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeModal">Cancel</el-button>
        <el-button type="primary" :loading="isLoading" @click="updateAContractor"
          >Update Contractor</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
  import { ref, reactive, unref, toRefs } from 'vue';
  import { updateContractor } from '@/api/contractor';
  const props = defineProps({
    show: Boolean,
    contractor: {
      id: String,
      contractor_name: String,
    },
  });
  const { contractor } = toRefs(props);
  console.log(contractor.value);
  const emits = defineEmits(['close', 'refresh']);
  const inputForm = reactive({
    contractor_name: contractor.value == null ? '' : contractor.value.contractor_name,
  });
  const validateForm = ref(null);
  const isLoading = ref(false);
  const rules = reactive({
    contractor_name: [
      {
        required: true,
        message: 'Please enter the name of the Contractor',
      },
    ],
  });
  function clearInputs() {
    inputForm.contractor_name = '';
  }
  async function updateAContractor() {
    try {
      const form = unref(validateForm);
      if (!form) return;

      await form
        .validate((valid) => {
          if (valid) {
            isLoading.value = true;
            updateContractor(contractor.value.id, inputForm).then(() => {});
            closeModal();
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
