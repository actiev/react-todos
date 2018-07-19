import React, {Component} from 'react'

export default class Form extends Component {

  handleClick = () => {
    const data = {
      title: this.refs.title.value,
      text: this.refs.text.value
    }

    this.props.action(data)
  }

  render () {
    return (
      <div className="row justify-content-md-center">
        <div className="text-center col-md-6 card">
          <div className="card-body">
            <input type="text" ref="title" className="form-control" placeholder={this.props.title}></input>
          </div>
          <div className="card-body">
            <textarea ref="text" className="form-control" placeholder={this.props.text}></textarea>
          </div>
          <div className="card-body">
            <button className="btn btn-success" onClick={this.handleClick}>Сохранить</button>
          </div>
        </div>
      </div>
    )
  }
}