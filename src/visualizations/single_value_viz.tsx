import { formatType } from '../common/utils'
import React from 'react'
import ReactDOM from 'react-dom'
import { SingleValueVis } from './single_value_components'

import {
  Looker,
  LookerChartUtils
} from '../common/types'

declare var looker: Looker
declare var LookerCharts: LookerChartUtils

type Formatter = ((s: any) => string)
const defaultFormatter: Formatter = (x) => x.toString()

// Declare user interface options 
const vis = {
  options: {
    html_template: {
      section: ' Style',
      type: 'string',
      label: 'HTML Template',
      default: `<p>{{ rendered_value }}</p>`
    },
    vis_title: {
      section: ' Style',
      type: 'string',
      label: 'Title',
      default: `<p></p>`
    },
    show_title: {
      section: ' Style',
      type: 'boolean',
      label: 'Show Title',
      default: false
    },
    title_opacity: {
      section: ' Style',
      label: 'Title Opacity',
      type: 'string',
      default: 0.75         
    },
    show_comparison: {
      section: 'Comparison',
      order: 1,
      type: 'boolean',
      label: 'Show Comparison',
      default: false
    },
    show_comparison_label: {
      section: 'Comparison',
      order: 2,
      type: 'boolean',
      label: 'Show Label',
      default: false
    },
    comparison_value_label: {
      section: 'Comparison',
      order: 3,
      type: 'string',
      display: 'select',
      label: 'Value Labels',
      values: [{'Show as Value': 'show_value'}, {'Show as Change': 'show_change'}],
      default: 'show_change'
     }, 
     comparison_invert_color: {
      section: 'Comparison',
      order: 4,
      type: 'boolean',
      label: 'Invert Comparison Color',
      default: false
    },
    background_color: {
      section: ' Style',
      type: 'array',
      display: 'color',
      label: 'Background Color',
      default: '#fff'
    },
    text_color: {
      section: ' Style',
      type: 'array',
      display: 'color',
      label: 'Text Color',
      default: '#000'
    },   
    comparison_opacity: {
      section: 'Comparison',  
      label: 'Opacity',
      type: 'string',
      default: 0.85
    },
    title_placement: {
      section: ' Style',
      label: 'Title Placement',
      display: 'select',
      type: 'string',
      values: [{"Top": "top"},
      {"Bottom": "bot"}],
      default: "top"
    }
  },

  // Initialize html element and set style classes
  create: function(element, config) {
    element.innerHTML = `
      <style>

      .container {
        margin-top: 2em;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        text-align: center;
        padding-bottom: 8vh
      }

      .single-value {
        margin-bottom: -1em;
        word-wrap: break-word;
        font-size: 18vh;
      }    

     .title-bottom {
        margin-bottom: 3em;
        word-wrap: break-word;
        font-size: 9vh;
      }      

      .title-top {
        margin-bottom: 2em;
        word-wrap: break-word;
        font-size: 9vh;
      } 

      .comp {
        font-size: 8vh;
        position: fixed;
        bottom: 0;
        width: 100%;
        left: 0;
      }
      </style>
    `

    const container = element.appendChild(document.createElement('div'))
    container.className = 'container'
    container.id = 'vis-container'

    this.chart = ReactDOM.render(
      <SingleValueVis
        title={config.vis_title}
        show_title={config.show_title}
        html_formatted={false}
        title_placement={config.title_placement}/>,
      document.getElementById('vis-container')
    )
  },

  updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
    this.clearErrors()

    // Create main html document element
    const visContainer =  document.getElementById('vis-container')
    const qFields = queryResponse.fields

    // Return the entire specified row's field objects 
    function getRow(row) {
      return data[row]
    }

    // Returns the field object for the column specified. Default is to return measures over dimensions. If object = comp, dimensions will take preference. 
    function getColumn(column, object) {
      if (object === 'comp') {
        return qFields.dimension_like.length > 0 ? qFields.dimension_like[column] : qFields.measure_like[column]
      } else {
          return qFields.measure_like.length > 0 ? qFields.measure_like[column] : qFields.dimension_like[column]
      }
    }

    // Returns the object for the specified cell. If object = comp, dimensions will take preference over measures.
    function getCellName(row, column, object) {
      const row_detail = getRow(row)
      const column_detail = getColumn(column, object)
      return row_detail[column_detail.name]      
    }

    // Returns the actual value of the specified cell. 
    function getCellValue(cell_name) {
      return LookerCharts.Utils.filterableValueForCell(cell_name)
    }

    // Returns the html formatted cell value to be rendered 
    function formatCell(row, column, object) {
      try {
        const cell_name = getCellName(row, column, object)
        const column_detail = getColumn(column, object)
        const cell_value = getCellValue(cell_name)
        // create default format for measures or table calcs with no value_format set
        let cell_format = ""
        // If the cell is a measure or table calculation and there is no value format specified in LookML, 
        // set the format to comma seperated with either no decimals or 2 decimals depending on if the value is a whole number
        // Otherwise, use the value format specified in LookML
        if ((column_detail.category === "measure"  || column_detail.is_table_calculation ) 
            && column_detail.value_format === null) {
          const measure_value = parseFloat(cell_value)
          if(Math.round(measure_value) !== measure_value) {
            cell_format = "#,##0.00"
          } else {
            cell_format = "#,##0"
           }
        } else {
           cell_format = column_detail.value_format
        }

        // Apply the utils formatType method to format cell 
        const formatValue = formatType(cell_format) || defaultFormatter

        return formatValue(cell_value).replace(/^"(.*)"$/, '$1')
        }
      catch (e) {
        return null
        }
    }

    // Create an object to pass formatted HTML into react component 
    function formatHTML(object) {
      return { __html: htmlTemplate.replace(/{{.*}}/g, object) }
    }

    // Return an object with the drill link specified in the field's lookML
    function getCellDrills(row, column, object) {
      const drill_cell = getCellName(row, column, object)
      if (drill_cell.links) {
        return {links: drill_cell.links,  event: event}
     } else {
       return  null
     }
    }

    // Create a div element to set the HTML formatting 
    function componentHTML(object) {
      return <p dangerouslySetInnerHTML={formatHTML(object)} />
    }

    // Returns an html rendered value for comparison as well as the field object 
    function getComparison() {
      const comp_field = getColumn(0, 'comp')
      const single_value = getColumn(0, 'sv')
      if (comp_field.category === 'dimension' && single_value.category === 'dimension') {
        if (getColumn(1,'comp') === undefined) {
          return formatCell(0,1,'comp') === undefined ? [getColumn(0, 'comp'), formatCell(0,0,'comp')] : [getColumn(0,'comp'), formatCell(1,0,'comp')]
        } else {
          return formatCell(0,0,'comp') === firstCellFormatted ? [getColumn(1, 'comp'), formatCell(0,1,'comp')] : [getColumn(0,'comp'), formatCell(1,0,'comp')]
        }
      } if (comp_field.category === 'dimension' && single_value.category === 'measure') {
          return [getColumn(0, 'comp'), formatCell(0,0,'comp')]
        } else {
          return formatCell(0,1,'comp') ? [getColumn(1, 'comp'), formatCell(0,1,'comp')] : [getColumn(0, 'comp'), formatCell(1,0,'comp')]
        } 
    }

    // Set the comparison label to an empty string if no comparison field is available
    function setComparisonLabel() {
      const comp = getComparison()
      if (comp[0] === undefined) {
        return ''
      } else {
        return comp[0].label
      }
    }

    // Render an error message if the user has not included any fields in their query 
    if (qFields.dimension_like.length === 0 &&
            qFields.measure_like.length === 0) {
      this.addError({
        title: `No visible fields`,
        message: `At least one dimension, measure or table calculation needs to be visible.`
      })
    }
    
    // Declare constants for each visualization element 
    const firstCellFormatted = formatCell(0, 0, 'sv')
    const htmlTemplate = config && config.html_template || this.options.html_template.default
    const newTitle = config && config.vis_title || this.options.vis_title.default
    const comparison = getComparison()

    // Set container level styles for background color and text color
    visContainer.style.color = config.text_color
    visContainer.style.fontFamily = "sans-serif"
    const parent = document.getElementById('vis').parentElement
    parent.style.backgroundColor = config.background_color

    // Render the visualization and pass required props to react components 
    this.chart = ReactDOM.render(
      <SingleValueVis
        title={componentHTML(newTitle)}
        getCellDrills = {getCellDrills(0,0, 'sv')}
        show_title={config.show_title}
        title_opacity={config.title_opacity}
        show_comparison={config.show_comparison}
        show_comparison_label={config.show_comparison_label}
        html_formatted={componentHTML(firstCellFormatted)}
        title_placement={config.title_placement}
        comparison={comparison[1]}
        comparison_label={setComparisonLabel()}
        comparison_value_label={config.comparison_value_label}
        comparison_opacity={config.comparison_opacity}
        comparison_invert_color={config.comparison_invert_color}
        />
        ,
      visContainer
    )

    doneRendering()
  }
}

looker.plugins.visualizations.add(vis)
