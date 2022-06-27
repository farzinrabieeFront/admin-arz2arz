 


import { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap'
import SpotDeposit from "./deposit/SpotDeposit";
import SpotWithdraw from "./withdraw/SpotWithdraw";

export default function SpotTransactions() {
  const [key, setKey] = useState('deposit');

  return (
    <Tabs
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mt-4"
    >
      <Tab eventKey="deposit" title="واریز ارزی">
        {
          key === "deposit" ?
            <SpotDeposit />
            : null
        }
      </Tab>
      <Tab eventKey="withdraw" title="برداشت ارزی">
        {
          key === "withdraw" ?
            <SpotWithdraw />
            : null
        }
      </Tab>
    </Tabs>
  );
}
