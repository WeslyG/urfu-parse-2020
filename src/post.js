export const upperTrials = data => {
  const allTrials = {
    type: '',
    sum: 0,
    average: 0,
    meddian: 0,
    trialsCount: 0,
    trialsName: [],
  };
  let temp = [];
  for (let z in data.trialsList) {
    for (let q in data.trialsList[z].trials) {
      let item = data.trialsList[z].trials[q];
      if (!item || !item.name) continue;
      if (!allTrials.trialsName.includes(item.name)) {
        allTrials.trialsName.push(item.name);
      }
      allTrials.trialsCount = allTrials.trialsName.length;

      if (temp.filter(i => i.name === item.name).length === 0) {
        temp.push(item);
      }
    }
  }
  for (let k in temp) {
    allTrials.sum += temp[k].number;
    if (temp[k].name) allTrials[temp[k].name] = temp[k].number;
    allTrials.type = temp[k].type;
  }
  allTrials.average = parseInt(allTrials.sum) / parseInt(allTrials.trialsCount);
  // console.log(temp);
  return allTrials;
};