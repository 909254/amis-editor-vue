import ElementUI from 'element-ui' //�����
import 'element-ui/lib/theme-chalk/index.css' //����ӣ�������ڴ����ʽ��ͬ��Ҫ����import App from './App';֮ǰ
import Vue from "vue";
import App from "./App.vue";
import VueAmisSdk from "./../packages/index";

Vue.use(ElementUI)   //�����
Vue.use(VueAmisSdk);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
