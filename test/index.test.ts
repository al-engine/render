import { Screen } from '../src';

test('Creating screen', () => {
  new Screen({
    height: 100,
    width: 100,
    data: new Uint8ClampedArray(),
  });
});
