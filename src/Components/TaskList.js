import React, { Component } from 'react'
import '../assets/App.css'
import Task from './Task'
import Form from './Form'
import update from 'immutability-helper'

class TaskList extends Component {
  constructor (props) {
    super(props)

    const store = [
      {
        title: 'Сделать список',
        complete: false,
        text: 'нема пока'
      },
      {
        title: 'Создать таски',
        complete: false,
        text: 'щось таке'
      },
      {
        title: 'Сделать удаление',
        complete: true,
        text: 'пусто'
      },
      {
        title: 'Сделать редактирование',
        complete: false,
        text: 'нема пока'
      }
    ]

    this.state = {
      store: store,
      createTask: false,
      sortTasks: []
    }
  }

  createNewTask = (data) => {
    if (!data.text && !data.title) {
      return
    }

    const newTask = update(this.state.store, {$push: [{title: data.title, complete: false, text: data.text}]})

    this.setState({
      store: newTask,
      createTask: false
    })
  }

  deleteTask (id) {
    const delTask = update(this.state.store, {$splice: [[id, 1]]})

    this.setState({
      store: delTask
    })
  }

  completeTasks  = () => {
    const count = this.state.store.filter(task => {
      return task.complete === true
    })

    return count.length
  }

  getCompleteTask = () => {
    const completeTasks = this.state.store.filter(task => {
      return task.complete === true
    })

    this.setState({
      sortTasks: completeTasks
    })
  }

  getNotCompleteTask = () => {
    const notCompleteTasks = this.state.store.filter(task => {
      return task.complete === false
    })

    this.setState({
      sortTasks: notCompleteTasks
    })
  }

  getAllTasks = () => {
    this.setState({
      sortTasks: []
    })
  }

  editTask (id, data) {
    if (!data.text && !data.title) {
      return
    }

    const updateTask = update(this.state.store, {
      [id]: {
        title:{ $set: data.title },
        text: { $set: data.text },
        complete: { $set: data.complete }
      }
    });

    this.setState({
      store: updateTask
    })
  }

  render () {
    const taskList = this.state.sortTasks.length >= 1 ? this.state.sortTasks : this.state.store

    return (
      <div className="container text-center">
        <div className="row justify-content-md-center">
          {!this.state.createTask && <button className="btn btn-info" onClick={() => {this.setState({createTask: true})}}>Добавить новый</button>}
          <button type="button" className="btn btn-success" onClick={this.getCompleteTask}>
            Выполненные <span className="badge badge-light">{this.completeTasks()}</span>
          </button>
          <button type="button" className="btn btn-warning" onClick={this.getNotCompleteTask}>
            Не выполненные <span className="badge badge-light">{this.state.store.length - this.completeTasks()}</span>
          </button>
          <button type="button" className="btn btn-secondary" onClick={this.getAllTasks}>
            Все <span className="badge badge-light">{this.state.store.length}</span>
          </button>
        </div>
        {this.state.createTask && <Form text="Введите заголовок" title="Введите текст" action={this.createNewTask} />}
        {taskList.map((task, index) => <Task
          edit={(data) => this.editTask(index,data)}
          delete={() => this.deleteTask(index)}
          key={index}
          task={task} />)}
      </div>
    )
  }
}

export default TaskList
