<template>
  <div class="element-container">
    <div>
      <el-button type="primary" @click="showCreateProjectModal = true">Create Project</el-button>
    </div>
    <el-table v-loading="loadingTable" :data="filterTableData" style="width: 100%">
      <el-table-column label="Title" prop="project_title" />
      <el-table-column label="State" prop="project_state.state_name" />
      <el-table-column label="Lga" prop="project_lga.lga_name" />
      <el-table-column label="Year" prop="project_year" />
      <el-table-column label="Contractor" prop="project_contractor.contractor_name" />
      <el-table-column label="Budget Amount" prop="project_budget_amount" />
      <el-table-column label="Contract Amount" prop="project_contract_amount" />
      <el-table-column label="MDA" prop="project_mda.mda_name" />
      <el-table-column label="Sector" prop="project_sector.sector_name" />
      <el-table-column align="right">
        <template #default="scope">
          <!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button> -->
          <el-button
            size="small"
            :icon="Edit"
            type="default"
            @click="handleEdit(scope.$index, scope.row)"
          />
          <el-button
            size="small"
            :icon="Delete"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>
    <el-divider></el-divider>
    <div class="example-pagination-block">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-count="paginationData.pageCount"
        @current-page="paginationData.currentPage"
        :pager-count="100"
        @current-change="fetchCurrentPage"
        @prev-click="getPreviousPage"
        @next-click="getNextPage"
      />
    </div>
    <create-project-modal
      :show="showCreateProjectModal"
      @close="showCreateProjectModal = false"
      @refresh="loadProjects"
    />
    <edit-project-modal
      :show="showEditProjectModal"
      @close="showEditProjectModal = false"
      :projectId="projectData.id"
      @refresh="loadProjects"
    />
  </div>
</template>

<script setup>
  import CreateProjectModal from './CreateProjectModal.vue';
  import EditProjectModal from './EditProjectModal.vue';
  import { Delete, Edit } from '@element-plus/icons-vue';
  import { getProjects, deleteProject } from '@/api/project';
  import { ref, onMounted, reactive } from 'vue';
  const showCreateProjectModal = ref(false);
  const showEditProjectModal = ref(false);
  const tableData = ref([]);
  const paginationData = reactive({
    pageCount: 0,
    currentPage: 0,
  });
  const params = reactive({
    per_page: 100,
    page: 1,
  });
  const search = ref('');
  const projectData = ref({});
  const filterTableData = computed(() =>
    tableData.value.filter(
      (data) =>
        !search.value || data.contractor_name.toLowerCase().includes(search.value.toLowerCase())
    )
  );
  const handleEdit = (index, row) => {
    projectData.value = row;
    showEditProjectModal.value = true;
  };
  const loadingTable = ref(false);
  const handleDelete = async (index, row) => {
    await deleteAProject(row.id);
    await loadProjects();
  };

  async function deleteAProject(id) {
    await deleteProject(id);
  }
  async function fetchCurrentPage(page) {
    params.page = page;
    console.log('Handling Page => ', page);
    await fetchProjects(params);
  }
  async function getNextPage() {
    // params.page += 1;
    await fetchProjects(params);
  }
  async function getPreviousPage() {
    // params.page -= 1;
    await fetchProjects(params);
  }
  async function fetchProjects(params) {
    try {
      loadingTable.value = true;
      const { data, meta } = await getProjects(params);
      paginationData.pageCount = meta.total;
      paginationData.currentPage = meta.current_page;
      tableData.value = data;
    } catch (e) {
    } finally {
      loadingTable.value = false;
    }
  }
  async function loadProjects() {
    await fetchProjects(params);
  }
  onMounted(async () => {
    await loadProjects();
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
  .example-pagination-block + .example-pagination-block {
    margin-top: 10px;
  }
  .example-pagination-block .example-demonstration {
    margin-bottom: 16px;
  }
</style>
