<template>
  <div id="app">
    <el-row>
      <el-col :span="10" style="height: 40px">
        <h3>&nbsp; 页面：{{ pageName }}</h3></el-col
      >
      <el-col :span="4">
        <el-tooltip :content="'布局模式切换'" placement="top">
          <el-switch
            style="height: 40px"
            v-model="isMobile"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="手机端"
            inactive-text="PC端"
          >
            >
          </el-switch>
        </el-tooltip>
      </el-col>
      <el-col :span="10">
        <el-row type="flex" justify="end" style="height: 40px">
          <el-button type="success" icon="el-icon-check" v-on:click="save"
            >保存</el-button
          >
          <el-button
            type="primary"
            :disabled="isPreview"
            icon="el-icon-search"
            v-on:click="preview"
            >预览</el-button
          >
          <el-button
            type="primary"
            :disabled="!isPreview"
            icon="el-icon-edit"
            v-on:click="edit"
            >编辑</el-button
          >
        </el-row></el-col
      >
    </el-row>
    <el-row>
      <div style="height: calc(100vh - 40px)">
        <vue-amis-sdk
          id="editorName"
          theme="cxd"
          className="is-fixed"
          :isPreview="isPreview"
          :isMobile="isMobile"
          @onChange="onChange"
          :value="schema"
          ref="child"
        />
      </div>
    </el-row>
  </div>
</template>
<script>
import "amis/lib/themes/cxd.css";
import "amis/lib/themes/ang.css";
import "amis/lib/helper.css";
import "amis/sdk/sdk.css";
import "amis-editor/dist/style.css";
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      isPreview: false,
      isMobile: false,
      schema: {},
      urlPrames: {},
      pageName: "页面1",
    };
  },
  methods: {
    onChange(e) {
      console.log("onchange");
      console.log(e);
    },
    save() {
      let val = this.$refs.child.save();
      let id = this.getUrlKey("id");
      axios
        .post("http://127.0.0.1:81/api/editor/save", val, {
          emulateJSON: true,
          params: { id: id },
        })
        .then((reponse) => {
          console.log(reponse);
          if (reponse.status == 200) {
            this.$message({
              message: "保存成功",
              type: "success",
            });
          }
        });
      console.log(val);
    },
    // 获取url参数值（参数名称）
    getUrlKey(key) {
      return (
        decodeURIComponent(
          (new RegExp("[?|&]" + key + "=" + "([^&;]+?)(&|#|;|$)").exec(
            window.location.href
          ) || [, ""])[1].replace(/\+/g, "%20")
        ) || null
      );
    },
    preview() {
      this.isPreview = true;
      console.log(this.isPreview);
    },
    edit() {
      this.isPreview = false;
    },
  },
  mounted() {
    // console.log("mounted");
    let id = this.getUrlKey("id");
    axios
      .post(
        "http://127.0.0.1:81/api/editor/init",
        { id: id },
        { emulateJSON: true, params: { id: id } }
      )
      .then((reponse) => {
        console.log(reponse);
         this.pageName =reponse.data.pageName
        this.$refs.child.init(reponse.data.data);
      });
  },
};
</script>
