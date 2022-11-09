<template>
  <div class="element-container">
    <div>
      <el-button type="primary" @click="showCreateContractorModal = true"
        >Create Contractor</el-button
      >
    </div>
    <el-table :data="filterTableData" v-loading="loadingTable" style="width: 100%">
      <el-table-column label="Contractor Name" prop="contractor_name" />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="Type to search" />
        </template>
        <template #default="scope">
          <!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button> -->
          <el-button size="small" :icon="Delete" type="danger" @click="handleDelete(scope.$index, scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>

    <create-contractor-modal
      :show="showCreateContractorModal"
      @close="showCreateContractorModal = false"
      @refresh="loadContractors"
    />
    <!-- <edit-contractor-modal
      :show="showEditContractorModal"
      @close="showEditContractorModal = false"
      :contractor="contractorData"
      @refresh="loadContractors"
    /> -->
  </div>
</template>

<script setup>
  import CreateContractorModal from './CreateContractorModal.vue';
  // import EditContractorModal from './EditContractorModal.vue';
  import { getContractors, deleteContractor } from '@/api/contractor';
  import { ref, onMounted } from 'vue';
  import { Delete } from '@element-plus/icons-vue';

const showCreateContractorModal = ref(false);
  // const showEditContractorModal = ref(false);
  const tableData = ref([]);
  // const contractorData = ref(null);
  const search = ref('');
  const loadingTable = ref(false);
  const filterTableData = computed(() =>
    tableData.value.filter(
      (data) =>
        !search.value || data.contractor_name.toLowerCase().includes(search.value.toLowerCase())
    )
  );
  // const handleEdit = (index, row) => {
  //   console.log(index, row);
  //   contractorData.value = row;
  //   showEditContractorModal.value = true;
  // };
  const handleDelete = async (index, row) => {
    console.log(index, row);
    await deleteAContractor(row.id);
    await loadContractors();
  };

  async function deleteAContractor(id) {
    await deleteContractor(id);
  }
  async function loadContractors() {
    await fetchContractors();
  }
  async function fetchContractors() {
    try {
      loadingTable.value = true;
      const { data } = await getContractors();
      tableData.value = data;
    } catch (e) {
    } finally {
      loadingTable.value = false;
    }
  }
  onMounted(async () => {
    await loadContractors();
  });
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
