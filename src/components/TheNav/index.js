import './style.sass';

const arr = [
  {
    name: '基本測試',
    path: 'index',
  }, {
    name: '非同步載入',
    path: 'async',
  },
];

const makeString = (param) => {
  let str = '';
  arr.forEach((i, idx) => {
    str += `
      <li class="nav__li">
${
  (param === '/' && idx === 0) || param.match(i.path)
    ? i.name : `<a href="./${i.path}.html">${i.name}</a>`
}
      </li>`;
  });
  return `<ul class="nav__ls">${str}</ul>`;
};

export default {
  name: 'TheNav',
  makeString,
};
