import fs from 'fs';
import { parse } from 'node-html-parser';
import { parserPage } from './src/parse';
import { writeFile } from './src/lib';
import { upperTrials } from './src/post';
import { getLinks, generageUrls, request } from './src/network';

const lenAlphabet = 33;
// const lenAlphabet = 2;
export const INDEX_NAME = 'students';
//   const htmlData = await readFile('./docs.html');

const main = async () => {
  const linksList = generageUrls(lenAlphabet);
  const parsedLinks = await getLinks(linksList);
  const promiseArr = [];
  for (let i = 0,len = parsedLinks.length; i < len; i++ ) {
    promiseArr.push(new Promise((resolve, reject) => {
      request(parsedLinks[i])
        .then(res => {
          console.log(`Thread ${i} complete`);
          const data = parse(res);
          const parsingData = data.firstChild.childNodes;
          resolve(parserPage(parsingData));
          return true;
        })
        .catch(err => {
          reject(err);
        });
    }));
  }
  Promise.all(promiseArr)
    .then(res => {
      console.log('here, start write in file');
      const result = [];
      for (let i = 0, len = res.length; i < len; i++) {
        result.push(...res[i]);
      }

      result.map(i => i.trials = upperTrials(i));

      for (let i in result) {
      // fs.appendFileSync('./jsonLine.json', JSON.stringify({ index: { _index: 'students' } }));
      // fs.appendFileSync('./jsonLine.json', '\n');
      // fs.appendFileSync('./jsonLine.json', JSON.stringify(result[i]));
      // fs.appendFileSync('./jsonLine.json', '\n');

        // const upperList = upperTrials(result[i]);
        // result[i].trials = upperList;
        fs.appendFileSync('./jsonLine.json', JSON.stringify({'_index':INDEX_NAME,'_type':'_doc','_score':1,'_source': result[i]}));
      }
      
      // writeFile('./result.json', JSON.stringify(result, null, 2));
      
      console.log('complete');
      return true;
    })
    .catch(err => {
      console.error(err);
    });
};

main();
