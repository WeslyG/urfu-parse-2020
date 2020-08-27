import fs from 'fs';
import { ELASTIC_INDEX, JSON_LINES_FILE_NAME } from '../config';

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
