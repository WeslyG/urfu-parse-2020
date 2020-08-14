import { parse } from 'node-html-parser';
// import HtmlTableToJson from 'html-table-to-json';
import fs from 'fs';

const readFile = async path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

const resultData = [];
// const resultData[resultData.length-1].trialsList = [];

const tellMeTrue = stringForTrue => stringForTrue.toLowerCase() === 'да' ? true : false;

const main = async () => {
  const data = await readFile('./docs.html');
  const parsingdata = parse(data);
  const a = parsingdata.firstChild.childNodes;

  for (let item = 0, len = a.length; item < len; item++) {
    let alias = a[item].childNodes;
    if (alias[4].text.toLowerCase() === 'да' || alias[4].text.toLowerCase() === 'нет') {
      if (alias.length === 12) {
        resultData.push({
          name: alias[0].text,
          sex: 'M',
          num: parseInt(alias[1].text),
          trialsList: [
            {
              status: alias[2].text,
              type: alias[3].text,
              access: tellMeTrue(alias[4].text),
              direction: alias[5].text,
              programName: alias[6].text,
              form: alias[7].text,
              money: alias[8].text,
              trials: [alias[9].text],
              summ: alias[11].text,
            },
          ],
        });
        continue;
      } else if (alias.length === 13) {
        resultData.push({
          name: alias[0].text,
          sex: 'M',
          num: parseInt(alias[1].text),
          trialsList: [
            {
              status: alias[2].text,
              type: alias[3].text,
              access: tellMeTrue(alias[4].text),
              direction: alias[5].text,
              programName: alias[6].text,
              form: alias[7].text,
              money: alias[8].text,
              trials: [alias[9].text, alias[10].text],
              summ: alias[12].text,
            },
          ],
        });
        continue;
      } else if (alias.length === 14) {
        resultData.push({
          name: alias[0].text,
          sex: 'M',
          num: parseInt(alias[1].text),
          trialsList: [
            {
              status: alias[2].text,
              type: alias[3].text,
              access: tellMeTrue(alias[4].text),
              direction: alias[5].text,
              programName: alias[6].text,
              form: alias[7].text,
              money: alias[8].text,
              trials: [alias[9].text, alias[10].text, alias[11].text],
              summ: alias[13].text,
            },
          ],
        });
        continue;
      }
    } 
    else if (alias[2].text.toLowerCase() === 'да' || alias[2].text.toLowerCase() === 'нет') {
      if (alias.length === 12) {
        resultData[resultData.length-1].trialsList.push({
          status: alias[0].text,
          type: alias[1].text,
          access: tellMeTrue(alias[2].text),
          direction: alias[3].text,
          programName: alias[4].text,
          form: alias[5].text,
          money: alias[6].text,
          trials: [alias[7].text, alias[8].text, alias[9].text],
          summ: alias[11].text,
        });
        continue;
      } else if (alias.length === 11) {
        if (!(alias[6].text === 'контрактная основа' || alias[6].text === 'бюджетная основа')) {
          resultData[resultData.length-1].trialsList.push({
            status: alias[0].text,
            type: alias[1].text,
            access: tellMeTrue(alias[2].text),
            direction: alias[3].text,
            programName: alias[4].text,
            form: alias[5].text,
            money: resultData[resultData.length-1].trialsList[resultData[resultData.length-1].trialsList.length -1].money,
            trials: [alias[6].text, alias[7].text, alias[8].text],
            summ: alias[10].text,
          });
          continue;
        } else {
          resultData[resultData.length-1].trialsList.push({
            status: alias[0].text,
            type: alias[1].text,
            access: tellMeTrue(alias[2].text),
            direction: alias[3].text,
            programName: alias[4].text,
            form: alias[5].text,
            money: alias[6].text,
            trials: [alias[7].text, alias[8].text],
            summ: alias[10].text,
          });
          continue;
        }
      } else if (alias.length === 10) {
        if (!(alias[6].text === 'контрактная основа' || alias[6].text === 'бюджетная основа')) {
          resultData[resultData.length-1].trialsList.push({
            status: alias[0].text,
            type: alias[1].text,
            access: tellMeTrue(alias[2].text),
            direction: alias[3].text,
            programName: alias[4].text,
            form: alias[5].text,
            money: resultData[resultData.length-1].trialsList[resultData[resultData.length-1].trialsList.length -1].money,
            trials: [alias[6].text, alias[7].text],
            summ: alias[9].text,
          });
          continue;
        } else {
          resultData[resultData.length-1].trialsList.push({
            status: alias[0].text,
            type: alias[1].text,
            access: tellMeTrue(alias[2].text),
            direction: alias[3].text,
            programName: alias[4].text,
            form: alias[5].text,
            money: alias[6].text,
            trials: [alias[7].text],
            summ: alias[9].text,
          });
          continue;
        }
      } else if (alias.length === 9) {
        if (!(alias[6].text === 'контрактная основа' || alias[6].text === 'бюджетная основа')) {
          resultData[resultData.length-1].trialsList.push({
            status: alias[0].text,
            type: alias[1].text,
            access: tellMeTrue(alias[2].text),
            direction: alias[3].text,
            programName: alias[4].text,
            form: alias[5].text,
            money: resultData[resultData.length-1].trialsList[resultData[resultData.length-1].trialsList.length -1].money,
            trials: [alias[6].text],
            summ: alias[8].text,
          });
          continue;
        } else {
          console.error('Not expect this model!');
          continue;
        }
      } else if (alias.length < 9) {
        console.error('Error i am not expected lentgh less 9');
        continue;
      }
    }
  }

  console.log(JSON.stringify(resultData, null, 2));
};

main();

