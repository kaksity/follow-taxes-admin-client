<template>
  <div class="element-container">
    <div>
      <el-button type="primary" @click="showCreateLgaBudgetAmountModal = true"
        >Create LGA Budget Amount</el-button
      >
    </div>
    <el-table :data="filterTableData" v-loading="loadingTable" style="width: 100%">
      <el-table-column label="LGA" prop="lga.lga_name" />
      <el-table-column label="Amount" prop="amount" />
      <el-table-column label="Year" prop="year" />
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

    <CreateLgaBudgetAmountModal
      :show="showCreateLgaBudgetAmountModal"
      @close="showCreateLgaBudgetAmountModal = false"
      @refresh="loadLGABudgetAmounts"
    />
    <!-- <edit-contractor-modal
      :show="showEditContractorModal"
      @close="showEditContractorModal = false"
      :contractor="contractorData"
      @refresh="loadLGABudgetAmounts"
    /> -->
  </div>
</template>

<script setup>
  import CreateLgaBudgetAmountModal from './CreateLgaBudgetAmountModal.vue';
  // import EditContractorModal from './EditContractorModal.vue';
  import { getAllLGABudgetAmounts, deleteLGABudgetAmount } from '@/api/lga.budget.amount';
  import { ref, onMounted } from 'vue';
  const showCreateLgaBudgetAmountModal = ref(false);
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
    await deleteALGABudgetAmount(row.id);
    await loadLGABudgetAmounts();
  };

  async function deleteALGABudgetAmount(id) {
    await deleteLGABudgetAmount(id);
  }
  async function fetchLGAs() {
    try {
      loadingTable.value = true;
      const { data } = await getAllLGABudgetAmounts();
      tableData.value = data;
    } catch (e) {
    } finally {
      loadingTable.value = false;
    }
  }
  async function loadLGABudgetAmounts() {
    await fetchLGAs();
  }
  onMounted(async () => {
    await loadLGABudgetAmounts();
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
