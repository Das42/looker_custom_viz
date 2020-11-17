looker.plugins.visualizations.add({
    options: {
        html_template: {
            type: "string",
            label: "HTML Template",
            default: `<div><p>{{ rendered_value }}</p></div>`
        }
    },

    create: function(element, config) {},

    updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
        this.clearErrors();
        
        console.log( 'data', data );
        console.log( 'element', element );
        console.log( 'config', config );
        console.log( 'queryResponse', queryResponse );

        const firstRow = data[0];
        const qFields = queryResponse.fields;

        if (qFields.dimension_like.length === 0 &&
            qFields.measure_like.length === 0) {
            this.addError({
                title: `No visible fields`,
                message: `At least one dimension, measure or table calculation needs to be visible.`
            })
        }

        const firstCell = firstRow[qFields.dimension_like.length > 0 ? qFields.dimension_like[0].name : qFields.measure_like[0].name];

        const formatValue = (x) => (isNaN(parseFloat(x))) ? String(x).replace(/['"]+/g, '') : parseFloat(x).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        const htmlForCell = formatValue(LookerCharts.Utils.filterableValueForCell(firstCell));
        const htmlTemplate = config && config.html_template || this.options.html_template.default;

        const htmlFormatted = htmlTemplate.replace(/{{.*}}/g, htmlForCell);

        element.innerHTML = htmlFormatted;

        doneRendering();
    }
});
