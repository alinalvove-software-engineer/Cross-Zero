import { render, screen } from "@testing-library/react"; 
import userEvent from "@testing-library/user-event";
import Board from "./components/Board";

test("игра: клики по клеткам, проверка победителя, кнопка 'Сыграть снова'", async () => {
  render(<Board />);

  const squares = screen.getAllByRole("button", { name: "" });
  const status = screen.getByText(/Ходит: X/i);
  const resetButton = screen.getByText(/Сыграть снова/i);

  // __Ходы игроков__
  await userEvent.click(squares[0]); // X
  expect(squares[0]).toHaveTextContent("X");
  expect(status).toHaveTextContent("Ходит: O");

  await userEvent.click(squares[1]); // O
  expect(squares[1]).toHaveTextContent("O");
  expect(status).toHaveTextContent("Ходит: X");

  await userEvent.click(squares[3]); // X
  await userEvent.click(squares[4]); // O
  await userEvent.click(squares[6]); // X выигрывает

  expect(status).toHaveTextContent("Победитель: X");

  // --- Проверка кнопки "Сыграть снова" ---
  await userEvent.click(resetButton);
  squares.forEach(square => {
    expect(square).toHaveTextContent(""); // все клетки пустые
  });
  expect(status).toHaveTextContent("Ходит: X"); // игра перезапущена
});


/*  1. import { render, screen } from "@testing-library/react";
render - фунцкия, которая "отрисовывает" мой React-комонент в виртуальном DOM, 
чтобы мы могли с ним работать в текстах. 
screen -  объект, который позволяет искать элементы на странице (кнопки, тексты и т.д)после render.

2. import userEvent from "@testing-library/user-event";
  userEvent - библиотека для имитаций действий пользователя: клики, ввод текста, наведение мыши. 

3. import Board from "./components/Board";
Импорт твоего компонента Board, чтобы мы могли тестировать его. 

4. test("описание", async () => {...})
 Создаём текст с понятными описанием. 
- async нужен, поэтому что мы будем использовать await
- userEvent.click(...), а клик асинхроный. 
5. render(<Board />); 
- "Отрисовывем" компоент Board в текстовой среде. 
- После этого мы можем искать кнопки и тексты с помощью screen.

6. screen.getAllByRole("button", { name: "" })
- Находим все кнопки, которые являются клетками поля.

- { name: "" } — мы ищем кнопки без текста, так как пустые клетки на старте пустые.

- Сохраняем их в массив squares для удобства кликов.

7. screen.getByText(/Ходит: X/i)
- Находим элемент с текстом, который показывает кто сейчас ходит.
- /Ходит: X/i – регулярное выражение, i = не чувствительно к регистру.
- Сохраняем в переменную status, чтобы проверять текст после ходов.

8. screen.getByText(/Сыграть снова/i)
- Находим кнопку "Сыграть снова" по тексту. 
- Сохраняем её в переменную resetButton для клика в конце текста. 

9. Игрок X кликает по первой клетке (squares[0]). 
10. expect(squares[0]).toHaveTextContent("X"); - провеяем, что после клика в клетке появился X.
11. expect(status).toHaveTextContent("Ходит: O"); – проверяем, что статус поменялся на ход O.
12. Игрок O кликает по второй клетке (squares[1]). 
13. Проверяем, что в клетке появился O и ход вернулся к X.
14. Продолжаем чередовать ходы: X → O → X
Последний клик (squares[6]) делает X победителем.
15. Проверяем, что статус обновился и показывает победителя X.
16. Кликаем по кнопке «Сыграть снова», чтобы перезапустить игру.
17. Проверяем, что все клетки стали пустыми после сброса.
18. Проверяем, что статус снова показывает, что X ходит первым после перезапуска.
*/