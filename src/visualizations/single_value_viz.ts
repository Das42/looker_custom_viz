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
      label: 'Title',
      default: 'Default Title'
    }
  },

  // tslint:disable-next-line:no-empty
  create: function(element, _config) {
    element.innerHTML = `
      <style>
        .single-value-vis {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          font-size: 12px;
        }
      </style>
    `
    this.svg = d3.select(element).append('svg').attr('class', 'single-value-vis')
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
    const container = document.createElement('div')
    element.className = 'single-value-viz'
    const content = document.createElement('p')
    content.innerHTML = htmlFormatted
    const title = document.createElement('p')
    title.textContent = config.title || this.options.title.default
    container.appendChild(content)
    container.appendChild(title)

    this.svg.textContent = container.textContent

    this.svg = d3.select(element).append('svg').attr('class', 'single-value-vis')

    element.innerHTML = container.innerHTML

    doneRendering()
  }
}

looker.plugins.visualizations.add(vis)
