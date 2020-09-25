import request from '../untils/request'

export function addTodo(data) {
    return request({
        method: 'post',
        url: '/admin/todo',
        data
    })
}

export function deleteTodo(id) {
    return request({
        method: 'delete',
        url: '/admin/todo',
        params: { id }
    })
}

export function putTodo(data) {
    return request({
        method: 'put',
        url: '/admin/todo',
        data
    })
}

export function getTodo() {
    return request({
        method: 'get',
        url: '/admin/todo'
    })
}

export function putTodos(data) {
    return request({
        method: 'put',
        url: '/admin/todos',
        data
    })
}
