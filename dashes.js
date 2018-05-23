// Prompt: https://codefights.com/challenge/NsaawgDYBXz9CpwZu

// Notes: super fun "reverse challenge" (no prompt, just inputs and test results,
// you figure out what it's asking). Human readable straightforward approach at the
// bottom... I had fun dialing this in for character length (why does Codefights prioritze
// character length on the leaderboard?! But at least it's fun).

// I tried 2 loops, one extra long loop, array.reverse, and finally settled on a
// solution that updates 2 rows per iteration to get the shortest answer.

// 112 chars, O(n) time, O(n) space:

/* Take 4: update two at once? */
let dashes = n => {
  let r = [], i = 0
  for (; i < n; i++) {
      let s = ' '.repeat(n - i - 1), p = s + '-' + '|-'.repeat(i) + s
      r[i] = p
      r[n * 2 - i - 2] = p
  }
  return r
}

/* Take 3: array.reverse method:
* 
let dashes = n => {
  let r = [], i = 1
  for (; i <= n; i++) {
      let s = ' '.repeat(n - i)
      r.push(s + new Array(i).fill('-').join('|') + s)
  }
  return [...r, ...r.slice(0, -1).reverse()];
}
*/

/* Take 2: Adjusted for char count and now using 1 loop
* 
let dashes = (n) => {
  let r = [],z = n * 2 - 1, i = 1
  for (i; i <= z; i++) {
      let j = i > n ? n - Math.abs(i - n) : i
      let s = ' '.repeat(n - j)
      r.push(s + new Array(j).fill('-').join('|') + s)
  }
  return r
}
*/

/* Take 1: readable logic
* 
function dashes(n) {
  let char = '-';
  let delimiter = '|';
  let spacer = ' ';
  let returnArr = [];
  
  // Build the first half (including mid point)
  for (let i = 1; i <= n; i++) {
      let thisSpacer = spacer.repeat(n - i);
      let thisDashStr = new Array(i).fill(char).join(delimiter);
      let thisString = thisSpacer + thisDashStr + thisSpacer;
      returnArr.push(thisString);
  }
  // Move backwards to build the second half:
  for (let i = returnArr.length - 2; i >= 0; i--) {
      returnArr.push(returnArr[i]);
  }
  
  return returnArr;
}

*/