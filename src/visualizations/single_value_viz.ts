import * as d3 from 'd3'
// import { handleErrors } from '../common/utils'

import {
  Looker,
  LookerChartUtils
} from '../common/types'

declare var looker: Looker
declare var LookerCharts: LookerChartUtils

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
    }
  },

  // tslint:disable-next-line:no-empty
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
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        font-size: 36px;
        word-wrap: break-word;
        font-color: grey;
      }
      </style>
    `

    const container = element.appendChild(document.createElement('div'))
    const renderedValue = document.createElement('div')
    const title = document.createElement('div')
    title.className = 'title'
    title.id = 'content-title'
    container.className = 'container'
    this._textElement = container.appendChild(renderedValue)
    container.appendChild(title)
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

    const formatValue = (x) => (isNaN(parseFloat(x))) ? String(x).replace(/['"]+/g, '') : parseFloat(x).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    const htmlForCell = formatValue(LookerCharts.Utils.filterableValueForCell(firstCell))
    const htmlTemplate = config && config.html_template || this.options.html_template.default

    const htmlFormatted = htmlTemplate.replace(/{{.*}}/g, htmlForCell)
    // const container = element.appendChild(document.createElement('div'))

    // const content = document.createElement('p')
    // content.innerHTML = htmlFormatted

    this._textElement.innerHTML = htmlFormatted

    // const title = element.appendChild(document.createElement('p'))
    element.querySelector('#content-title').textContent = config.title
    // container.appendChild(content)
    // container.appendChild(title)
    // container.appendChild(title)
    // container.appendChild(containerStyle)
    // container.className = 'container'

    // this.svg.textContent = container.textContent

    // this.svg = d3.select(element).append('svg').attr('class', 'single-value-vis')

    // element.innerHTML = container.innerHTML

    doneRendering()
  }
}

looker.plugins.visualizations.add(vis)
