<template>
  <section class="todoapp">
    <!-- header -->
    <header class="header">
      <input class="new-todo" autocomplete="off" placeholder="Todo List" @keyup.enter="addTodo">
    </header>
    <!-- main section -->
    <section v-show="todos.length" class="main">
      <input id="toggle-all" :checked="allChecked" class="toggle-all" type="checkbox" @change="toggleAll({ done: !allChecked })">
      <label for="toggle-all" />
      <ul class="todo-list">
        <todo
          v-for="(todo, index) in filteredTodos"
          :key="index"
          :todo="todo"
          @toggleTodo="toggleTodo"
          @editTodo="editTodo"
          @deleteTodo="deleteTodo"
        />
      </ul>
    </section>
    <!-- footer -->
    <footer v-show="todos.length" class="footer">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ remaining | pluralize('item') }} left
      </span>
      <ul class="filters">
        <li v-for="(val, key) in filters" :key="key">
          <a :class="{ selected: visibility === key }" @click.prevent="visibility = key">{{ key | capitalize }}</a>
        </li>
      </ul>
      <!-- <button class="clear-completed" v-show="todos.length > remaining" @click="clearCompleted">
        Clear completed
      </button> -->
    </footer>
  </section>
</template>

<script>
import Todo from './Todo.vue'

const STORAGE_KEY = 'todos'
const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
}
// const defalutList = [
//   { text: 'star this repository', done: false },
//   { text: 'fork this repository', done: false },
//   { text: 'follow author', done: false },
//   { text: 'vue-element-admin', done: true },
//   { text: 'vue', done: true },
//   { text: 'element-ui', done: true },
//   { text: 'axios', done: true },
//   { text: 'webpack', done: true }
// ]
export default {
  components: { Todo },
  filters: {
    pluralize: (n, w) => n === 1 ? w : w + 's',
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
  },
  data() {
    return {
      visibility: 'all',
      filters,
      // todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || defalutList
      todos: []
    }
  },
  created () {
    // addTodo, deleteTodo, putTodo, getTodo
    this.$store.dispatch('getTodo').then((res) => {
      this.todos = res
    })
  },
  computed: {
    // 全选和反选
    allChecked() {
      return this.todos.every(todo => todo.done)
    },
    // 拿到所有数据
    filteredTodos() {
      return filters[this.visibility](this.todos)
    },
    // 未完成的数量
    remaining() {
      return this.todos.filter(todo => !todo.done).length
    }
  },
  methods: {
    // 存储到本地
    setLocalStorage() {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
    },
    // 添加任务
    addTodo(e) {
      const text = e.target.value
      if (text.trim()) {
        this.todos.push({
          text,
          done: false
        })
        this.setLocalStorage()
        this.$store.dispatch('addTodo', { text, done: false })
      }
      e.target.value = ''
    },
    // 切换单个任务状态
    toggleTodo(todo) {
      todo.done = !todo.done
      this.setLocalStorage()
       this.$store.dispatch('putTodo', todo)
    },
    // 删除
    deleteTodo(todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
      this.setLocalStorage()
      this.$store.dispatch('deleteTodo', todo._id)
    },
    // 修改单个任务内容
    editTodo({ todo, value }) {
      todo.text = value
      this.setLocalStorage()
      this.$store.dispatch('putTodo', todo)
    },
    // 清空已完成
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.done)
      this.setLocalStorage()
    },
    // 全选和反选
    toggleAll({ done }) {
      this.todos.forEach(todo => {
        todo.done = done
        this.setLocalStorage()
      })
      this.$store.dispatch('putTodos', this.todos)
    }
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
