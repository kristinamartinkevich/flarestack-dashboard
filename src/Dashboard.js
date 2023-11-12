import React, { useState } from 'react';
import Map from './Map';
import TimeSeriesPlot from './Plot';
import test_flarestacks from './test_flarestacks.json';

const Dashboard = () => {
    const [selectedFlarestack, setSelectedFlarestack] = useState('flare4');
    const [selectedProperty, setSelectedProperty] = useState('co2_rate');

    return (
        <div>
            <div>
                <TimeSeriesPlot selectedFlarestack={selectedFlarestack} selectedProperty={selectedProperty} />
                <div>
                    <button onClick={() => setSelectedProperty('co2_rate')}>co2_rate</button>
                    <button onClick={() => setSelectedProperty('volume_tracked')}>volume_tracked</button>
                    <button onClick={() => setSelectedProperty('rate_estimated')}>rate_estimated</button>
                </div>
            </div>
            <div>
                <Map flarestacks={test_flarestacks} onSelectFlarestack={(selectedFlarestack) => setSelectedFlarestack(selectedFlarestack.flare_stack_name)} />
            </div>
        </div>
    );
};

export default Dashboard;
