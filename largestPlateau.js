// Prompt: https://codefights.com/challenge/J2KshRwM483QWTwYe

// Notes: cool question - I used a straightforward recursive solution to find the answer.

// 312 characters:
// largestPlateau=function(d){function f(a,b,c){var e=0;d[b][c]==a&&(d[b][c]=null,e+=1,0<b&&(e+=f(a,b-1,c)),b<d.length-1&&(e+=f(a,b+1,c)),0<c&&(e+=f(a,b,c-1)),c<d[0].length-1&&(e+=f(a,b,c+1)));return e}for(var k=0,g=0;g<d.length;g++)for(var l=d[g],h=0;h<l.length;h++){var a=l[h];null!=a&&(a=f(a,g,h),a>k&&(k=a))}return k};

// Human readable:
let largestPlateau = (map) => {
    let maxSeen = 0;
    
    for (let rowI = 0; rowI < map.length; rowI++) {
        let thisRow = map[rowI];
        for (let colI = 0; colI < thisRow.length; colI++) {
            let thisHeight = thisRow[colI];
            
            if (thisHeight !== null) {
                let size = seek(thisHeight, rowI, colI);
                
                if (size > maxSeen) { maxSeen = size; }
            }
        }
    }
    
    return maxSeen;
    
    function seek(height, rowI, colI) {
        let size = 0;
        
        if (map[rowI][colI] === height) {
            // found a match, null it out so we skip it in the main loop
            map[rowI][colI] = null;
            size += 1;
            
            if (rowI > 0) {
                // Check above
                size += seek(height, rowI - 1, colI);
            }
            if (rowI < map.length - 1) {
                // Check below
                size += seek(height, rowI + 1, colI);
            }
            if (colI > 0) {
                // Check left
                size += seek(height, rowI, colI - 1);
            }
            if (colI < map[0].length - 1) {
                // Check right
                size += seek(height, rowI, colI + 1);
            }
        }
        
        return size;
    }
}
