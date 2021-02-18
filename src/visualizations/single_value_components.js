import React from 'react'

// Parent Component 
export class SingleValueVis extends React.Component {
    constructor (props) {
      super(props)
     this.handleClick = this.handleClick.bind(this)
     this.MouseOver = this.MouseOver.bind(this)
     this.MouseOUt = this.MouseOut.bind(this)
    }

    handleClick() {
      LookerCharts.Utils.openDrillMenu(this.props.getCellDrills)
    } 

    MouseOver(){
      event.target.style.textDecoration = "underline";
      event.target.style.cursor = "pointer";
    }

    MouseOut(){
      event.target.style.textDecoration = "none";
    }
  
    // render our data (elements for title, single value, comparison )
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
            <p
            onClick={this.handleClick} 
            id='SV'
            style={this.props.getCellDrills !== null ? {cursor: 'pointer'} : {cursor: 'auto'}} 
            onMouseOver={this.props.getCellDrills !== null ? this.MouseOver : '' }
            onMouseOut={this.props.getCellDrills !== null ? this.MouseOut : '' }            
            >
              <SingleValue 
                html_formatted={this.props.html_formatted} 
              />
            </p>
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
              comparison_opacity={this.props.comparison_opacity}
              comparison_invert_color={this.props.comparison_invert_color}/>
            }
      </div>
    }
  }
 // Single Value component 
class SingleValue extends React.Component {
  constructor (props) {
    super(props)
  } 

  render() {
    return <div className='single-value' id='single-value'> {this.props.html_formatted} </div>
  }  
}
// Title component 
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
// Comparison component 
class Comparison extends React.Component {
  constructor (props) {
    super(props)
    this.comparisonChangeIndicator = this.comparisonChangeIndicator.bind(this)
  }
  // Create an indicator to show postive and negative values 
  comparisonChangeIndicator () {
    try {
      const comp_value = parseFloat(this.props.comparison.replace('−', '-'))
      const comp_rendered = this.props.comparison.replace(/−|-/g, '')
      // Provide option to invert colors to show negative values as green 
      const comp_invert = this.props.comparison_invert_color
      if (comp_invert == false) {
        if (comp_value < 0 ) {
          return  <span style={{color: 'red'}}>{'\u2207' + ' ' + comp_rendered + ' '}</span>
        } 
        else {
          return  <span style={{color: 'green'}}>{'\u2206' + ' ' + comp_rendered + ' '}</span>
        }
      }
      else if (comp_invert == true) {
        if (comp_value < 0 ) {
          return  <span style={{color: 'green'}}>{'\u2206' + ' ' + comp_rendered + ' '}</span>
        } 
        else {
          return  <span style={{color: 'red'}}>{'\u2207' + ' ' + comp_rendered + ' '}</span>    
        }
      } 
      else {
        return  <span style={{color: 'gray'}}>{'\u2206' + ' ' + comp_rendered + ' '}</span>
      }
    } catch {
      console.log('No comparison value available')
      return <span></span>
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