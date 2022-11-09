<template>
  <el-dialog v-model="props.show" title="Create MDA">
    <template #default>
      <el-form
        ref="validateForm"
        :model="inputForm"
        :rules="rules"
        label-width="auto"
        label-position="top"
      >
        <el-form-item prop="mdaName" label="MDA's Name">
          <el-input v-model="inputForm.mda_name" placeholder="Enter MDA's Name" />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeModal">Cancel</el-button>
        <el-button type="primary" :loading="isLoading" @click="createNewMda">Create MDA</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
  import { ref, reactive, unref } from 'vue';
  import { createMda } from '@/api/mda';
  const props = defineProps({
    show: Boolean,
  });
  const emits = defineEmits(['close', 'refresh']);
  const inputForm = reactive({
    mda_name: '',
  });
  const validateForm = ref(null);
  const isLoading = ref(false);
  const rules = reactive({
    mda_name: [
      {
        required: true,
        message: 'Please enter the name of the MDA',
      },
    ],
  });
  function clearInputs() {
    inputForm.mda_name = '';
  }
  async function createNewMda() {
    try {
      const form = unref(validateForm);
      if (!form) return;

      await form
        .validate((valid) => {
          if (valid) {
            isLoading.value = true;
            console.log(inputForm);
            createMda(inputForm).then(() => {
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
