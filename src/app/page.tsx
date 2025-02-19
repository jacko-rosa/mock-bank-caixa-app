'use strict';
'use client';

import { useState } from 'react';
import Select from 'react-select';
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import ContractInformation from './components/contract/contratc-information.component';
import "./style.css";

export default function Home() {
  interface OptionType {
    value: string;
    label: string;
  }

  const options = [
    { value: 'authentication', label: 'Authentication' },
    { value: 'openfinance-accounts', label: 'OpenFinance: Accounts' },
  ]

  const [selectedOption, setSelectedOption] = useState<OptionType>(options[0]);

  const handleChange = (option: OptionType) => {
    setSelectedOption(option);
  };

  return (
    <main>
      <Select options={options} onChange={handleChange} defaultValue={options[0]} />
      <ContractInformation title={'API Bank Caixa'} description={'Mock for API at Bank Caixa'} contract={selectedOption.value} />
      <SwaggerUI url={`contract/${selectedOption.value}.yaml`} />
    </main>
  );
}
