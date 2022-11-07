import './style.scss';
import '@/assets/style/modules/tag.scss';
import axios from 'axios';

import TheHeader from '@/components/TheHeader';
import Card from '@/components/Card';

document.querySelector('#Header').innerHTML = TheHeader();

const getData = async (param) => {
  if (param) {
    try {
      const res = await axios.get(param);
      const { data } = res;
      return data.map((each) => each.Name);
    } catch (err) {
      console.log(err);
    }
  }
  return false;
};

const renderContent = async () => {
  const api = process.env.NODE_ENV === 'development'
    ? './static/report.json'
    : 'https://data.coa.gov.tw/Service/OpenData/ODwsv/ODwsvTravelFood.aspx';

  document.querySelector('#Main').innerHTML = Card(await getData(api));
};

(() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('本機環境才會顯示');
  }
  renderContent();
})();
