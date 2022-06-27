import { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap'
import FiatDeposit from "./deposit/FiatDeposit";
import FiatWithdraw from "./withdraw/FiatWithdraw";

export default function FiatTransactionsPage() {
  const [key, setKey] = useState('deposit');

  return (
    <Tabs
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mt-4"
    >
      <Tab eventKey="deposit" title="واریز تومانی">
        {
          key === "deposit" ?
            <FiatDeposit />
            : null
        }
      </Tab>
      <Tab eventKey="withdraw" title="برداشت تومانی">
        {
          key === "withdraw" ?
            <FiatWithdraw />
            : null
        }
      </Tab>
    </Tabs>
  );
}
