<template>
    <div>
        <editor-vue @input="$emit('input',ss)" v-model="ss" :init="init" :disabled="disabled"></editor-vue>
        {{ss}}
    </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import EditorVue from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
import 'tinymce/plugins/image' // 插入上传图片插件
import 'tinymce/plugins/table' // 插入表格插件
import 'tinymce/plugins/lists' // 列表插件
import 'tinymce/plugins/wordcount' // 字数统计插件
import 'tinymce/plugins/code' // 代码插件
import 'tinymce/plugins/fullscreen' // 全屏插件
import 'tinymce/plugins/link' // 超链接插件
import 'tinymce/plugins/codesample' // 代码块插件
import 'tinymce/plugins/toc' // 目录生成器
export default {
    props: ['content'],
    name: 'TinymceEditor',
    data () {
        return {
              ss: '',
              disabled: false,
              init: {
              language_url: '/tinymce/langs/zh_CN.js', // 语言包的路径
              language: 'zh_CN', // 语言
              skin_url: '/tinymce/skins/ui/oxide', // skin路径
              branding: false, // 是否禁用“Powered by TinyMCE”
              plugins: 'toc image table lists wordcount code fullscreen link codesample',
               codesample_languages: [
               { text: 'HTML/XML', value: 'markup' },
               { text: 'JavaScript', value: 'javascript' },
               { text: 'CSS', value: 'css' },
               { text: 'PHP', value: 'php' },
               { text: 'Ruby', value: 'ruby' },
               { text: 'Python', value: 'python' },
               { text: 'Java', value: 'java' },
               { text: 'C', value: 'c' },
               { text: 'C#', value: 'csharp' },
               { text: 'C++', value: 'cpp' }
             ],
              toolbar: 'toc | fullscreen | codesample | undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat | fontselect fontsizeselect | code | link',
              height: 550, // 编辑器高度
              min_height: 400,
              menubar: true, // 顶部菜单栏显示
              images_upload_url: 'http://106.53.102.65:3000/admin/upImg', // 图片上传地址
              images_upload_base_path: 'http://106.53.102.65:3000/',
              fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px', // 设置字体大小
              font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino' // 设置字体
            }
        }
    },
    watch: {
        content (val) {
            this.ss = val
        }
    },
    components: {
        EditorVue
    }
}
</script>
