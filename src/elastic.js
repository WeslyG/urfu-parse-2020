import needle from 'needle';
import { INDEX_NAME } from '../app';

const options = {
  headers: { 
    'User-Agent': 'Mozilla/5.0',
    'Content-Type': 'application/json'
  },
};

export const WriteSingleDoctoElastic = async oneDoc => {
  return new Promise((resolve, reject) => {
    needle('post', `http://localhost:9200/${INDEX_NAME}/_doc`, oneDoc, options)
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

