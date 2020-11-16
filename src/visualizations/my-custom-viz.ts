import { Looker, VisualizationDefinition } from '../common/types';
import { handleErrors } from '../common/utils';

declare var looker: Looker;

interface WhateverNameYouWantVisualization extends VisualizationDefinition {
    elementRef?: HTMLDivElement,
}

const vis: WhateverNameYouWantVisualization = {
    id: 'someId', // id/label not required, but nice for testing and keeping manifests in sync
    label: 'Some Label',
    options: {
        title: {
            type: 'string',
            label: 'Title',
            display: 'text',
            default: 'Some Name'
        }
    },
    // Set up the initial state of the visualization
    create(element, config) {
        this.elementRef = element;
    },
    // Render in response to the data or settings changing
    update(data, element, config, queryResponse) {
        console.log( 'data', data );
        console.log( 'element', element );
        console.log( 'config', config );
        console.log( 'queryResponse', queryResponse );
        const errors = handleErrors(this, queryResponse, {
            min_pivots: 0,
            max_pivots: 0,
            min_dimensions: 1,
            max_dimensions: 1,
            min_measures: 1,
            max_measures: 1
        });
        if (errors) { // errors === true means no errors
            // TODO: Do stuff here
        }
    }
};

looker.plugins.visualizations.add(vis);