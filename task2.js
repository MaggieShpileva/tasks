const task_2 = (str) => {
  let arr = [];
  let resultArr = [];
  let digitString = "";
  let letterString = "";
  let alphabet = "abcdefghijklmnopqrstuvwxyz";

  const getNumberFromString = (str) => {
    return str.split("").reduce((res, letter) => {
      return res + (alphabet.indexOf(letter) + 1);
    }, "");
  };

  //разделяем строку на буквенные и численные строки
  for (i = 0; i < str.length; i++) {
    if (str[i] >= "0" && str[i] <= "9") {
      digitString += str[i]; //собираем строку из чисел
      if (letterString) {
        // Если в строке с буквами что-то есть пушим в массив
        arr.push(letterString);
        letterString = "";
      }
    } else {
      letterString += str[i];
      //собираем строку из букв
      if (digitString) {
        // Если в численной строке что-то есть пушим в массив
        arr.push(digitString);
        digitString = "";
      }
    }
    if (i === str.length - 1) {
      if (letterString) {
        arr.push(letterString);
        letterString = "";
      }
    }
    if (i === str.length - 1) {
      if (digitString) {
        arr.push(digitString);
        digitString = "";
      }
    }
  }
  for (i = 0; i < arr.length; i++) {
    if (!isNaN(arr[i])) {
      resultArr.push(arr[i]);
    } else {
      if (isNaN(arr[i]) && !arr[i + 1]) {
        resultArr.push(getNumberFromString(arr[i]));
      }
      if (arr[i + 1]) {
        resultArr.push(getNumberFromString(arr[i]) * arr[i + 1]);
        i++;
      }
    }
  }

  //вычисление результата
  return resultArr.reduce((acc, item, index) => {
    index % 2 == 0 ? (acc += item) : (acc -= item);

    return acc;
  }, []);
};
