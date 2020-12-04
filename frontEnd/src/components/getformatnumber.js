const   getFormatNumber= (num) =>{
    if (num == null || num == "") return "0";

    let decimalSeparator = ".";
    let baseSeparator = ",";
    num = num.toString().replace(/\,/g, "");
    num = parseFloat(num);
    let base = parseInt(num);
    let decimal = num - base;
    let format = base
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + baseSeparator);
    if (decimal > 0)
      format =
        format + decimalSeparator + decimal.toString().replace(/\0./g, "");
    //num = num.toString().replace(/\./g, "").replace(/\,/g, "");
    return format;
  }

export default getFormatNumber;
