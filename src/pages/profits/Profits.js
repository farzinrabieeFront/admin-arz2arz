import { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap'
import FiatProfit from './fiat/FiatProfit';
import LimitProfit from './limit/LimitProfit';
import MarketProfit from './market/MarketProfit';
import WithdrawProfit from './withdraw/WithdrawProfit';
//components


export default function ProfitsPage() {
  const [key, setKey] = useState('fiat');
  return (
    <Tabs
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mt-4"
    >
      <Tab eventKey="fiat" title="معاملات خرید و فروش">
        {
          key === "fiat" ?
            <FiatProfit />
            : null
        }
      </Tab>
      <Tab eventKey="market" title="معاملات تبدیل ارز">
        {
          key === "market" ?
            <MarketProfit />
            : null
        }
      </Tab>
      <Tab eventKey="limit" title="معاملات اتوماتیک">
        {
          key === "limit" ?
            <LimitProfit />
            : null
        }
      </Tab>
      <Tab eventKey="withdraw" title="برداشت ارزی">
        {
          key === "withdraw" ?
            <WithdrawProfit />
            : null
        }
      </Tab>

    </Tabs>
  );
}
