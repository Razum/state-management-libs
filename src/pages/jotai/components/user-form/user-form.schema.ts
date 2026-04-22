import * as v from 'valibot';

export default v.object({
  name: v.pipe(v.string(), v.trim(), v.minLength(3)),
  age: v.pipe(v.number(), v.minValue(0), v.maxValue(100)),
  email: v.pipe(v.string(), v.trim(), v.email()),
  penalty: v.pipe(v.number(), v.minValue(0), v.maxValue(2000))
});
