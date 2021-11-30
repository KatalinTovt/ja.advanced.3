

let previous = document.getElementById('previous');
let result = document.getElementById('result');
let entry = '';
let eqEntry = '';
let eq = '';
let reset = false;
let operation = false;
let btnResult = false;
let allBtn = document.getElementsByClassName('btn');
let btnNum = document.getElementsByClassName('btn-info');
for (let i = 0; i < allBtn.length; i++) {
  allBtn[i].addEventListener('click', function () {
    if (this.classList.contains('btn-point') == true) {
      if (entry.includes('.')) {
        return
      } else {
        entry = entry + this.value;
      }
    }
    if (this.classList.contains('btn-info') == true) {
      if (result.innerHTML == '0' && previous.innerHTML == '0') {
        result.innerHTML = "";
        previous.innerHTML = "";
        entry = '';
        eqEntry = '';
        eq = '';
      }
      entry = entry + this.value;
      if (reset == true) {
        entry = this.value;
        eqEntry = eqEntry + entry;
        reset = false;
      }
      else {
        eqEntry = eqEntry + this.value;
      }
      eq = eqEntry;
      result.innerHTML = entry;
      previous.innerHTML = eq;
      operation = false;
    }
    if (this.classList.contains('btn-point') == true || this.classList.contains('btn-warning') == true || this.classList.contains('btn-bracket-open') == true || this.classList.contains('btn-bracket-close') == true) {
      if (result.innerHTML == '0' && previous.innerHTML == '0') {
        result.innerHTML = "0";
        previous.innerHTML = "0";
        entry = '';
        eqEntry = '';
        eq = '';
        return
      }
    }
    if (this.classList.contains('btn-ac')) {
      entry = 0;
      eq = 0;
      eqEntry = 0;

      result.innerHTML = entry;
      previous.innerHTML = eq;
    }
    if (this.classList.contains('btn-ce')) {


      entry = entry.slice(0, -1);
      result.innerHTML = entry;
      eq = eq.slice(0, -1);
      eqEntry = eqEntry.slice(0, -1);
      previous.innerHTML = eq;
      if (entry.length == 0) {
        result.innerHTML = 0;
      }
      if (eq.length == 0) {
        previous.innerHTML = 0;
      }
    }




    if (this.classList.contains('btn-primary') == true) {
      eqEntry = eqEntry + this.value;
      eq = eqEntry;
      result.innerHTML = entry;
      previous.innerHTML = eq;
    }

    if (this.classList.contains('btn-warning') == true) {
      if (operation == true) {
        return
      }
      else {
        eqEntry = eqEntry + this.value;
        eq = eqEntry;
        reset = true;
        result.innerHTML = entry;
        previous.innerHTML = eq;
        operation = true;
      }
    }
    if (this.classList.contains('btn-result') == true) {
      let number = '';
      let arrString = eq.split('');
      let arr = [];
      let sum = '';
      let intermOper = '';
      let intermSum = '';
      btnResult = true;
      let index = '';

      for (let x = 0; x < arrString.length; x++) {
        if (isNaN(arrString[x]) == false) {
          number = number + arrString[x];
        } else {
          if (number == '') {
            arr.push(arrString[x]);
            continue

          }
          arr.push(+number);
          number = '';
          arr.push(arrString[x]);
        }
      }
      if (isNaN(number) == false && number != '') {
        arr.push(+number);
      }
      while (true) {
        if (arr.length == 1) {
          sum = +arr[0];
          result.innerHTML = sum;
          break;
        }
        if (arr.includes('(') == true) {
          for (let i = arr.lastIndexOf('('); i < arr.indexOf(')', arr.lastIndexOf('(')); i++) {
            if (arr[i] == '+' || arr[i] == '-' || arr[i] == '/' || arr[i] == '*') {
              intermOper = arr[i];
            }
            if (isNaN(arr[i]) == false && intermSum == '' && intermOper == '') {
              intermSum = +arr[i];
            }
            if (isNaN(arr[i]) == false && intermOper.length == 1) {
              if (intermOper == '+') {
                intermSum = intermSum + +arr[i];
                intermOper = ''
              }
              if (intermOper == '-') {
                intermSum = intermSum - +arr[i];
                intermOper = ''
              }
              if (intermOper == '*') {
                intermSum = intermSum * +arr[i];
                intermOper = ''
              }
              if (intermOper == '/') {
                intermSum = intermSum / +arr[i];
                intermOper = ''
              }
            }


          }
          if (arr.lastIndexOf('(') != -1) {
            index = arr.lastIndexOf('(')
            arr[arr.lastIndexOf('(')] = intermSum;
            intermSum = '';

          }
          arr.splice(index + 1, arr.indexOf(')', index) - index)
          index = '';
        }
        else if (arr.includes('*') == true || arr.includes('/') == true) {
          for (let x = 0; x < arr.length; x++) {
            if (arr[x] == '*') {
              intermSum = arr[x - 1] * arr[x + 1];
              index = arr.indexOf(arr[x]) - 1;
              arr[index] = intermSum;
              arr.splice(index + 1, 2)
              intermSum = '';
              index = '';
            }
            if (arr[x] == '/') {
              intermSum = arr[x - 1] / arr[x + 1];
              index = arr.indexOf(arr[x - 1])
              arr[index] = intermSum;
              arr.splice(index + 1, 2)
              intermSum = '';
              index = '';
            }
          }
        }
        else if (arr.includes('+') == true || arr.includes('-') == true) {
          for (let y = 0; y < arr.length; y++) {
            if (arr[y] == '+') {
              intermSum = arr[y - 1] + arr[y + 1];
              index = arr.indexOf(arr[y - 1])
              arr[index] = intermSum;
              arr.splice(index + 1, 2)
              intermSum = '';
              index = '';
            }
            if (arr[y] == '-') {
              intermSum = arr[y - 1] - arr[y + 1];
              index = arr.indexOf(arr[y - 1])
              arr[index] = intermSum;
              arr.splice(index + 1, 2)
              intermSum = '';
              index = '';
            }
          }
        }




      }


    }

  })
}
