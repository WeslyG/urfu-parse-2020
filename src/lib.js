import SexByRussianName from './sex';
import fs from 'fs';

export const writeFile = (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, err => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

export const getSex = name => {
  const beautiName = name.split(' ');
  const res = new SexByRussianName(beautiName[0], beautiName[1], beautiName[2]).get_gender();
  if (res === 1) {
    return 'М';
  } else if (res === 0) {
    return 'Ж';
  } else {
    return 'Н';
  }
};

export const tellMeTrue = stringForTrue => (stringForTrue.toLowerCase() === 'да' ? true : false);

export const nameLen = name => name.split(' ').length === 3 ? true : false;

export const getNational = name => { 
  if (name.split(' ').length < 3) return 'smallNameCount';
  if (name.split(' ').length === 3) return 'normal';
  if (name.split(' ').length > 3) return 'moreNameCount';
};