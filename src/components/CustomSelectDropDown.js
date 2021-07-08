import React, { useEffect, useState } from "react";
import Select from "react-select";

const CustomSelectDropDown = ({ options, label, setState, dValue, isMulti }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (dValue) {
      setValue({ label: dValue, value: dValue })
    }
  }, [dValue])

  const handleChange = (newSelection) => {
    setValue(newSelection);
    setState(newSelection.value);
  };

  return (<div style={{ position: 'relative', margin: '10px 0' }}>
    <span
      style={{
        position: 'absolute',
        top: '-10px',
        left: '10px',
        // zIndex: 1,
        background: 'white',
        padding: '0 5px'
      }}
    >{label}</span>

    <div style={{
      border: '1px solid rgb(191 191 191)'
    }}>
      <Select
        value={value}
        onChange={handleChange}
        // name="colors"
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
        placeholder={`choose ${label}`}
      />
    </div>
    {isMulti && <Select
      value={value}
      onChange={handleChange}
      isMulti
      name="colors"
      options={options}
      className="basic-multi-select"
      classNamePrefix="select"
    />}
  </div>);
};

export default CustomSelectDropDown;
