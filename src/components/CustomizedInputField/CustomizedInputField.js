import React from 'react';
import CurrencyInput from 'react-currency-input-field';
import { triggerAuthUser } from '../../myFunctions';
import UserProfile from '../UserProfile/UserProfile';

function CurrencyField({ placeholder, defaultValue, handleOnChange, user }) {
  // const defaultValueRef = (defaultValue)?.slice(1).replace(/,/g, '')
  const currentUser = UserProfile.getUser();
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
        if(currentUser?.uid){
          if(value){ handleOnChange(value) }
          if (priceErrSection) { priceErrSection.textContent = '' }
        }else{
          alert('You have to login to continue');
          triggerAuthUser(true)
        }
      }}
      allowNegativeValue={false}
    />
  )
}

export default CurrencyField
