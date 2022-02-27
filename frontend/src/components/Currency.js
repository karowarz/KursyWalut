import React from 'react';

function Currency(props) {
  const difference = (props.mid - props.oldMid).toFixed(3);
  return (
    <>
      <li className='currencyRow' onClick={() => props.click(props.code)}>
        <p className='currencyRow__element'>{props.currency}</p>
        <p className='currencyRow__element'>{props.mid}</p>
        <p
          style={{
            color:
              difference === 0 ? 'black' : difference > 0 ? 'green' : 'red',
          }}
          className='currencyRow__element'>
          {difference}
        </p>
      </li>
    </>
  );
}

export default Currency;
