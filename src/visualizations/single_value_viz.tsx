// import * as d3 from 'd3'
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

const vis = {
  options: {
    html_template: {
      section: ' Style',
      type: 'string',
      label: 'HTML Template',
      default: `<p>{{ rendered_value }}</p>`
    },
    title: {
      section: ' Style',
      type: 'string',
      label: 'Title',
      default: 'My DEFAULT title'
    },
    show_title: {
      section: ' Style',
      type: 'boolean',
      label: 'Show Title',
      default: false
    },
    show_comparison: {
      section: 'Comparison',
      type: 'boolean',
      label: 'Show Comparison',
      default: false
    },
    show_comparison_label: {
      section: 'Comparison',
      type: 'boolean',
      label: 'Show Label',
      default: true
    },
    comparison_value_label: {
      section: 'Comparison',
      type: 'string',
      display: 'select',
      label: 'Value Labels',
      values: [{'Show as Value': 'show_value'}, {'Show as Change': 'show_change'}],
      default: 'show_change'
     }, 
    background_color: {
      type: 'string',
      label: 'Background Color'
    }
  },

  create: function(element, config) {
    element.innerHTML = `
      <style>
      .container {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        flex: 1 1 auto; 
        padding: 5px;
      }

      .single-value {
        font-size: 32px;
        flex: 1 0 0;
        word-wrap: break-word;
      }     

      .title {
        word-wrap: break-word;
        margin-bottom: 20px;
        margin-top: -20px;
      }

      .comp {
      }
      </style>
    `

    const container = element.appendChild(document.createElement('div'))
    container.className = 'container'
    container.id = 'vis-container'

    this.chart = ReactDOM.render(
      <SingleValueVis
        title={config.title}
        show_title={config.show_title}
        background_color={config.background_color}
        html_formatted={false}/>,
      document.getElementById('vis-container')
    )
  },

  updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
    this.clearErrors()

    const qFields = queryResponse.fields

    function getRow(row) {
      return data[row]
    }

    function getColumn(column, object) {
      if (object === 'comp') {
        return qFields.dimension_like.length > 0 ? qFields.dimension_like[column] : qFields.measure_like[column]
      } else {
          return qFields.measure_like.length > 0 ? qFields.measure_like[column] : qFields.dimension_like[column]
      }
    }

    function getCellName(row, column, object) {
      const row_detail = getRow(row)
      const column_detail = getColumn(column, object)
      return row_detail[column_detail.name]      
    }

    function getCellValue(cell_name) {
      return LookerCharts.Utils.filterableValueForCell(cell_name)
    }

    function formatCell(row, column, object) {
      try {
        const cell_name = getCellName(row, column, object)
        const column_detail = getColumn(column, object)
        const cell_value = getCellValue(cell_name)

        // create default format for measures or table calcs with no value_format set
        let cell_format = ""
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

        const formatValue = formatType(cell_format) || defaultFormatter

        return formatValue(cell_value).replace(/^"(.*)"$/, '$1')
        }
      catch (e) {
        return null
        }
    }

    function formatHTML() {
      return { __html: htmlTemplate.replace(/{{.*}}/g, firstCellFormatted) }
    }

    function componentHTML() {
      return <div dangerouslySetInnerHTML={formatHTML()} />
    }

    function getComparison() {
      const comp_field = getColumn(0, 'comp')
      if (comp_field.category === 'dimension') {
        return formatCell(0,0,'comp') === firstCellFormatted ? [getColumn(1, 'comp'), formatCell(0,1,'comp')] : [getColumn(0,'comp'), formatCell(0,0,'comp')]
      } else {
        return formatCell(0,1,'comp') ? [getColumn(1, 'comp'), formatCell(0,1,'comp')] : [getColumn(0, 'comp'), formatCell(1,0,'comp')]
      }
    }

    if (qFields.dimension_like.length === 0 &&
            qFields.measure_like.length === 0) {
      this.addError({
        title: `No visible fields`,
        message: `At least one dimension, measure or table calculation needs to be visible.`
      })
    }
    
    const firstCellFormatted = formatCell(0, 0, 'sv')
    const htmlTemplate = config && config.html_template || this.options.html_template.default

    const comparison = getComparison()

    this.chart = ReactDOM.render(
      <SingleValueVis
        title={config.title}
        show_title={config.show_title}
        show_comparison={config.show_comparison}
        show_comparison_label={config.show_comparison_label}
        html_formatted={componentHTML()}
        comparison={comparison[1]}
        comparison_label={comparison[0].label}
        comparison_value_label={config.comparison_value_label}
        background_color={config.background_color}
        html_formatted={componentHTML()}/>,
      document.getElementById('vis-container')
    )

    doneRendering()
  }
}

looker.plugins.visualizations.add(vis)
