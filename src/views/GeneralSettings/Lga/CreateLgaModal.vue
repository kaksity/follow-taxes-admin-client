<template>
  <el-dialog v-model="props.show" title="Create Contractor">
    <template #default>
      <el-form
        ref="validateForm"
        :model="inputForm"
        :rules="rules"
        label-width="auto"
        label-position="top"
      >
        <el-form-item prop="projectState" label="Project State">
          <el-select v-model="inputForm.state_id" filterable placeholder="Pick the State">
            <el-option
              v-for="state in stateOptions"
              :key="state.id"
              :label="state.state_name"
              :value="state.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="lgaName" label="LGA Name">
          <el-input v-model="inputForm.lga_name" placeholder="Enter LGA Name" />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeModal">Cancel</el-button>
        <el-button type="primary" :loading="isLoading" @click="createNewLGA">Create LGA</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
  import { ref, reactive, onMounted, unref } from 'vue';
  import { getStates } from '@/api/state';
  import { createLGA } from '@/api/lga';
  const props = defineProps({
    show: Boolean,
  });
  const emits = defineEmits(['close', 'refresh']);
  const inputForm = reactive({
    state_id: '',
    lga_name: '',
  });
  const validateForm = ref(null);
  const isLoading = ref(false);
  const rules = reactive({
    lga_name: [
      {
        required: true,
        message: 'Please enter the name of the LGA',
      },
    ],
    state_id: [
      {
        required: true,
        message: 'Please enter the name of the State',
      },
    ],
  });
  function clearInputs() {
    inputForm.lga_name = '';
  }
  const stateOptions = ref([]);
  async function loadSelectInputs() {
    const { data: stateData } = await getStates();
    stateOptions.value = stateData;
  }
  onMounted(async () => {
    await loadSelectInputs();
  });
  async function createNewLGA() {
    try {
      const form = unref(validateForm);
      if (!form) return;

      await form
        .validate((valid) => {
          if (valid) {
            isLoading.value = true;
            createLGA(inputForm).then(() => {
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
