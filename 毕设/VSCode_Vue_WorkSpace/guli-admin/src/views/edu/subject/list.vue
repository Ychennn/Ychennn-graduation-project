<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="搜索影片分类" style="margin-bottom:30px;" />

    <el-tree
      ref="tree2"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />
  </div>
</template>

<script>
import subject from "@/api/edu/subject.js";

export default {
  data() {
    return {
      filterText: "",
      data2: [],
      defaultProps: {
        children: "children",
        label: "title"
      }
    };
  },
  created() {
    this.getAllSubjects();
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },

  methods: {
    getAllSubjects() {
      subject.getSubjectList().then(response => {
        this.data2 = response.data.allSubject;
      });
    },

    filterNode(value, data) {
      if (!value) return true;
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    }
  }
};
</script>

