import fs from 'fs';
import needle from 'needle';
import { ELASTIC_INDEX, ELASTIC_URL, JSON_LINES_FILE_NAME } from '../config';

const options = {
  headers: { 
    'User-Agent': 'Mozilla/5.0',
    'Content-Type': 'application/json'
  },
};


// Dont use me
export const WriteSingleDoctoElastic = async oneDoc => {
  return new Promise((resolve, reject) => {
    needle('post', `http://${ELASTIC_URL}/${ELASTIC_INDEX}/_doc`, oneDoc, options)
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


export const jsonLineFileWriter = data => {
  data.map(i => {
    fs.appendFileSync(`./${JSON_LINES_FILE_NAME}.json`, JSON.stringify({ index: { _index: ELASTIC_INDEX } }));
    fs.appendFileSync(`./${JSON_LINES_FILE_NAME}.json`, '\n');
    fs.appendFileSync(`./${JSON_LINES_FILE_NAME}.json`, JSON.stringify(i));
    fs.appendFileSync(`./${JSON_LINES_FILE_NAME}.json`, '\n');
  });
};

export const elasticDumpFileWriter = data => {
  data.map(i =>
    fs.appendFileSync(
      `./${JSON_LINES_FILE_NAME}.json`,
      JSON.stringify({ _index: ELASTIC_INDEX, _type: '_doc', _source: i })
    )
  );
};
