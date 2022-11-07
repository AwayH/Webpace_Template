import './style.scss';
import '@/assets/style/modules/box.scss';
import '@/assets/style/modules/icon.scss';
import './abc.css';
import fontawesome from '@fortawesome/fontawesome';

// 檔案大
// import { faTimes, faVideo, faBomb } from '@fortawesome/fontawesome-free-solid';
// import { faHandPointRight, faSmile, faSnowflake } from '@fortawesome/fontawesome-free-regular';
// import { faYoutube, faXbox, faTrello } from '@fortawesome/fontawesome-free-brands';

// 檔案小
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import faVideo from '@fortawesome/fontawesome-free-solid/faVideo';
import faBomb from '@fortawesome/fontawesome-free-solid/faBomb';
import faHandPointRight from '@fortawesome/fontawesome-free-regular/faHandPointRight';
import faSmile from '@fortawesome/fontawesome-free-regular/faSmile';
import faSnowflake from '@fortawesome/fontawesome-free-regular/faSnowflake';
import faYoutube from '@fortawesome/fontawesome-free-brands/faYoutube';
import faXbox from '@fortawesome/fontawesome-free-brands/faXbox';
import faTrello from '@fortawesome/fontawesome-free-brands/faTrello';

import TheHeader from '@/components/TheHeader';

fontawesome.library.add(faTimes, faVideo, faBomb);
fontawesome.library.add(faHandPointRight, faSmile, faSnowflake);
fontawesome.library.add(faYoutube, faXbox, faTrello);

document.querySelector('#Header').innerHTML = TheHeader();

class Hero {
  #name;

  constructor(name, age) {
    this.#name = name;
    this.age = age;
  }

  greet() {
    console.log(`${this.#name} 今年 ${this.age} 歲`);
  }
}

const hero = new Hero('Thor', 30);

console.log(hero.name); // undefine

hero.greet(); // Thor 今年 30 歲
