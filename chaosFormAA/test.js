dateConvertTest = (data) => {
    newDate = new Date(data);
   console.log(data); 
   console.log(Date.parse(data));
   console.log(newDate);
   console.log(newDate.getMonth());
}

dateConvertTest('11/22/2018');
