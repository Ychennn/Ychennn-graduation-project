<template>
  <div class="app-container">
    <el-form label-width="120px">
      <h2 style="text-align: center;">发布新影片</h2>

      <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
        <el-step title="影片基本信息" />
        <el-step title="影片内容" />
        <el-step title="最终发布" />
      </el-steps>

      <el-button type="text" @click="open()">添加影片</el-button>

      <!-- 添加和修改课时表单 -->
      <el-dialog :visible.sync="dialogChapterFormVisible" >
        <el-form :model="chapter" label-width="120px">
          <el-form-item label="影片名称">
            <el-input v-model="chapter.title" />
          </el-form-item>
          <!-- <el-form-item label="影片排序">
            <el-input-number v-model="chapter.sort" :min="0" controls-position="right" />
          </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
          <el-button :disabled="saveVideoBtnDisabled" type="primary" @click="saveOrUpdate()">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 章节 -->
      <ul class="chanpterList">
        <li v-for="chapter in chapterVideoList" :key="chapter.id">
          <p>
            {{ chapter.title }}
            <span class="acts">
              <el-button type="text" @click="openEditVideo(chapter.id)">添加内容</el-button>
              <el-button type="text" @click="openEditChapter(chapter.id)">编辑</el-button>
              <el-button type="text" @click="deleteChapterByID(chapter.id)">删除</el-button>
            </span>
          </p>

          <!-- 视频 -->
          <ul class="chanpterList videoList">
            <li v-for="video in chapter.children" :key="video.id">
              <p>
                {{ video.title }}
                <span class="acts">
                  <el-button type="text" @click="openEditChapter(chapter.id)">编辑</el-button>
                  <el-button type="text" @click="removeVideo(video.id)">删除</el-button>
                </span>
              </p>
            </li>
          </ul>
        </li>
      </ul>

      <!-- 添加和修改课时表单 -->
      <el-dialog :visible.sync="dialogVideoFormVisible" >
        <el-form :model="video" label-width="120px">
          <el-form-item label="名称">
            <el-input v-model="video.title" />
          </el-form-item>
          <!-- <el-form-item label="排序">
            <el-input-number v-model="video.sort" :min="0" controls-position="right" />
          </el-form-item> -->
          <!-- <el-form-item label="是否免费">
            <el-radio-group v-model="video.free">
              <el-radio :label="0">收费</el-radio>
              <el-radio :label="1">免费</el-radio>
            </el-radio-group>
          </el-form-item> -->

          <!-- <el-form-item label="上传视频">
          </el-form-item>-->

          <el-form-item label="上传视频">
            <el-upload
              :on-success="handleVodUploadSuccess"
              :on-remove="handleVodRemove"
              :before-remove="beforeVodRemove"
              :on-exceed="handleUploadExceed"
              :file-list="fileList"
              :action="BASE_API+'/eduvod/video/uploadVideo'"
              :limit="1"
              class="upload-demo"
            >
              <el-button size="small" type="primary">上传视频</el-button>
              <el-tooltip placement="right-end">
                <div slot="content">
                  最大支持1G，
                  <br />支持3GP、ASF、AVI、DAT、DV、FLV、F4V、
                  <br />GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、
                  <br />MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、
                  <br />SWF、TS、VOB、WMV、WEBM 等视频格式上传
                </div>
                <i class="el-icon-question" />
              </el-tooltip>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
          <el-button :disabled="saveVideoBtnDisabled" type="primary" @click="saveOrUpdateVideo">确 定</el-button>
        </div>
      </el-dialog>

      <el-form-item>
        <el-button @click="previous">上一步</el-button>
        <el-button type="primary" @click="next">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import chapter from "@/api/edu/chapter";
import video from "@/api/edu/video";

export default {
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用,
      chapterVideoList: [],
      courseId: "",
      chapter: {
        title: "",
        sort: "",
      },
      saveVideoBtnDisabled: false,
      dialogChapterFormVisible: false,
      dialogVideoFormVisible: false,
      video: {
        // 课时对象
        title: "",
        sort: 0,
        free: 0,
        videoSourceId: "",
        videoOriginalName: "", //视频名称
      },
      fileList: [], //上传文件列表
      BASE_API: process.env.BASE_API, // 接口API地址
    };
  },

  created() {
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id;
      // 根据id获取影片基本信息
      this.getAllChaptersVideo();
    }
  },

  methods: {
    handleVodRemove() {
      video.deleteAliVideoById(this.video.videoSourceId).then((res) => {
        this.$message({
          type: "success",
          message: "视频删除成功!",
        });
        this.video.videoSourceId = "";
        this.video.videoOriginalName = "";
      });
    },

    beforeVodRemove(file, fileList) {
      return this.$confirm(`确定移除${file.name}?`);
    },

    //成功回调
    handleVodUploadSuccess(response, file, fileList) {
      this.video.videoSourceId = response.data.videoId;
      this.video.videoOriginalName = file.name;
      this.fileList =[]
      this.$message({
          type: "success",
          message: "视频上传成功!",
        });
    },
    //上传多一个视频
    handleUploadExceed(files, fileList) {
      this.$message.warning("想要重新上传视频，请先删除已上传的视频");
    },

    addVideo() {
      this.video.courseId = this.courseId;
      video.addVideo(this.video).then((res) => {
        this.dialogVideoFormVisible = false;
        this.$message({
          type: "success",
          message: "添加成功!",
        });
        this.getAllChaptersVideo();
      });
    },
    removeVideo(id) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        video.deleteVideo(id).then((response) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getAllChaptersVideo();
        });
      });
    },
    saveOrUpdateVideo() {
      this.addVideo();
    },
    openEditVideo(id) {
      this.dialogVideoFormVisible = true;
      this.video.chapterId = id;
      this.video.free = "";
      this.video.title = "";
      this.video.sort = "";
    },

    deleteChapterByID(id) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        chapter.deleteChapter(id).then((response) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getAllChaptersVideo();
        });
      });
    },
    openEditChapter(id) {
      this.dialogChapterFormVisible = true;
      chapter.getChapter(id).then((response) => {
        this.chapter = response.data.chapter;
      });
    },

    open() {
      this.dialogChapterFormVisible = true;
      this.chapter.title = "";
      this.chapter.sort = "";
    },

    saveOrUpdate() {
      if (!this.chapter.id) {
        this.addChapter();
      } else {
        this.updateChapter();
      }
    },

    updateChapter() {
      chapter.updateChapter(this.chapter).then((res) => {
        this.dialogChapterFormVisible = false;
        this.$message({
          type: "success",
          message: "添加成功!",
        });
        this.getAllChaptersVideo();
      });
    },

    addChapter() {
      this.chapter.courseId = this.courseId;

      chapter.addChapter(this.chapter).then((response) => {
        this.dialogChapterFormVisible = false;
        this.$message({
          type: "success",
          message: "添加成功!",
        });
        this.getAllChaptersVideo();
      });
    },

    getAllChaptersVideo() {
      chapter.getAllChapters(this.courseId).then((res) => {
        this.chapterVideoList = res.data.allChapters;
      });
    },
    previous() {
      this.$router.push({ path: "/course/info/" + this.courseId });
    },

    next() {
      this.$router.push({ path: "/course/publish/" + this.courseId });
    },
  },
};
</script>

<style scoped>
.chanpterList {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.chanpterList li {
  position: relative;
}
.chanpterList p {
  /* float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #ddd; */
}
.chanpterList .acts {
  /* float: right;
  font-size: 14px; */
}

.videoList {
  padding-left: 50px;
}
.videoList p {
  /* float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #ddd; */
}
</style>