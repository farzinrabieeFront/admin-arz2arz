import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import LimitationRefCurrency from './LimitationRefCurrency';
import USDTLimitation from './USDTLimitation';

export default function LimitationPage() {
    return (
        <Tabs defaultActiveKey="refCurrency"  className="mt-4">
            <Tab eventKey="refCurrency" title=" ارز مرجع">
                <LimitationRefCurrency />
            </Tab>
            <Tab eventKey="usdt" title="فروش تتر (USDT)">
                <USDTLimitation />
            </Tab>
        </Tabs>
    )
}
