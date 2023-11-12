import React, { useState, useEffect } from 'react';
import jsonData from './test.json';
import Plot from 'react-plotly.js';

const TimeSeriesPlot = ({ selectedFlarestack, selectedProperty }) => {
    const dataset = jsonData;
    const [filteredData, setFilteredData] = useState([]);
    const [yAxisRange, setYAxisRange] = useState(null);

    useEffect(() => {
        const selectedData = dataset.filter(data => data.flare_stack_name === selectedFlarestack);
        setFilteredData(selectedData);
        let minPropertyValue;
        let maxPropertyValue;

        switch (selectedProperty) {
            case 'co2_rate':
                minPropertyValue = 0.5;
                maxPropertyValue = 10;
                break;
            case 'volume_tracked':
                minPropertyValue = 10;
                maxPropertyValue = 40;
                break;
            case 'rate_estimated':
                minPropertyValue = 10;
                maxPropertyValue = 24;
                break;
            default:
                const propertyValues = selectedData.map(data => Number(data[selectedProperty]));
                minPropertyValue = Math.min(...propertyValues);
                maxPropertyValue = Math.max(...propertyValues);
                break;
        }

        setYAxisRange([minPropertyValue, maxPropertyValue]);
    }, [selectedFlarestack, selectedProperty, dataset]);

    return (
        <Plot
            data={[
                {
                    x: filteredData.map(data => new Date(Number(data.time)).toISOString()),
                    y: filteredData.map(data => Number(data[selectedProperty])),
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: { color: 'blue' },
                },
            ]}
            layout={{
                title: 'Time Series Visualization',
                xaxis: { title: 'Time' },
                yaxis: {
                    title: `${selectedProperty} for ${selectedFlarestack}`, range: yAxisRange
                },
            }}
        />
    );
};

export default TimeSeriesPlot;
