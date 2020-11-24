<template>
  <div id="app">
    <h2>Hay!</h2>
    <router-link to="/">Home</router-link>
    <hr>
    <AddTodo
      @add-todo="addTodo"
    />
		<select v-model="filter">
			<option value="all">All</option>
			<option value="complited">Complited</option>
			<option value="not-complited">Not complited</option>
		</select>
    <hr>
		<Loader 
			v-if='loading'
		/>
    <TodoList 
      v-else-if="filteredTodos.length"
      v-bind:todos="filteredTodos"
      @remove-item="removeItem"
    />
    <p v-else>:3</p>
  </div>
</template>

<script>
import TodoList from '@/components/TodoList'
import AddTodo from '@/components/AddTodo'
import Loader from '@/components/Loader'

export default {
  name: 'App',
  data() {
    return {
			todos: [],
			loading: true,
			filter: 'all'
    }
  },
  mounted() {
		fetch('https://jsonplaceholder.typicode.com/todos?_limit=3')
      .then(response => response.json())
      .then(json => {
				setTimeout(() => {
					this.todos = json,
					this.loading = false
				},1000)	
				
      })
	},
	// watch: {
	// 	filter(val) {
	// 		console.log(val)
	// 	}
	// },
	computed: {
		filteredTodos() {
			if (this.filter === 'all') {
				return this.todos
			}
			if (this.filter === 'complited') {
				return this.todos.filter(t => t.computed)
			}
			if (this.filter === 'not-complited') {
				return this.todos.filter(t => !t.computed)
			}
		}
	},
  components: {
    TodoList,
		AddTodo,
		Loader
  },
  methods: {
    removeItem(id) {
      this.todos = this.todos.filter(t => t.id !== id)
    },
    addTodo(item) {
      this.todos.push(item);
    }
  }
}
</script>