<template>
  <div class="element-container">
    <div>
      <el-button type="primary" @click="showCreateSectorModal = true">Create Sector</el-button>
    </div>
    <el-table :data="filterTableData" v-loading="loadingTable" style="width: 100%">
      <el-table-column label="Sector Name" prop="sector_name" />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="Type to search" />
        </template>
        <template #default="scope">
          <!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button> -->
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <create-sector-modal
      :show="showCreateSectorModal"
      @close="showCreateSectorModal = false"
      @refresh="loadSectors"
    />
    <!-- <edit-contractor-modal
      :show="showEditContractorModal"
      @close="showEditContractorModal = false"
      :contractor="contractorData"
      @refresh="loadSectors"
    /> -->
  </div>
</template>

<script setup>
  import CreateSectorModal from './CreateSectorModal.vue';
  // import EditContractorModal from './EditContractorModal.vue';
  import { getSectors, deleteSector } from '@/api/sector';
  import { ref, onMounted } from 'vue';
  const showCreateSectorModal = ref(false);
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
    await deleteASector(row.id);
    await loadSectors();
  };

  async function deleteASector(id) {
    await deleteSector(id);
  }
  async function fetchMdas() {
    try {
      loadingTable.value = true;
      const { data } = await getSectors();
      tableData.value = data;
    } catch (e) {
    } finally {
      loadingTable.value = false;
    }
  }
  async function loadSectors() {
    await fetchMdas();
  }
  onMounted(async () => {
    await loadSectors();
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
