# Homework #4

```
Вносите изменения в файл ./src/index.js 
```

## Задание

Создайте и экспортируйте класс `AsyncArray` из файла `index.js`. 
Экземрляры `AsyncArray` должны обладать всеми возможностями обычного `Array`.
Дополнительно экземпляры `AsyncArray` должны иметь следующие методы:

- `serialMap` - По сути работает как обычный `map`, 
только преобразование элемента массива происходит асинхронно 
(т.е. функция преобразования для каждого элемента возвращает `Promise`). 
Следовательно, и сам метод `serialMap` тоже возвращает `Promise`. 
Следующий элемент массива обрабатывается только после предыдущего.

    **Пример использования:**
    ```javascript
    import { AsyncArray } from './index.js';
  
    const array = new AsyncArray(1, 2, 3, 4, 5);
  
    array
      .serialMap((el, index, arr) => {
        // преобрвзовываем элемент массива с помощью функции, которая возвращает Promise
        return asyncAction(el);
      })
      .then(newArray => {
        // newArray - массив с результатами всех преобразований
      });
    ```

- `parallelMap` - Аналог метода `serialMap`, только элементы массива могут обрабатываться параллельно.

  **Пример использования:**
    ```javascript
    import { AsyncArray } from './index.js';
  
    const array = new AsyncArray(1, 2, 3, 4, 5);
  
    array
      .parallelMap((el, index, arr) => {
        // преобрвзовываем элемент массива с помощью функции, которая возвращает Promise
        return asyncAction(el);
      })
      .then(newArray => {
        // newArray - массив с результатами всех преобразований
      });
    ```

