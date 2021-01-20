import React from 'react'

export class SingleValueVis extends React.Component {
    constructor (props) {
      super(props)
    }
  
    // render our data
    render() {
      return <div>
            {
              this.props.show_title && 
              this.props.title_placement == "top" &&
              <Title
                title={this.props.title}
                title_opacity={this.props.title_opacity}
              />
            }
            {
              <SingleValue 
                html_formatted={this.props.html_formatted}/>
            }
            {
              this.props.show_title && 
              this.props.title_placement == "bot" &&
              <Title
                title={this.props.title}
                title_opacity={this.props.title_opacity}
              />
            }
            {
              this.props.show_comparison && 
              <Comparison 
              comparison={this.props.comparison}
              show_comparison_label={this.props.show_comparison_label}
              comparison_label={this.props.comparison_label}
              comparison_value_label={this.props.comparison_value_label}
              comparison_opacity={this.props.comparison_opacity}/>
            }
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
      return <div 
              className='title' 
              id='content-title'
              style={{opacity: this.props.title_opacity}}>
              {this.props.title} 
              </div>
    }
}

class Comparison extends React.Component {
  constructor (props) {
    super(props)
    this.comparisonChangeIndicator = this.comparisonChangeIndicator.bind(this)
  }

  comparisonChangeIndicator () {
    const comp_value = parseFloat(this.props.comparison.replace('−', '-'))
    const comp_rendered = this.props.comparison.replace(/−|-/g, '')
    if (comp_value < 0) {
      return  <span style={{color: 'red'}}>{'\u2207' + ' ' + comp_rendered + ' '}</span>
    } else {
      return  <span style={{color: 'green'}}>{'\u2206' + ' ' + comp_rendered + ' '}</span>
            
    }
  }

  render() {
    return <div className='comp' id='comparison' style={{opacity: this.props.comparison_opacity}}> 
      {
        this.props.show_comparison_label && this.props.comparison_value_label === 'show_value' ?
          <div className='comp'> 
            {this.props.comparison + ' ' + this.props.comparison_label} 
          </div>
        :
        this.props.comparison_value_label === 'show_change' ?
            <span className='comp'>
              {this.comparisonChangeIndicator()} 
              {this.props.show_comparison_label && this.props.comparison_label}
            </span>
        : 
        <div className='comp'> 
          {this.props.comparison} 
        </div>} 
    </div>
  }
}