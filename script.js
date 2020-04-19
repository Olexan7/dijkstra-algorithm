let EXAMPLEARRAY = [
  [0, 10, 30, 50, 10],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 10],
  [0, 40, 20, 0, 0],
  [10, 0, 10, 30, 0],
];
document.querySelector(".count-button").addEventListener("click", () => {
  let numberVertices = parseInt(document.querySelector(".count-input").value);
  document.querySelector(".table-container").innerHTML = generateFormInputs(
    numberVertices,
    0
  );
});

document.querySelector(".random-button").addEventListener("click", () => {
  let numberVertices = parseInt(document.querySelector(".count-input").value);
  document.querySelector(".table-container").innerHTML = generateFormInputs(
    numberVertices,
    1
  );
});

document.querySelector(".examlpe-button").addEventListener("click", () => {
  document.querySelector(".table-container").innerHTML = generateFormInputs(
    undefined,
    2
  );
});

document.querySelector(".calc-button").addEventListener("click", () => {
  let arrayPathValue = getArrayOfValue();
  let vertex = parseInt(document.querySelector(".sourse-vertex").value) - 1;
  let concept = createVertexObject(arrayPathValue.length, vertex);
  let currentVertex = vertex;
  let flag = true;

  while (flag) {
    concept = findPath(concept, arrayPathValue, currentVertex);
    currentVertex = findMinPathVertexValue(concept, arrayPathValue.length);
    flag = checkFlag(concept);
  }
  getAnswer(concept, arrayPathValue.length, vertex);
});

const checkFlag = (concept) => {
  for (key in concept) {
    if (!concept[key].check) return true;
  }
  return false;
};

const findMinPathVertexValue = (concept, length) => {
  let falseValue = Infinity;
  let number;
  for (key in concept) {
    if (concept[key].way < falseValue && !concept[key].check) {
      number = key;
      falseValue = concept[key].way;
    }
  }
  return number;
};

const findPath = (concept, array, vertex) => {
  for (let i = 0; i < array.length; i++) {
    let mark = concept[vertex].way + array[vertex][i];
    if (mark < concept[i].way) {
      concept[i].way = mark;
      concept[i].vector = vertex;
    }
  }
  concept[vertex].check = true;
  return concept;
};

const getAnswer = (object, length, vertex) => {
  let template = `<p class = "answer-header">Оптимальные маршруты от вершины № ${
    vertex + 1
  }:</p>`;
  let vectorValue = `<p class = "answer-vector">Вектор P: {`;
  for (let i = 0; i < length; i++) {
    template += `<p class = "answer-value" >К вершине № ${i + 1} равен ${
      object[i].way
    }</p>`;

    if (i == length - 1) {
      vectorValue += `${parseInt(object[i].vector) + 1}`;
    } else {
      vectorValue += `${parseInt(object[i].vector) + 1},`;
    }
  }
  vectorValue += `}</p>`;

  document.querySelector(".answer").innerHTML = template;
  document.querySelector(".answer").innerHTML += vectorValue;
};

const createVertexObject = (length, number) => {
  let concept = {};
  for (let i = 0; i < length; i++) {
    if (i == number) {
      concept[i] = { way: 0, check: false };
    } else {
      concept[i] = { way: Infinity, check: false };
    }
    concept[i].vector = number;
  }
  return concept;
};

const getArrayOfValue = () => {
  let tableRowsArray = [...document.querySelector(".table-input").rows];
  let arrayValuePath = [];
  for (let i = 1; i < tableRowsArray.length; i++) {
    arrayValuePath[i] = [];
    for (let j = 1; j < tableRowsArray[i].cells.length; j++) {
      arrayValuePath[i].push(
        parseInt(tableRowsArray[i].cells[j].firstChild.value)
      );
    }
  }
  arrayValuePath.shift();
  for (let i = 0; i < arrayValuePath.length; i++) {
    for (let j = 0; j < arrayValuePath[i].length; j++) {
      if (arrayValuePath[i][j] == 0 || isNaN(arrayValuePath[i][j])) {
        arrayValuePath[i][j] = Infinity;
      }
    }
  }
  return arrayValuePath;
};

const generateFormInputs = (count = 5, mode) => {
  let array = EXAMPLEARRAY[0].concat(
    EXAMPLEARRAY[1],
    EXAMPLEARRAY[2],
    EXAMPLEARRAY[3],
    EXAMPLEARRAY[4]
  );
  let template = `<table class = "table-input">`;
  template += `<caption>Таблица значений путей (0 пути нет)</caption>`;
  for (let i = 0; i < count + 1; i++) {
    template += `<tr>`;

    for (let j = 0; j < count + 1; j++) {
      if (i == 0) {
        if (j == 0) {
          template += `<th></th>`;
        } else {
          template += `<th>${j}</th>`;
        }
      } else {
        if (j == 0) {
          template += `<th>${i}</th>`;
        } else {
          template += `<td class = "container-input"><input class="value-path" type="text"  ${
            mode == 0 ? `` : `value=${inputValue(mode, array)}`
          } /></td>`;
        }
      }
    }
    template += `</tr>`;
  }
  template += `</table>`;
  setOptiontSourseVertex(count);
  document.querySelector(".calc-button").classList.remove("hide");
  document.querySelector(".sourse-vertex").classList.remove("hide");
  document.querySelector(".vertex-label").classList.remove("hide");
  return template;
};

const inputValue = (mode, array) => {
  switch (mode) {
    case 1:
      return parseInt(Math.random() * 30);
    case 2:
      return array.shift();
  }
};

setOptiontSourseVertex = (number) => {
  document.querySelector(".sourse-vertex").innerHTML = "";
  for (let i = 1; i <= number; i++) {
    let newOption = new Option(i, i);
    document.querySelector(".sourse-vertex").append(newOption);
  }
};
