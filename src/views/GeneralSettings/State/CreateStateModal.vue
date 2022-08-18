<template>
  <el-dialog v-model="props.show" title="Create State">
    <template #default>
      <el-form
        ref="validateForm"
        :model="inputForm"
        :rules="rules"
        label-width="auto"
        label-position="top"
      >
        <el-form-item prop="stateName" label="State Name">
          <el-input v-model="inputForm.state_name" placeholder="Enter State Name" />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeModal">Cancel</el-button>
        <el-button type="primary" :loading="isLoading" @click="createNewState"
          >Create State</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
  import { ref, reactive, unref } from 'vue';
  import { createState } from '@/api/state';
  const props = defineProps({
    show: Boolean,
  });
  const emits = defineEmits(['close', 'refresh']);
  const inputForm = reactive({
    state_name: '',
  });
  const validateForm = ref(null);
  const isLoading = ref(false);
  const rules = reactive({
    state_name: [
      {
        required: true,
        message: 'Please enter the name of the Contractor',
      },
    ],
  });
  function clearInputs() {
    inputForm.state_name = '';
  }
  async function createNewState() {
    try {
      const form = unref(validateForm);
      if (!form) return;

      await form
        .validate((valid) => {
          if (valid) {
            isLoading.value = true;
            createState(inputForm).then(() => {
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
