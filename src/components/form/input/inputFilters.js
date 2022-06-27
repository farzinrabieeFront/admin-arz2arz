export const mobileFilter = (evt) => {
  let ASCIICode = evt.which ? evt.which : evt.keyCode;
  // console.log(value);
  if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) {
    evt.preventDefault();
  }
};

export const amountFilter = (evt) => {
  // console.log(evt);

  let ASCIICode = evt.which ? evt.which : evt.keyCode;

  if (
    ASCIICode > 31 &&
    (ASCIICode < 46 || ASCIICode > 57 || ASCIICode === 47)
  ) {
    evt.preventDefault();
  } else if (ASCIICode === 46 && new RegExp(/\./, "g").test(evt.target.value)) {
    evt.preventDefault();
  }
};
