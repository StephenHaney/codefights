// predictiveTest daily question
// https://codefights.com/challenge/uRQqRdRqdYSYa7Z7N

// Notes: this one is really cool - basically build an algo for the predictive test
// suggestions that pop up on your phone as you're typing... and then build a random
// string as if the user only kept pressing on the first predicted word (we've all done this)
// A bit of a harder challenge, as evidenced by less than 70 people finishing it
// Not totally happy with my answer, but it's not bad and it's time to move on.
// Had fun learning some new RegEx concepts as well (\b shortcut is handy!)

/* 544 chars:
function predictiveText(f,g,n){var a=f.match(/\b[A-Za-z0-9-,']+\b/g);f=[];for(var m="",k=[0,0],l=new Map,b=null,h=0;h<a.length;h++){var e=a[h];b=l.get(b);var c=l.get(e);void 0===c?(c={z:null,y:[0,0],count:[1,h],x:new Map},l.set(e,c)):c.count[0]+=1;if(void 0!==b){var d=b.x.get(e);void 0===d?d=[1,h]:d[0]+=1;b.x.set(e,d);if(d[0]>b.y[0]||d[0]===b.y[0]&&d[1]<b.y[1])b.z=e,b.y=d}if(c.count[0]>
  k[0]||c.count[0]===k[0]&&c.count[1]<k[1])m=e,k=c.count;b=e}f.push(g);a=g;for(g=1;g<n;g++)a=l.get(a),void 0===a||null===a.z?(f.push(m),a=m):(f.push(a.z),a=a.z);return f}
*/

// Human readable:
function predictiveText(trainingText, firstWord, howManyWords) {
  let wordRegEx = /\b[A-Za-z0-9-,']+\b/g;
  let trainingArr = trainingText.match(wordRegEx);
  let returnArr = [];
  let history = {
      mostCommon: '',
      mostCommonCount: [0, Infinity],
      wordMap: new Map(),
  };
  
  // build our word map:
  let lastWord = null;
  for (let i = 0; i < trainingArr.length; i++) {
      let newWord = trainingArr[i];
      let lastWordHistory = history.wordMap.get(lastWord);
      let newWordHistory = history.wordMap.get(newWord);
      
      if (newWordHistory === undefined) {
          // First time we've seen this word
          let historyObj = {
              mostCommon: null,
              mostCommonCount: [0, Infinity],
              count: [1, i],
              nextWords: new Map(),
          };
          history.wordMap.set(newWord, historyObj);
          newWordHistory = historyObj;
      }
      else {
          newWordHistory.count[0] += 1;
      }

      if (lastWordHistory !== undefined) {
        // We've seen lastWord before, update its history
        // This should happen for every word except the first word:
        let newWordHistoryCount = lastWordHistory.nextWords.get(newWord);
        if (newWordHistoryCount === undefined) {
            newWordHistoryCount = [1, i];
        }
        else {
            newWordHistoryCount[0] += 1;
        }
        lastWordHistory.nextWords.set(newWord, newWordHistoryCount);
        // Check if the new word is the most common next word for the lastWord:
        if (newWordHistoryCount[0] > lastWordHistory.mostCommonCount[0] || (newWordHistoryCount[0] === lastWordHistory.mostCommonCount[0] && newWordHistoryCount[1] < lastWordHistory.mostCommonCount[1])) {
            lastWordHistory.mostCommon = newWord;
            lastWordHistory.mostCommonCount = newWordHistoryCount;
        }
      }

      // Check if the new word is the overall most common word:
      if (newWordHistory.count[0] > history.mostCommonCount[0] || (newWordHistory.count[0] === history.mostCommonCount[0] && newWordHistory.count[1] < history.mostCommonCount[1])) {
          history.mostCommon = newWord;
          history.mostCommonCount = newWordHistory.count;
      }
      
      lastWord = newWord;
  }

  returnArr.push(firstWord);
  let prevWord = firstWord;
  for (let i = 1; i < howManyWords; i++) {
      let wordHistory = history.wordMap.get(prevWord);
      if (wordHistory === undefined || wordHistory.mostCommon === null) {
          returnArr.push(history.mostCommon);
          prevWord = history.mostCommon;
      }
      else {
          returnArr.push(wordHistory.mostCommon);
          prevWord = wordHistory.mostCommon;
      }
  }
  
  return returnArr;
}
