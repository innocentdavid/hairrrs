import React from 'react';
import CurrencyInput from 'react-currency-input-field';

function CurrencyField({ placeholder, defaultValue, handleOnChange, user }) {
  // const defaultValueRef = (defaultValue)?.slice(1).replace(/,/g, '')
  const prefix = user?.currency?.symbol

  var priceErrSection = document.querySelector('.priceErrSection')


  return (
    <CurrencyInput
      id=""
      name=""
      prefix={prefix}
      decimalsLimit={2}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onValueChange={(value, name) => {
        if(value){ handleOnChange(value) }
        if (priceErrSection) { priceErrSection.textContent = '' }
      }}
      allowNegativeValue={false}
    />
  )
}

export default CurrencyField
