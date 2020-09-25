<template>
  <div class="components-container">
    <div>
      <tinymce  @input="$emit('input',content)" v-model="content" :height="300" :width="min" />
    </div>
    <!-- <div class="editor-content" v-html="content" /> -->
  </div>
</template>

<script>
import Tinymce from '../../components/Tinymce/index'

export default {
  name: 'TinymceDemo',
  props: ['LoadContent'],
  components: { Tinymce },
  data() {
    return {
      content: '',
      min: 'auto'
    }
  },
  watch: {
    LoadContent (val) {
      this.content = val
    }
  },
  mounted () {
    if (document.body.clientWidth < 920) {
      this.min = '100%'
    }
  }
}
</script>

<style scoped>
.editor-content {
  margin-top: 20px;
}
</style>
