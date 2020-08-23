import { tellMeTrue, getSex, nameLen, getNational } from './lib';

const getUniversity = name => {
  const matchUniversity = name.match(/\(.*\)/);
  if (matchUniversity !== null) {
    const doubleBrackets = matchUniversity[0].match(/(\(.*\)).*(\(.*\))/);
    if (doubleBrackets !== null) {
      return doubleBrackets[2].replace(/\)|\(/gi, '');
    }
    return matchUniversity[0].replace(/\)|\(/gi, '');
  } else {
    return name;
  }
};

const trialsDict = {
  'РЯ': 'русский',
  'М': 'математика',
  'Х': 'химия',
  'О': 'обществознание',
  'И': 'история',
  'Инф': 'информатика',
  'Ф': 'физика',
  'Б': 'биология',
  'Ин.': 'иностранный',
  'Л': 'литература',
  'Г': 'география',
};

const getDirectionNumber = name => name.match(/\d{2}.\d{2}.\d{2}/)[0];

const trialsParse = name => {
  if (name === '' || name === ' ') {
    return;
  }
  
  const data = name.match(/(\W{1,3})(\d{1,3})(\(.*\))/);
  if (data !== null) {
    return {
      type: data[3].replace(/\)|\(/gi, ''),
      name: trialsDict[data[1]],
      number: parseInt(data[2]),
    };
  } else {
    const data2 = name.match(/(\W{7}) (\d{2}.\d{2}.\d{2})(\d{1,3})(\(.*\))/);
    if (data2 !== null) {
      return {
        type: data2[1],
        name: data2[4].replace(/\)|\(/gi, ''),
        number: parseInt(data2[3]),
      };
    } else {
      const data3 = name.match(/(\W+) (\W)(\d{3})(\d{1,3})(\(\W+\))/);
      if (data3 !== null) {
        return {
          type: data3[1],
          name: data3[5].replace(/\)|\(/gi, ''),
          number: parseInt(data3[4]),
        };
      } else {
        console.log(name);
      }
    }
  }
};

