// File that contains helper functions

// Function to return array of primes
function getPrimes(n) {
  var booleans = [];
  var output = [];

  // Set all values to true initially
  for (var i=0; i < n; i++) {
    booleans.push(true); 
  } 

  // Set multiples of primes to false
  for (var i=2; i<=Math.sqrt(n); i++) {
    if (booleans[i]) {
      for (var j = i*i; j<=n; j+=i) {
        booleans[j] = false;    
      }
    }
  }
  
  // Return all the numbers that are set to true
  for (var k=2; k<n; k++) {
    if (booleans[k]) {
      output.push(k); 
    }
  }
  
  return output;
} 

// Function to get the median
module.exports.getMedian = function(n) {
  var arr = getPrimes(n);

  var middle = Math.floor(arr.length/2);

  if (arr.length%2 === 1) {
    return [arr[middle]];
  } else {
    return [arr[middle-1], arr[middle]];
  }
}

