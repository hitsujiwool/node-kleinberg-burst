import assert from 'power-assert';

import burst from '..';

// reference data from http://cran.r-project.org/web/packages/bursts/index.html
const offsets = [0, 100, 200, 300, 400, 410, 415, 420, 425, 430, 435, 440, 445, 450, 451, 453, 455, 457, 459, 461, 463, 465, 467, 469, 480, 485, 490, 495, 500, 505, 510, 515, 520, 525, 530, 535, 540, 545, 550, 555, 560, 565, 570, 575, 580, 585, 590, 595, 600, 700, 710, 715, 720, 725, 730, 735, 740, 745, 750, 755, 760, 765, 770, 775, 780, 785, 790, 795, 800, 900, 1000];

const expected_s_2_gamma_1 = [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0];

const expected_s_3_gamma_1 = [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0];

const expected_s_2_gamma_3 = [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

describe('burst(offsets)', () => {
  describe('default', () => {
    it('should return burst level at each occurrence', () => {
      assert.deepEqual(burst(offsets), expected_s_2_gamma_1);
    });
  });

  describe('offsets must be unique', () => {
    it ('should raise error', () => {
      assert.throws(() => { burst(offsets.concat(1000)); }, assert.AssertionError);
    });
  });

  describe('offsets length must be > 0', () => {
    it ('should raise error', () => {
      assert.throws(() => { burst([]); }, assert.AssertionError);
    });
  });

  describe('s must be > 1', () => {
    it('default value is s = 2', () => {
      assert.deepEqual(burst(offsets), expected_s_2_gamma_1);
    });

    it('ok (s = 3)', () => {
      assert.deepEqual(burst(offsets, { s: 3 }), expected_s_3_gamma_1);
    });

    it('should raise error (s = 1)', () => {
      assert.throws(() => { burst(offsets, { s: 1 }); }, assert.AssertionError);
    });

    it('should raise error (s = 0.5', () => {
      assert.throws(() => { burst(offsets, { s: 0.5 }); }, assert.AssertionError);
    });
  });

  describe('gamma must be = 0', () => {
    it('default value is gamma = 1', () => {
      assert.deepEqual(burst(offsets), expected_s_2_gamma_1);
    });

    it('ok (gamma = 3)', () => {
      assert.deepEqual(burst(offsets, { gamma: 3 }), expected_s_2_gamma_3);
    });

    it('should raise error (gamma = 0)', () => {
      assert.throws(() => { burst(offsets, { gamma: 0 }); }, assert.AssertionError);
    });

    it('should raise error (gamma = -1)', () => {
      assert.throws(() => { burst(offsets, { gamma: -1 }); }, assert.AssertionError);
    });
  });
});
