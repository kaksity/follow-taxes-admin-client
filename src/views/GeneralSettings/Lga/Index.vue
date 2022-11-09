<template>
  <div class="element-container">
    <div>
      <el-button type="primary" @click="showCreateLgaModal = true">Create LGA</el-button>
    </div>
    <el-table :data="filterTableData" v-loading="loadingTable" style="width: 100%">
      <el-table-column label="State Name" prop="state.state_name" />
      <el-table-column label="LGA Name" prop="lga_name" />
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

    <create-lga-modal
      :show="showCreateLgaModal"
      @close="showCreateLgaModal = false"
      @refresh="loadLGAs"
    />
    <!-- <edit-contractor-modal
      :show="showEditContractorModal"
      @close="showEditContractorModal = false"
      :contractor="contractorData"
      @refresh="loadLGAs"
    /> -->
  </div>
</template>

<script setup>
  import CreateLgaModal from './CreateLgaModal.vue';
  // import EditContractorModal from './EditContractorModal.vue';
  import { getAllLGAs, deleteLGA } from '@/api/lga';
  import { ref, onMounted } from 'vue';
  const showCreateLgaModal = ref(false);
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
    await deleteALGA(row.id);
    await loadLGAs();
  };

  async function deleteALGA(id) {
    await deleteLGA(id);
  }
  async function fetchLGAs() {
    try {
      loadingTable.value = true;
      const { data } = await getAllLGAs();
      tableData.value = data;
    } catch (e) {
    } finally {
      loadingTable.value = false;
    }
  }
  async function loadLGAs() {
    await fetchLGAs();
  }
  onMounted(async () => {
    await loadLGAs();
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
