<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="演员名称">
        <el-input v-model="teacher.name" />
      </el-form-item>
      <el-form-item label="热度">
        <el-input-number v-model="teacher.sort" controls-position="right" min="0" />
      </el-form-item>

      <!-- <el-form-item label="演员头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <el-option :value="1" label="高级演员" />
          <el-option :value="2" label="首席演员" />
        </el-select>
      </el-form-item> 
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
      
      <el-form-item label="主要成就">
        <el-input v-model="teacher.career" />
      </el-form-item>

      <el-form-item label="演员简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea" />
      </el-form-item>

      <!-- 演员头像：TODO -->
      <!-- 演员头像 -->
      <el-form-item label="演员头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="teacher.avatar" />
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像</el-button>

        <!--
v-show：是否显示上传组件
:key：类似于id，如果一个页面多个图片上传控件，可以做区分
:url：后台上传的url地址
@close：关闭上传组件
        @crop-upload-success：上传成功后的回调-->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API+'/eduoss/fileoss/upload'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import TeacherApi from "@/api/edu/teacher";
import ImageCropper from "@/components/ImageCropper";
import PanThumb from "@/components/PanThumb";

export default {
  components: { ImageCropper, PanThumb },

  data() {
    return {
      teacher: {
        name: "",
        sort: 0,
        level: 1,
        career: "",
        intro: "",
        avatar: ""
      },
      BASE_API: process.env.BASE_API, // 接口API地址
      imagecropperShow: false, // 是否显示上传组件
      imagecropperKey: 0 // 上传组件id
    };
  },
  watch: {
    $route(to, from) {
      //路由发生变化，方法就会执行
      this.init();
    }
  },
  created() {
    this.init(); //初始化
  },
  methods: {
    close() {
      this.imagecropperShow = false;
      // 上传失败后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1;
    },
    cropSuccess(data) {
      this.imagecropperShow = false;
      // 上传失败后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.teacher.avatar = data.url;
       // 上传成功后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1
    },
    init() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id;
        this.getInfo(id);
      } else {
        // 使用对象拓展运算符，拷贝对象，而不是引用，
        // 否则新增一条记录后，defaultForm就变成了之前新增的teacher的值
        this.teacher = {};
      }
    },
    getInfo(id) {
      TeacherApi.getTeacherInfo(id).then(response => {
        this.teacher = response.data.teacher;
      });
    },
    saveOrUpdate() {
      if (!this.teacher.id) {
        this.saveTeacher();
      } else {
        this.updateTacher();
      }
    },
    saveTeacher() {
      TeacherApi.addTeacher(this.teacher).then(() => {
        this.$message({
          type: "success",
          message: "保存成功!"
        });
        //回到列表页面，路由跳转
        this.$router.push({ path: "/teacher/table" });
      });
    },
    updateTacher() {
      TeacherApi.updateTeacheInfo(this.teacher).then(response => {
        this.$message({
          type: "success",
          message: "修改成功!"
        });
        this.$router.push({ path: "/teacher/table" });
      });
    }
  }
};
</script>