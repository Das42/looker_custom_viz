// import * as d3 from 'd3'
import { formatType } from '../common/utils'
import React from 'react'
import ReactDOM from 'react-dom'

import {
  Looker,
  LookerChartUtils
} from '../common/types'

declare var looker: Looker
declare var LookerCharts: LookerChartUtils

type Formatter = ((s: any) => string)
const defaultFormatter: Formatter = (x) => x.toString()

const createTitle = () => {
  const title = document.createElement('div')
  title.className = 'title'
  title.id = 'content-title'
  return title
}

class SingleValueVis extends React.Component {
  constructor (props) {
    super(props)
    // this.createTitle = this.createTitle.bind(this)
  }

  // createTitle() {
  //   const title = document.createElement('div')
  //   title.className = 'title'
  //   title.id = 'content-title'
  //   return title
  // }

  // render our data
  render() {
    return <div>React with TypeScript</div>
  }
}

const vis = {
  options: {
    html_template: {
      type: 'string',
      label: 'HTML Template',
      default: `<p>{{ rendered_value }}</p>`
    },
    title: {
      type: 'string',
      label: 'Title'
    },
    show_title: {
      type: 'boolean',
      label: 'Show Title',
      default: true
    }
  },

  create: function(element, _config) {
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
    const renderedValue = document.createElement('div')
    container.className = 'container'
    container.id = 'vis-container'
    this._textElement = container.appendChild(renderedValue)

    this.chart = ReactDOM.render(
      <SingleValueVis />,
      this._textElement
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

    const htmlFormatted = htmlTemplate.replace(/{{.*}}/g, htmlForCell)

    if (config.show_title === false && element.querySelector('#content-title')) {
      element.querySelector('#content-title').remove()
    } else if (config.show_title === true && !element.querySelector('#content-title')) {
      element.querySelector('#vis-container').appendChild(createTitle())
      element.querySelector('#content-title').textContent = config.title
    }

    this._textElement.innerHTML = htmlFormatted

    this.chart = ReactDOM.render(
      <SingleValueVis />,
      this._textElement
    )

    doneRendering()
  }
}

looker.plugins.visualizations.add(vis)
