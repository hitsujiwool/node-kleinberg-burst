# node-kleinberg-burst

## Example

```javascript
var burst = require('kleinberg-burst');
var offsets = [1, 2, 3, 10, 11, 12, 13, 14, 20, 25, 30];
burst(offsets)
```

## Methods

```javascript
var burst = require('kleinberg-burst')
```

### var levels = burst(offsets, opts);

`offset` is an array of occurrence time offsets. The function returns an array whose elements are the burst levels at the time of each occurrence.

## Options

`opts.s = 2` - the base of the exponent used to determine event frequencies in a given state

`opts.gamma = 1` - a coefficient modifies the cost of a transition to a higher state

## Install

```
$ npm i kleinberg-burst
```

## See Also

- Original paper is Kleinberg, J. (2002) [_Bursty and Hierarchical Structure in Streams_](http://www.cs.cornell.edu/home/kleinber/bhs.pdf).
- Greatly owed implementation and reference test data to [R implementation](http://cran.r-project.org/web/packages/bursts/index.html).

## License

MIT
