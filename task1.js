const data = [
  [1, 0, 1, 1],
  [0, 0, 0, 1],
  [1, 1, 1, 1],
];
let obj = {};
const task_1 = (data) => {
  //записываем сколько баллов каждая задача
  for (let i = 0; i < data[0].length; i++) {
    obj[i] = data.reduce((acc, item) => {
      return +acc + item[i];
    }, []);
    obj[i] = data.length - obj[i] + 1;
  }

  //считаем баллы по каждому ученику
  return data.map((item, index) => {
    return `${item.reduce((acc, k, i) => {
      if (k === 1) {
        acc = +acc + obj[i];
      }
      return acc;
    }, [])} баллов набрал ${index + 1} ученик`;
  });
};
