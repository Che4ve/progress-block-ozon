# Progress Block

**Progress Block** - это интерактивный веб-компонент 
для отслеживания прогресса.

#### Посмотреть можно [здесь](https://che4ve.github.io/progress-block-ozon/)

## Особенности
1. Для создания основного блока реализовал 
еще ряд кастомных вспомогательных компонентов:

   * ProgressCircle: круговой индикатор прогресса на основе SVG спиннера.
    
   * CustomRangeSlider: ввод в промежутке с помощью слайдера.
    
   * CustomCheckbox: красивый чекбокс.

2. Кастомизация через CSS-переменные: легко изменяйте размеры, 
цвета и другие параметры.

3. Динамическое обновление: обновляйте значения прогресса 
через JavaScript.

## Использование

### ProgressBlock
    
--- JS ---
```js
import {ProgressBlock} from "./components/ProgressBlock.js";

const progressBlock = new ProgressBlock(min?: _, max?: _, value?: _);
progressBlock.value = 37;

document.body.append(progressBlock);
```
--- HTML ---
```html
<progress-block
    min="0"
    max="100"
    value="25">
</progress-block>
```

### ProgressCircle

--- JS --- 
```js
import {ProgressCircle} from "./components/ProgressCircle.js";
const progressCircle = new ProgressCircle(min?: _, max?: _, value?: _, width?: _, strokeWidth?: _, colorStart?: _, colorEnd?: _);
progressCircle.value = 37
```
--- HTML ---
```html
<progress-circle
    min="0"
    max="100"
    value="50"
    stroke-width="10"
    color-start="#44d393"
    color-end="#50e179">
</progress-circle>
```

### CustomSlider
--- JS ---
```js
import {CustomSlider} from "./components/CustomSlider.js";

const customSlider = new CustomSlider(min?: _, max?: _, value?: _);
customSlider.value = 37;

customSlider.onChange = (value) => {
    console.log('Новое значение слайдера:', value);
};
```
--- HTML ---
```html
<custom-range-slider 
    min="0" 
    max="100" 
    value="25">
</custom-range-slider>
```

### CustomCheckbox

--- JS ---
```js
import {CustomCheckbox} from "./components/CustomCheckbox.js";

const customCheckbox = new CustomCheckbox(checked?: _);
customCheckbox.checked = true

customCheckbox.onChange = (checked) => {
    console.log('Чекбокс:', checked ? 'Включен' : 'Выключен');
};
```
--- HTML ---
```html
<custom-checkbox checked="true"></custom-checkbox>
```
