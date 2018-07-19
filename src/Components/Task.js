import React, { Component } from 'react'

export default class Task extends Component {
  constructor (props) {
    super(props)

    this.state = {
      editMode: false,
      complete: props.task.complete
    }
  }

  editTask = () => {
    this.setState({editMode: true})
  }

  sendData = () => {
    const data = {
      title: this.refs.title.value,
      text: this.refs.text.value,
      complete: this.state.complete
    }

    this.props.edit(data)

    this.setState({editMode: false})
  }

  changeStatus = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value

    this.setState({
      complete: value
    })
  }

  render () {
    return (
      <div className="row justify-content-md-center">
        {!this.state.editMode && <div className="text-center col-md-6">
          <h2 className="card-header">{this.props.task.title}</h2>
          <div className="card-body">
            <p className="card-text">{this.props.task.text}</p>
            <button className="btn btn-primary" onClick={this.editTask}>Редактировать</button>
            <button className="btn btn-danger" onClick={this.props.delete}>Удалить</button>
          </div>
        </div>}
        {this.state.editMode && <div className="text-center col-md-6">
          <div className="card-body">
            {!this.props.task.complete &&
            <div>
              <label htmlFor="complete">Выполнен</label>
              <input onChange={this.changeStatus} name="complete" type="checkbox" className="form-control"></input>
            </div>}
          </div>
          <div className="card-body">
            <input type="text" ref="title" className="form-control" defaultValue={this.props.task.title}></input>
          </div>
          <div className="card-body">
            <textarea ref="text" className="form-control" defaultValue={this.props.task.text}></textarea>
          </div>
          <div className="card-body">
            <button className="btn btn-success" onClick={this.sendData}>Сохранить</button>
          </div>
        </div>}
      </div>
    )
  }
}