// leastAppearance daily
// https://codefights.com/challenge/vvaEwn4NbpLYGMt5G

// Notes: 150 characters... some people have it down to 68 in JS!
// I just simply keep track of numbers we've used in an object, mapping the array
// based on what we've seen before. Straightforward challenge, though I'm curious
// what method folks are using to get sub 70 characters.

// This is an O(n) time solution, O(n) space.

// Minimum char version:
var b={};
let leastAppearance = f => f.map(a => {var d=b[a[0]]||0,e=b[a[1]]||0,c=d<e?a[0]:a[1];d==e&&(c=a[0]<a[1]?a[0]:a[1]);void 0==b[c]?b[c]=1:b[c]++;return c})

/* Human readable:
function leastAppearance(choices) {
    let usedNumbers = {};
    return choices.map(choice => {
        let choice1Usage = usedNumbers[choice[0]] || 0;
        let choice2Usage = usedNumbers[choice[1]] || 0;
        let chosen = choice1Usage < choice2Usage ? choice[0] : choice[1];
        if (choice1Usage === choice2Usage) {
            chosen = choice[0] < choice[1] ? choice[0] : choice[1];
        }
        usedNumbers[chosen] === undefined ? usedNumbers[chosen] = 1 : usedNumbers[chosen]++;
        return chosen;
    });
}
*/