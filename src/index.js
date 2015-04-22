import assert from 'assert';

export default function(offsets, opts = {}) {
  let { s: s, gamma: gamma } = opts;
  s = (s || s === 0) ? s : 2;
  gamma = (gamma || gamma === 0) ? gamma : 1;

  assert(s > 1, 's must be > 1');
  assert(gamma > 0, 'gamma must be > 0');
  assert(offsets.length > 0, 'offsets length must be > 0');
  assert(unique(offsets).length === offsets.length, 'offsets values must be unique');

  let gaps = eachSlice(offsets, (a, b) => { return b - a; });
  let sumGaps = gaps.reduce((acc, n) => { return acc + n; });
  let k = Math.ceil(1 + log(sumGaps, s) + log(1 / min(gaps)[0], s));

  let tau = (() => {
    let gammalogn = gamma * log(gaps.length);
    return (i, j) => { return i >= j ? 0 : (j - i) * gammalogn; };
  })();

  let f = (() => {
    let ghat = sumGaps / gaps.length;
    return (i, x) => {
      let alpha = Math.pow(s, i) / ghat;
      return alpha * Math.exp(-alpha * x);
    };
  })();

  let initialCosts = [0].concat(repeat(Infinity, k - 1));
  let paths = repeat([0], k);
  let finalCosts = gaps.reduce((table, gap, t) => {
    return range(0, k).map((j) => {
      let costs = range(0, k).map((i) => { return table[i] + tau(i, j) - log(f(j, gap)); });
      let [minCost, minCostState] = min(costs);
      paths[j] = paths[minCostState].slice(0, t + 1).concat(j);
      return minCost;
    });
  }, initialCosts);

  return paths[min(finalCosts)[1]];
};

function repeat(val, n) {
  let res = [];
  for (let i = 0; i < n; i++) res.push(val);
  return res;
}

function range(from, to) {
  let res = [];
  for (let i = from; i < to; i++) res.push(i);
  return res;
}

function log(val, base) {
  return base ? Math.log(val) / Math.log(base) : Math.log(val);
}

function min(arr) {
  return arr.reduce((min, val, i) => {
    return val <= min[0] ? [val, i] : min;
  }, [Infinity, null]);
}

function unique(arr) {
  var tmp = {};
  arr.forEach(function(val) { tmp[val] = true; });
  return Object.keys(tmp);
}

function eachSlice(arr, cb) {
  let res = [];
  for (let i = 1, len = arr.length; i < len; i++) {
    res.push(cb(arr[i - 1], arr[i]));
  }
  return res;
}
