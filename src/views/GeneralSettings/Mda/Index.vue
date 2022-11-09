<template>
  <div class="element-container">
    <div>
      <el-button type="primary" @click="showCreateMdaModal = true">Create MDA</el-button>
    </div>
    <el-table :data="filterTableData" v-loading="loadingTable" style="width: 100%">
      <el-table-column label="MDA Name" prop="mda_name" />
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

    <create-mda-modal
      :show="showCreateMdaModal"
      @close="showCreateMdaModal = false"
      @refresh="loadMdas"
    />
    <!-- <edit-contractor-modal
      :show="showEditContractorModal"
      @close="showEditContractorModal = false"
      :contractor="contractorData"
      @refresh="loadMdas"
    /> -->
  </div>
</template>

<script setup>
  import CreateMdaModal from './CreateMdaModal.vue';
  // import EditContractorModal from './EditContractorModal.vue';
  import { getMdas, deleteMda } from '@/api/mda';
  import { ref, onMounted } from 'vue';
  const showCreateMdaModal = ref(false);
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
    await deleteAMda(row.id);
    await loadMdas();
  };

  async function deleteAMda(id) {
    await deleteMda(id);
  }
  async function fetchMdas() {
    try {
      loadingTable.value = true;
      const { data } = await getMdas();
      tableData.value = data;
    } catch (e) {
    } finally {
      loadingTable.value = false;
    }
  }
  async function loadMdas() {
    await fetchMdas();
  }
  onMounted(async () => {
    await loadMdas();
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
