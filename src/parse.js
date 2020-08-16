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
    if (alias[4].text.toLowerCase() === 'да' || alias[4].text.toLowerCase() === 'нет') {
      if (alias.length === 12) {
        resultData.push({
          name: {
            fullName: alias[0].text,
            lastName: nameLen(alias[0].text) ? alias[0].text.split(' ')[0] : '',
            firstName: nameLen(alias[0].text) ? alias[0].text.split(' ')[1] : '',
            patronymic: nameLen(alias[0].text) ? alias[0].text.split(' ')[2] : '',
          },
          national: getNational(alias[0].text),
          sex: nameLen(alias[0].text) ? getSex(alias[0].text) : 'Н',
          num: parseInt(alias[1].text),
          trialsList: [
            {
              status: alias[2].text,
              type: alias[3].text,
              access: tellMeTrue(alias[4].text),
              direction: alias[5].text,
              directionNumber: getDirectionNumber(alias[5].text),
              programName: alias[6].text,
              university: getUniversity(alias[6].text),
              form: alias[7].text,
              money: alias[8].text,
              trials: [trialsParse(alias[9].text)],
              summ: alias[11].text,
            },
          ],
        });
        continue;
      } else if (alias.length === 13) {
        resultData.push({
          name: {
            fullName: alias[0].text,
            lastName: nameLen(alias[0].text) ? alias[0].text.split(' ')[0] : '',
            firstName: nameLen(alias[0].text) ? alias[0].text.split(' ')[1] : '',
            patronymic: nameLen(alias[0].text) ? alias[0].text.split(' ')[2] : '',
          },
          national: getNational(alias[0].text),
          sex: nameLen(alias[0].text) ? getSex(alias[0].text) : 'Н',
          num: parseInt(alias[1].text),
          trialsList: [
            {
              status: alias[2].text,
              type: alias[3].text,
              access: tellMeTrue(alias[4].text),
              direction: alias[5].text,
              directionNumber: getDirectionNumber(alias[5].text),
              programName: alias[6].text,
              university: getUniversity(alias[6].text),
              form: alias[7].text,
              money: alias[8].text,
              trials: [trialsParse(alias[9].text), trialsParse(alias[10].text)],
              summ: alias[12].text,
            },
          ],
        });
        continue;
      } else if (alias.length === 14) {
        resultData.push({
          name: {
            fullName: alias[0].text,
            lastName: nameLen(alias[0].text) ? alias[0].text.split(' ')[0] : '',
            firstName: nameLen(alias[0].text) ? alias[0].text.split(' ')[1] : '',
            patronymic: nameLen(alias[0].text) ? alias[0].text.split(' ')[2] : '',
          },
          national: getNational(alias[0].text),
          sex: nameLen(alias[0].text) ? getSex(alias[0].text) : 'Н',
          num: parseInt(alias[1].text),
          trialsList: [
            {
              status: alias[2].text,
              type: alias[3].text,
              access: tellMeTrue(alias[4].text),
              direction: alias[5].text,
              directionNumber: getDirectionNumber(alias[5].text),
              programName: alias[6].text,
              university: getUniversity(alias[6].text),
              form: alias[7].text,
              money: alias[8].text,
              trials: [
                trialsParse(alias[9].text),
                trialsParse(alias[10].text),
                trialsParse(alias[11].text),
              ],
              summ: alias[13].text,
            },
          ],
        });
        continue;
      }
    } else if (alias[2].text.toLowerCase() === 'да' || alias[2].text.toLowerCase() === 'нет') {
      if (alias.length === 12) {
        resultData[resultData.length - 1].trialsList.push({
          status: alias[0].text,
          type: alias[1].text,
          access: tellMeTrue(alias[2].text),
          direction: alias[3].text,
          directionNumber: getDirectionNumber(alias[3].text),
          programName: alias[4].text,
          university: getUniversity(alias[4].text),
          form: alias[5].text,
          money: alias[6].text,
          trials: [
            trialsParse(alias[7].text),
            trialsParse(alias[8].text),
            trialsParse(alias[9].text),
          ],
          summ: alias[11].text,
        });
        continue;
      } else if (alias.length === 11) {
        if (!(alias[6].text === 'контрактная основа' || alias[6].text === 'бюджетная основа')) {
          resultData[resultData.length - 1].trialsList.push({
            status: alias[0].text,
            type: alias[1].text,
            access: tellMeTrue(alias[2].text),
            direction: alias[3].text,
            directionNumber: getDirectionNumber(alias[3].text),
            programName: alias[4].text,
            university: getUniversity(alias[4].text),
            form: alias[5].text,
            money:
              resultData[resultData.length - 1].trialsList[
                resultData[resultData.length - 1].trialsList.length - 1
              ].money,
            trials: [
              trialsParse(alias[6].text),
              trialsParse(alias[7].text),
              trialsParse(alias[8].text),
            ],
            summ: alias[10].text,
          });
          continue;
        } else {
          resultData[resultData.length - 1].trialsList.push({
            status: alias[0].text,
            type: alias[1].text,
            access: tellMeTrue(alias[2].text),
            direction: alias[3].text,
            directionNumber: getDirectionNumber(alias[3].text),
            programName: alias[4].text,
            university: getUniversity(alias[4].text),
            form: alias[5].text,
            money: alias[6].text,
            trials: [trialsParse(alias[7].text), trialsParse(alias[8].text)],
            summ: alias[10].text,
          });
          continue;
        }
      } else if (alias.length === 10) {
        if (!(alias[6].text === 'контрактная основа' || alias[6].text === 'бюджетная основа')) {
          resultData[resultData.length - 1].trialsList.push({
            status: alias[0].text,
            type: alias[1].text,
            access: tellMeTrue(alias[2].text),
            direction: alias[3].text,
            directionNumber: getDirectionNumber(alias[3].text),
            programName: alias[4].text,
            university: getUniversity(alias[4].text),
            form: alias[5].text,
            money:
              resultData[resultData.length - 1].trialsList[
                resultData[resultData.length - 1].trialsList.length - 1
              ].money,
            trials: [trialsParse(alias[6].text), trialsParse(alias[7].text)],
            summ: alias[9].text,
          });
          continue;
        } else {
          resultData[resultData.length - 1].trialsList.push({
            status: alias[0].text,
            type: alias[1].text,
            access: tellMeTrue(alias[2].text),
            direction: alias[3].text,
            directionNumber: getDirectionNumber(alias[3].text),
            programName: alias[4].text,
            university: getUniversity(alias[4].text),
            form: alias[5].text,
            money: alias[6].text,
            trials: [trialsParse(alias[7].text)],
            summ: alias[9].text,
          });
          continue;
        }
      } else if (alias.length === 9) {
        if (!(alias[6].text === 'контрактная основа' || alias[6].text === 'бюджетная основа')) {
          resultData[resultData.length - 1].trialsList.push({
            status: alias[0].text,
            type: alias[1].text,
            access: tellMeTrue(alias[2].text),
            direction: alias[3].text,
            directionNumber: getDirectionNumber(alias[3].text),
            programName: alias[4].text,
            university: getUniversity(alias[4].text),
            form: alias[5].text,
            money:
              resultData[resultData.length - 1].trialsList[
                resultData[resultData.length - 1].trialsList.length - 1
              ].money,
            trials: [trialsParse(alias[6].text)],
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
  return resultData;
};