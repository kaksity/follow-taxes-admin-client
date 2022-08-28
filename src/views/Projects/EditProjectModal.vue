<template>
  <el-dialog v-model="show" title="Update Project">
    <template #default>
      <el-form
        ref="validateForm"
        :model="inputForm"
        :rules="rules"
        label-width="auto"
        label-position="top"
      >
        <el-form-item prop="projectTitle" label="Project Title">
          <el-input v-model="inputForm.title" placeholder="Enter Project Title" />
        </el-form-item>
        <el-form-item prop="projectState" label="Project State">
          <el-select
            v-model="inputForm.state_id"
            filterable
            placeholder="Pick the State"
            @change="updateLGASelectInput"
          >
            <el-option
              v-for="state in stateOptions"
              :key="state.id"
              :label="state.state_name"
              :value="state.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="projectLGA" label="Project LGA">
          <el-select v-model="inputForm.lga_id" filterable placeholder="Select the LGA">
            <el-option
              v-for="lga in lgaOptions"
              :key="lga.id"
              :label="lga.lga_name"
              :value="lga.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="projectYear" label="Project Year">
          <el-input v-model="inputForm.year" placeholder="Enter the Project Year" />
        </el-form-item>
        <el-form-item prop="projectContractor" label="Project Contractor">
          <el-select v-model="inputForm.contractor_id" filterable placeholder="Select">
            <el-option
              v-for="contractor in contractorOptions"
              :key="contractor.id"
              :label="contractor.contractor_name"
              :value="contractor.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="projectBudgetAmount" label="Project Budget Amount">
          <el-input v-model="inputForm.budget_amount" placeholder="Enter the budget amount" />
        </el-form-item>
        <el-form-item prop="projectContractAmout" label="Project Contract Amount">
          <el-input v-model="inputForm.contract_amount" placeholder="Enter the contract amount" />
        </el-form-item>
        <el-form-item prop="projectMDA" label="Project MDA">
          <el-select v-model="inputForm.mda_id" filterable placeholder="Select the MDA">
            <el-option
              v-for="mda in mdaOptions"
              :key="mda.id"
              :label="mda.mda_name"
              :value="mda.id"
            />
          </el-select>
        </el-form-item>
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
      </el-form>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeModal">Cancel</el-button>
        <el-button type="primary" :loading="isLoading" @click="updateExistingProject">
          Update Project
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
  import { ref, reactive, unref, onMounted, toRefs } from 'vue';
  import { getMdas } from '@/api/mda';
  import { getContractors } from '@/api/contractor';
  import { getAllLGAs } from '@/api/lga';
  import { getStates } from '@/api/state';
  import { createProject } from '@/api/project';
  import { getSectors } from '@/api/sector';
  export default {
    props: {
      show: [Boolean],
      projectId: [String],
    },
    emits: ['close', 'refresh'],
    setup(props, { emit }) {
      const { projectId } = toRefs(props);
      const inputForm = reactive({
        title: '',
        contractor_id: '',
        state_id: '',
        lga_id: '',
        mda_id: '',
        budget_amount: '',
        year: '',
        sector_id: '',
        contract_amount: '',
      });
      const validateForm = ref(null);
      const isLoading = ref(false);
      const rules = reactive({
        title: [
          {
            required: true,
            message: 'Please enter the project title',
          },
        ],
        budget_amount: [
          {
            required: true,
            message: 'Please enter the budget amount',
          },
        ],
        contract_amount: [
          {
            required: true,
            message: 'Please enter the budget amount',
          },
        ],
      });

      const mdaOptions = ref([]);
      const contractorOptions = ref([]);
      const stateOptions = ref([]);
      const lgaOptions = ref([]);
      const sectorOptions = ref([]);
      async function loadSelectInputs() {
        const { data: mdaData } = await getMdas();
        mdaOptions.value = mdaData;

        const { data: contractorData } = await getContractors();
        contractorOptions.value = contractorData;

        const { data: stateData } = await getStates();
        stateOptions.value = stateData;

        const { data: lgaData } = await getAllLGAs();
        lgaOptions.value = lgaData;

        const { data: sectorData } = await getSectors();
        sectorOptions.value = sectorData;
      }
      async function updateLGASelectInput(value) {
        console.log('Changed Selected', value);
        const { data: lgaData } = await getAllLGAs(inputForm.state_id);
        lgaOptions.value = lgaData;
      }
      function loadProjectData(data) {
        console.log(data);
        inputForm.budget_amount = data.budget_amount;
        inputForm.contract_amount = data.contract_amount;
      }
      onMounted(async () => {
        await loadSelectInputs();
        console.log(projectId.value);
      });
      function clearInputs() {
        inputForm.budget_amount = '';
        inputForm.contract_amount = '';
        inputForm.title = '';
        inputForm.year = '';
      }
      async function updateExistingProject() {
        try {
          const form = unref(validateForm);
          if (!form) return;

          await form
            .validate((valid) => {
              if (valid) {
                isLoading.value = true;
                console.log(inputForm);
                createProject(inputForm).then(() => {
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
        emit('close');
        emit('refresh');
      }

      return {
        inputForm,
        closeModal,
        updateExistingProject,
        updateLGASelectInput,
        rules,
        isLoading,
        mdaOptions,
        contractorOptions,
        stateOptions,
        lgaOptions,
        sectorOptions,
        validateForm,
      };
    },
  };
</script>
<style scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>
