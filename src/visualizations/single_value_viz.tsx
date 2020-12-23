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
      }

      .single-value {
        height: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        font-size: 52px;
        word-wrap: break-word;
        padding: 5px;
        margin: 5px;
      }     

      .title {
        height: 25%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        font-size: 36px;
        word-wrap: break-word;
        padding: 5px; 
        margin: 20px;
      }

      .comp {
        height: 25%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        font-size: 36px;
        word-wrap: break-word;
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
        html_formatted={false}/>,
      document.getElementById('vis-container')
    )
  },

  updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
    this.clearErrors()

    const qFields = queryResponse.fields

    function formatCell(row, column) {
      try {

        const row_detail = data[row]
        const return_field = qFields.dimension_like.length > 0 ? qFields.dimension_like[column] : qFields.measure_like[column]
        const cell_name = row_detail[return_field.name]
        const cell_value = LookerCharts.Utils.filterableValueForCell(cell_name)

        // create default format for measures or table calcs with no value_format set
        let cell_format = ""
        if (return_field.category === "measure" && qFields.measure_like[column].value_format === null 
            || return_field.is_table_calculation && return_field.value_format === null) {
          const measure_value = parseFloat(cell_value)
          if(Math.round(measure_value) !== measure_value) {
            cell_format = "#,##0.00"
          } else {
            cell_format = "#,##0"
           }
        } else {
           cell_format = return_field.value_format
        }

        const formatValue = formatType(cell_format) || defaultFormatter
        console.log(cell_value)
        return formatValue(cell_value).replace(/^"(.*)"$/, '$1')
        }
      catch (e) {
        return null
        }
    }

    const comparison = formatCell(0,1) ? formatCell(0,1) : formatCell(1,0)

    function getComparison() {
      let i = 0
      // console.log(i)
      // return formatCell(0,1) ? formatCell(0,1) : formatCell(1,0)
      // if (formatCell(0,1)) {
      //   return formatCell(1,2)
      // } else if (formatCell(2,1).length > 0) {
      //   return formatCell(2,1)
      // } else return this.addError({
      //   title: `No fields available for comp.`,
      //   message: `At least one dimension, measure or table calculation needs to be visible.`
      // })
    }

    if (qFields.dimension_like.length === 0 &&
            qFields.measure_like.length === 0) {
      this.addError({
        title: `No visible fields`,
        message: `At least one dimension, measure or table calculation needs to be visible.`
      })
    }

    const firstCell = formatCell(0, 0)
    const htmlTemplate = config && config.html_template || this.options.html_template.default

    function formatHTML() {
      return { __html: htmlTemplate.replace(/{{.*}}/g, firstCell) }
    }

    function componentHTML() {
      return <div dangerouslySetInnerHTML={formatHTML()} />
    }

    this.chart = ReactDOM.render(
      <SingleValueVis
        title={config.title}
        show_title={config.show_title}
        show_comparison={config.show_comparison}
        html_formatted={componentHTML()}
        comparison={comparison}/>,
      document.getElementById('vis-container')
    )

    doneRendering()
  }
}

looker.plugins.visualizations.add(vis)
