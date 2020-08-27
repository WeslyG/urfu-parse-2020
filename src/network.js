import axios from 'axios';

export const request = async url => {
  const req = await axios.get(url);
  return req.data;
};

const generageUrls = numLen => {
  const urls = [];
  for (let i = 1; i < numLen; i++) {
    if (i === 28 || i === 30 || i === 29) {
      continue;
    }
    urls.push(`https://urfu.ru/api/ratings/alphabetical/1/${i}/`);
  }
  return urls;
};

const getFinnalyLink = async linksArray => {
  let finnalyLink = await Promise.all(linksArray.map(i => request(i)));
  return finnalyLink.map(i => `https://urfu.ru${i.url}`);
};

export const getLinks = async numLen => {
  return getFinnalyLink(generageUrls(numLen));
};