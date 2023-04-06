import React from 'react';

import styles from '../../styles';

const regex = /^[A-Za-z0-9]+$/;

function CustomInput({ label, placeHolder, Attribs }) {
  return (
    <>
      <label htmlFor="name" className={`${styles.label} mt-2`}>
        {label}
      </label>
      <input
        type="text"
        placeholder={placeHolder}
        {...Attribs}
        className={styles.input}
      />
    </>
  );
}

// function CustomInput({ label, placeHolder, value, handleValueChange }) {
//   return (
//     <>
//       <label htmlFor="name" className={styles.label}>
//         {label}
//       </label>
//       <input
//         type="text"
//         placeholder={placeHolder}
//         value={value}
//         onChange={(e) => {
//           if (e.target.value === '' || regex.test(e.target.value))
//             handleValueChange(e.target.value);
//         }}
//         className={styles.input}
//       />
//     </>
//   );
// }

export default CustomInput;
