import needle from 'needle';

export const request = async url => {
  const options = {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  };
  return new Promise((resolve, reject) => {
    needle('get', url, options)
      .then(res => {
        resolve(res.body);
        return true;
      })
      .catch(err => {
        console.error(err);
        reject(err);
      });
  });
};

export const generageUrls = numLen => {
  const urls = [];
  for (let i = 1; i < numLen; i++) {
    if (i === 28 || i === 30 || i === 29) {
      continue;
    }
    urls.push(`https://urfu.ru/api/ratings/alphabetical/1/${i}/`);
  }
  return urls;
};

export const getLinks = async data => {
  const returnData = [];
  for (let i = 0, len = data.length; i < len; i++) {
    let linkPart = await request(data[i]);
    returnData.push(`https://urfu.ru${linkPart.url}`);
  }
  return returnData;
};