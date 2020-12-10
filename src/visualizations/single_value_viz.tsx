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
      type: 'string',
      label: 'HTML Template',
      default: `<p>{{ rendered_value }}</p>`
    },
    title: {
      type: 'string',
      label: 'Title',
      default: 'My DEFAULT title'
    },
    show_title: {
      type: 'boolean',
      label: 'Show Title',
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
        font-size: 52px;
      }

      .title {
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

    const firstRow = data[0]
    const qFields = queryResponse.fields

    if (qFields.dimension_like.length === 0 &&
            qFields.measure_like.length === 0) {
      this.addError({
        title: `No visible fields`,
        message: `At least one dimension, measure or table calculation needs to be visible.`
      })
    }

    const firstCell = firstRow[qFields.dimension_like.length > 0 ? qFields.dimension_like[0].name : qFields.measure_like[0].name]
    const formatValue = formatType(qFields.dimension_like.length > 0 ? qFields.dimension_like[0].value_format : qFields.measure_like[0].value_format) || defaultFormatter
    const htmlForCell = formatValue(LookerCharts.Utils.filterableValueForCell(firstCell))
    const htmlTemplate = config && config.html_template || this.options.html_template.default

    function formatHTML() {
      return { __html: htmlTemplate.replace(/{{.*}}/g, htmlForCell) }
    }

    function componentHTML() {
      return <div dangerouslySetInnerHTML={formatHTML()} />
    }

    this.chart = ReactDOM.render(
      <SingleValueVis
        title={config.title}
        show_title={config.show_title}
        html_formatted={componentHTML()}/>,
      document.getElementById('vis-container')
    )

    doneRendering()
  }
}

looker.plugins.visualizations.add(vis)
