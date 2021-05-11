<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新影片</h2>

    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="影片基本信息" />
      <el-step title="影片内容" />
      <el-step title="最终发布" />
    </el-steps>

    <el-form label-width="120px">
      <el-form-item label="影片名称">
        <!-- <el-input v-model="courseInfo.title" placeholder=" 示例：" /> -->
        <el-input v-model="courseInfo.title" />
      </el-form-item>

      <!-- 所属分类 TODO -->
      <!-- 一级分类 -->
      <el-form-item label="影片类别">
        <el-select
          v-model="courseInfo.subjectParentId"
          placeholder="一级分类"
          @change="subjectLevelOneChanged"
        >
          <el-option
            v-for="subject in  subjectOneList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>

        <!-- 二级分类 -->
        <el-select v-model="courseInfo.subjectId" placeholder="请选择">
          <el-option
            v-for="subject in subjectTwoList"
            :key="subject.value"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
      </el-form-item>

      <!-- 影片讲师 -->
      <el-form-item label="主演">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"
          />
        </el-select>
      </el-form-item>

      <!-- 影片封面 -->
      <el-form-item label="影片封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API+'/eduoss/fileoss/upload'"
          class="avatar-uploader"
        >
          <!-- <img :src="courseInfo.cover" /> -->
          <img :src="courseInfo.cover" width="300">
        </el-upload>
      </el-form-item>

      <!-- 影片简介-->
      <el-form-item label="影片简介">
        <!-- <tinymce :height="300" v-model="courseInfo.description" /> -->
        <el-input v-model="courseInfo.description" />
      </el-form-item>

      <!-- <el-form-item label="总课时">
        <el-input-number
          :min="0"
          v-model="courseInfo.lessonNum"
          controls-position="right"
          placeholder="请填写影片的总课时数"
        />
      </el-form-item> -->
      <el-form-item label="总集数">
        <el-input-number
          :min="0"
          v-model="courseInfo.lessonNum"
          controls-position="right"
          placeholder="请填写影片的总集数"
        />
      </el-form-item>

      <el-form-item label="影片价格">
        <el-input-number
          :min="0"
          v-model="courseInfo.price"
          controls-position="right"
          placeholder="免费影片请设置为0元"
        />元
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import courseApi from "@/api/edu/course";
import subjectApi from "@/api/edu/subject";
import Tinymce from "@/components/Tinymce";

export default {
  components: { Tinymce },
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用,\
      courseInfo: {
        title: "",
        subjectId: "",
        subjectParentId: "",
        teacherId: "",
        lessonNum: 0,
        description: "",
        // cover: "/static/demo.jpg",
        cover: "https://ychen-edu.oss-cn-chengdu.aliyuncs.com/2021/05/08/cover.jpg",
        price: 0,
        subjectParentId: "",
      },
      courseId: '',
      BASE_API: process.env.BASE_API,
      teacherList: [],
      subjectOneList: [],
      subjectTwoList: [],
    };
  },

  created() {
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id;
      this.getInfo();
    } else {
      this.getAllTeacher();
      this.getAllOneSubject();
    }
    this.getAllTeacher();
  },

  methods: {
  
    saveOrUpdate() {
      if (!this.courseId) {
        this.addCourseInfo();
      } else {
        this.updateCourseInfo();
      }
    },
    addCourseInfo() {
      courseApi.addCourseInfo(this.courseInfo).then((respone) => {
        this.$message({
          type: "success",
          message: "添加成功!",
        });
        this.$router.push({ path: "/course/chapter/" + respone.data.id });
      });
    },
    updateCourseInfo() {
      courseApi.updateCourseInfo(this.courseInfo).then((respone) => {
        this.$message({
          type: "success",
          message: "更新成功!",
        });
        this.$router.push({ path: "/course/chapter/" + this.courseId });
      });
    },
    getInfo() {
      courseApi.getCourseInfoById(this.courseId).then((respone) => {
        this.courseInfo = respone.data.courseInfoVo;

        subjectApi.getSubjectList().then((res) => {
          this.subjectOneList = res.data.allSubject;

          for (var i = 0; i < this.subjectOneList.length; i++) {
            var oneSubject = this.subjectOneList[i];

            if (this.courseInfo.subjectParentId == oneSubject.id) {
              this.subjectTwoList = oneSubject.children;
            }
          }
        });

        this.getAllTeacher();
      });
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleAvatarSuccess(res) {
      this.courseInfo.cover = res.data.url;
    },
    subjectLevelOneChanged(value) {
      for (let i = 0; i < this.subjectOneList.length; i++) {
        if (this.subjectOneList[i].id === value) {
          this.subjectTwoList = this.subjectOneList[i].children;
          this.courseInfo.subjectId = "";
        }
      }
    },
    getAllOneSubject() {
      subjectApi.getSubjectList().then((respone) => {
        this.subjectOneList = respone.data.allSubject;
      });
    },
    getAllTeacher() {
      courseApi.getTeacherList().then((respone) => {
        this.teacherList = respone.data.items;
      });
    },
  },
};
</script>
<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>