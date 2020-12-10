import React from 'react'

export class SingleValueVis extends React.Component {
    constructor (props) {
      super(props)
    }
  
    // render our data
    render() {
      console.log(this.props.html_formatted)
      return <div>
        {this.props.html_formatted}
        {this.props.show_title && <Title title={this.props.title}/>}
      </div>
    }
  }
 // 
export class Title extends React.Component {
    constructor (props) {
        super(props)
    }
    
    render() {
        return <div class='title' id='content-title'> {this.props.title} </div>
    }
}