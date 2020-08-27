import { parse } from 'node-html-parser';
import { parserPage } from './src/parse';
import { upperTrials } from './src/post';
import { getLinks, request } from './src/network';
import { elasticDumpFileWriter } from './src/elastic';
import fs from 'fs';

const lenAlphabet = 33;
// const lenAlphabet = 2;

const main = async () => {
  const parsedLinks = await getLinks(lenAlphabet);
  console.log('Start get html from pages');
  const dataFromHtml = await Promise.all(parsedLinks.map(i => request(i)));
  console.log('Start html parse');
  const objectFormatData = await Promise.all(dataFromHtml.map(i => parse(i)));
  console.log('Start json parsed');
  const jsonDataParser = await Promise.all(
    objectFormatData.map(i => parserPage(i.firstChild.childNodes))
  );
  console.log('Start post data transform');
  jsonDataParser.flat().map(i => i.trials = upperTrials(i));
  
  fs.writeFileSync('result.json', JSON.stringify(jsonDataParser.flat(), null, 2));
  elasticDumpFileWriter(jsonDataParser.flat());
  console.log('Completed');
};

main();
