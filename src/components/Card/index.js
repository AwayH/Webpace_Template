import './style.scss';
import fontawesome from '@fortawesome/fontawesome';

// 檔案大
// import { faTimes } from '@fortawesome/fontawesome-free-solid';

// 檔案小
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

fontawesome.library.add(faTimes);

const makeTagString = (items) => {
  let str = '';
  items.forEach((item) => {
    str += `
      <span class="tag tag-warning">
        ${item}
        <button class="tag__btn" type="button">
          <i class="fas fa-times"></i>
        </button>
      </span>`;
  });
  return `<div class="tags">${str}</div>`;
};

export default (data) => `
    <div class="card">
      <header class="card__head"><h2 class="card__tit">卡片模組: 標題</h2></header>
      <div class="card__body">${makeTagString(data)}</div>
    </div>`;
