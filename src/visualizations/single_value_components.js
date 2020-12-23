import React from 'react'

export class SingleValueVis extends React.Component {
    constructor (props) {
      super(props)
    }
  
    // render our data
    render() {
      return <div>
        {<SingleValue html_formatted={this.props.html_formatted}/>}
        {this.props.show_comparison && <Comparison comparison={this.props.comparison}/>}
        {this.props.show_title && <Title title={this.props.title}/>}
      </div>
    }
  }
 // 
class SingleValue extends React.Component {
  constructor (props) {
    super(props)
  } 

  render() {
    return <div className='single-value' id='single-value'> {this.props.html_formatted} </div>
  }  
}
class Title extends React.Component {
    constructor (props) {
      super(props)
    }
    
    render() {
      return <div className='title' id='content-title'> {this.props.title} </div>
    }
}

class Comparison extends React.Component {
  constructor (props) {
    super(props)
  }

  render() {
    return <div className='comp' id='comparison'> {this.props.comparison} </div>
  }
}