export const parserPage = inputData => {
  const resultData = [];
  for (let item = 0, len = inputData.length; item < len; item++) {
    let alias = inputData[item].childNodes;
    if (alias[4].rawText.toLowerCase() === 'да' || alias[4].rawText.toLowerCase() === 'нет') {
      if (alias.length === 12) {
        resultData.push({
          name: {
            fullName: alias[0].rawText,
            lastName: nameLen(alias[0].rawText) ? alias[0].rawText.split(' ')[0] : '',
            firstName: nameLen(alias[0].rawText) ? alias[0].rawText.split(' ')[1] : '',
            patronymic: nameLen(alias[0].rawText) ? alias[0].rawText.split(' ')[2] : '',
          },
          national: getNational(alias[0].rawText),
          sex: nameLen(alias[0].rawText) ? getSex(alias[0].rawText) : 'Н',
          num: parseInt(alias[1].rawText),
          trialsList: [
            {
              status: alias[2].rawText,
              type: alias[3].rawText,
              access: tellMeTrue(alias[4].rawText),
              direction: alias[5].rawText,
              directionNumber: getDirectionNumber(alias[5].rawText),
              programName: alias[6].rawText,
              university: getUniversity(alias[6].rawText),
              form: alias[7].rawText,
              money: alias[8].rawText,
              trials: [trialsParse(alias[9].rawText)],
              summ: alias[11].rawText,
            },
          ],
        });
        continue;
      } else if (alias.length === 13) {
        resultData.push({
          name: {
            fullName: alias[0].rawText,
            lastName: nameLen(alias[0].rawText) ? alias[0].rawText.split(' ')[0] : '',
            firstName: nameLen(alias[0].rawText) ? alias[0].rawText.split(' ')[1] : '',
            patronymic: nameLen(alias[0].rawText) ? alias[0].rawText.split(' ')[2] : '',
          },
          national: getNational(alias[0].rawText),
          sex: nameLen(alias[0].rawText) ? getSex(alias[0].rawText) : 'Н',
          num: parseInt(alias[1].rawText),
          trialsList: [
            {
              status: alias[2].rawText,
              type: alias[3].rawText,
              access: tellMeTrue(alias[4].rawText),
              direction: alias[5].rawText,
              directionNumber: getDirectionNumber(alias[5].rawText),
              programName: alias[6].rawText,
              university: getUniversity(alias[6].rawText),
              form: alias[7].rawText,
              money: alias[8].rawText,
              trials: [trialsParse(alias[9].rawText), trialsParse(alias[10].rawText)],
              summ: alias[12].rawText,
            },
          ],
        });
        continue;
      } else if (alias.length === 14) {
        resultData.push({
          name: {
            fullName: alias[0].rawText,
            lastName: nameLen(alias[0].rawText) ? alias[0].rawText.split(' ')[0] : '',
            firstName: nameLen(alias[0].rawText) ? alias[0].rawText.split(' ')[1] : '',
            patronymic: nameLen(alias[0].rawText) ? alias[0].rawText.split(' ')[2] : '',
          },
          national: getNational(alias[0].rawText),
          sex: nameLen(alias[0].rawText) ? getSex(alias[0].rawText) : 'Н',
          num: parseInt(alias[1].rawText),
          trialsList: [
            {
              status: alias[2].rawText,
              type: alias[3].rawText,
              access: tellMeTrue(alias[4].rawText),
              direction: alias[5].rawText,
              directionNumber: getDirectionNumber(alias[5].rawText),
              programName: alias[6].rawText,
              university: getUniversity(alias[6].rawText),
              form: alias[7].rawText,
              money: alias[8].rawText,
              trials: [
                trialsParse(alias[9].rawText),
                trialsParse(alias[10].rawText),
                trialsParse(alias[11].rawText),
              ],
              summ: alias[13].rawText,
            },
          ],
        });
        continue;
      }
    } else if (alias[2].rawText.toLowerCase() === 'да' || alias[2].rawText.toLowerCase() === 'нет') {
      if (alias.length === 12) {
        resultData[resultData.length - 1].trialsList.push({
          status: alias[0].rawText,
          type: alias[1].rawText,
          access: tellMeTrue(alias[2].rawText),
          direction: alias[3].rawText,
          directionNumber: getDirectionNumber(alias[3].rawText),
          programName: alias[4].rawText,
          university: getUniversity(alias[4].rawText),
          form: alias[5].rawText,
          money: alias[6].rawText,
          trials: [
            trialsParse(alias[7].rawText),
            trialsParse(alias[8].rawText),
            trialsParse(alias[9].rawText),
          ],
          summ: alias[11].rawText,
        });
        continue;
      } else if (alias.length === 11) {
        if (!(alias[6].rawText === 'контрактная основа' || alias[6].rawText === 'бюджетная основа')) {
          resultData[resultData.length - 1].trialsList.push({
            status: alias[0].rawText,
            type: alias[1].rawText,
            access: tellMeTrue(alias[2].rawText),
            direction: alias[3].rawText,
            directionNumber: getDirectionNumber(alias[3].rawText),
            programName: alias[4].rawText,
            university: getUniversity(alias[4].rawText),
            form: alias[5].rawText,
            money:
              resultData[resultData.length - 1].trialsList[
                resultData[resultData.length - 1].trialsList.length - 1
              ].money,
            trials: [
              trialsParse(alias[6].rawText),
              trialsParse(alias[7].rawText),
              trialsParse(alias[8].rawText),
            ],
            summ: alias[10].rawText,
          });
          continue;
        } else {
          resultData[resultData.length - 1].trialsList.push({
            status: alias[0].rawText,
            type: alias[1].rawText,
            access: tellMeTrue(alias[2].rawText),
            direction: alias[3].rawText,
            directionNumber: getDirectionNumber(alias[3].rawText),
            programName: alias[4].rawText,
            university: getUniversity(alias[4].rawText),
            form: alias[5].rawText,
            money: alias[6].rawText,
            trials: [trialsParse(alias[7].rawText), trialsParse(alias[8].rawText)],
            summ: alias[10].rawText,
          });
          continue;
        }
      } else if (alias.length === 10) {
        if (!(alias[6].rawText === 'контрактная основа' || alias[6].rawText === 'бюджетная основа')) {
          resultData[resultData.length - 1].trialsList.push({
            status: alias[0].rawText,
            type: alias[1].rawText,
            access: tellMeTrue(alias[2].rawText),
            direction: alias[3].rawText,
            directionNumber: getDirectionNumber(alias[3].rawText),
            programName: alias[4].rawText,
            university: getUniversity(alias[4].rawText),
            form: alias[5].rawText,
            money:
              resultData[resultData.length - 1].trialsList[
                resultData[resultData.length - 1].trialsList.length - 1
              ].money,
            trials: [trialsParse(alias[6].rawText), trialsParse(alias[7].rawText)],
            summ: alias[9].rawText,
          });
          continue;
        } else {
          resultData[resultData.length - 1].trialsList.push({
            status: alias[0].rawText,
            type: alias[1].rawText,
            access: tellMeTrue(alias[2].rawText),
            direction: alias[3].rawText,
            directionNumber: getDirectionNumber(alias[3].rawText),
            programName: alias[4].rawText,
            university: getUniversity(alias[4].rawText),
            form: alias[5].rawText,
            money: alias[6].rawText,
            trials: [trialsParse(alias[7].rawText)],
            summ: alias[9].rawText,
          });
          continue;
        }
      } else if (alias.length === 9) {
        if (!(alias[6].rawText === 'контрактная основа' || alias[6].rawText === 'бюджетная основа')) {
          resultData[resultData.length - 1].trialsList.push({
            status: alias[0].rawText,
            type: alias[1].rawText,
            access: tellMeTrue(alias[2].rawText),
            direction: alias[3].rawText,
            directionNumber: getDirectionNumber(alias[3].rawText),
            programName: alias[4].rawText,
            university: getUniversity(alias[4].rawText),
            form: alias[5].rawText,
            money:
              resultData[resultData.length - 1].trialsList[
                resultData[resultData.length - 1].trialsList.length - 1
              ].money,
            trials: [trialsParse(alias[6].rawText)],
            summ: alias[8].rawText,
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
  return resultData;
};