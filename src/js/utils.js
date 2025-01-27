/**
 * Определяет тип ячейки на игровом поле.
 *
 * @param {number} index - Индекс ячейки.
 * @param {number} boardSize - Размер игрового поля.
 * @returns {string} Тип ячейки.
 */
export function calcTileType(index, boardSize) {
  // Верхний ряд
  if (index === 0) return 'top-left';
  if (index === boardSize - 1) return 'top-right';
  if (index > 0 && index < boardSize - 1) return 'top';

  // Нижний ряд
  if (index === boardSize * (boardSize - 1)) return 'bottom-left';
  if (index === boardSize * boardSize - 1) return 'bottom-right';
  if (
    index > boardSize * (boardSize - 1)
    && index < boardSize * boardSize - 1
  ) return 'bottom';

  // Левый и правый края
  if (index % boardSize === 0) return 'left';
  if ((index + 1) % boardSize === 0) return 'right';

  // Центр
  return 'center';
}

/**
 * Определяет уровень здоровья.
 *
 * @param {number} health - Уровень здоровья.
 * @returns {string} Уровень здоровья.
 */
export function calcHealthLevel(health) {
  if (health < 15) return 'critical';
  if (health < 50) return 'normal';
  return 'high';
}

/**
 * Возвращает информацию о персонаже.
 *
 * @param {Object} character - Персонаж.
 * @returns {string} Информация о персонаже.
 */
export function getInfo(character) {
  const levelInfo = `${String.fromCodePoint(0x1F396)}${character.level}`;
  const attackInfo = `${String.fromCodePoint(0x2694)}${character.attack}`;
  const defenceInfo = `${String.fromCodePoint(0x1F6E1)}${character.defence}`;
  const healthInfo = `${String.fromCodePoint(0x2764)}${character.health}`;
  return `${levelInfo} ${attackInfo} ${defenceInfo} ${healthInfo}`;
}

/**
 * Возвращает координаты ячейки по индексу.
 *
 * @param {number} index - Индекс ячейки.
 * @param {number} square - Размер поля.
 * @returns {Object} Координаты { x, y }.
 */
export function getCoordinates(index, square) {
  const coordinates = { x: null, y: null };

  if (index === 0) {
    coordinates.x = 1;
    coordinates.y = 1;
  } else if (index > 0 && index < square) {
    coordinates.x = 1;
    coordinates.y = index + 1;
  } else if (index >= square) {
    if (index % square === 0) {
      coordinates.x = Math.ceil((index + 1) / square);
      coordinates.y = 1;
    } else {
      coordinates.x = Math.ceil(index / square);
      coordinates.y = (index % square) + 1;
    }
  }

  return coordinates;
}

/**
 * Возвращает индекс ячейки по координатам.
 *
 * @param {Object} coordinates - Координаты { x, y }.
 * @param {number} square - Размер поля.
 * @returns {number} Индекс ячейки.
 */
function getIndex(coordinates, square) {
  return (coordinates.x - 1) * square - 1 + coordinates.y;
}

/**
 * Генерирует случайный индекс в пределах заданной дистанции.
 *
 * @param {Object} selectedCoordinates - Выбранные координаты { x, y }.
 * @param {number} distance - Дистанция.
 * @param {number} square - Размер поля.
 * @returns {number} Случайный индекс.
 */
export function randomIndex(selectedCoordinates, distance, square) {
  const coordinates = { x: null, y: null };
  let differenceX;
  let differenceY;

  do {
    coordinates.x = Math.floor(Math.random() * (distance * 2 + 1))
      + (selectedCoordinates.x - distance);
    coordinates.y = Math.floor(Math.random() * (distance * 2 + 1))
      + (selectedCoordinates.y - distance);
    differenceX = Math.abs(coordinates.x - selectedCoordinates.x);
    differenceY = Math.abs(coordinates.y - selectedCoordinates.y);
  } while (
    (coordinates.x === selectedCoordinates.x && coordinates.y === selectedCoordinates.y)
    || (coordinates.x > square || coordinates.y > square)
    || (coordinates.x <= 0 || coordinates.y <= 0)
    || (differenceX > distance || differenceY > distance)
    || (differenceX !== differenceY && differenceX !== 0 && differenceY !== 0)
  );

  return getIndex(coordinates, square);
}
