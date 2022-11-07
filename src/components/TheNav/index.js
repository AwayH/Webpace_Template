import './style.scss';

const arr = [
  {
    name: '基本測試',
    path: 'demo1',
  }, {
    name: '非同步測試',
    path: 'demo2',
  },
];

const makeString = (param) => {
  let str = '';
  arr.forEach((i) => {
    str += `
      <li class="nav__li">
${
  // (param === '/' && idx === 0) || param.match(i.path)
  param.match(i.path)
    ? i.name : `<a href="./${i.path}.html">${i.name}</a>`
}
      </li>`;
  });
  return `<ul class="nav__ul">${str}</ul>`;
};

export default {
  name: 'TheNav',
  makeString,
};
