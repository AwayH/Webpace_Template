import './style.sass';

import TheNav from '@/components/TheNav';

const { pathname } = window.location;
const siteName = 'Webpack';

export default () => `
    <div class="header__head">
      <h3 class="header__tit">
        ${pathname === '/' ? siteName : `<a href="./">${siteName}</a>`}
      </h3>
    </div>

    <div class="header__body">
      <nav class="nav">${TheNav.makeString(pathname)}</nav>
    </div>
    
    <div class="header__foot"></div>`;
