const {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook,
  AsyncParallelHook,
  AsyncSeriesBailHook
} = require("tapable");

const hooks = {
  a: new SyncHook(["a", "b"], "name_a"),
  b: new SyncBailHook(["a", "b"], "name_a"),
  c: new SyncWaterfallHook(["a", "b"], "name_a"),
  d: new SyncLoopHook(["a", "b"], "name_a"),
  e: new AsyncParallelHook(["a", "b"], "name_a"),
  f: new AsyncSeriesBailHook(["a", "b"], "name_a")
};

// hooks.a.tap("a_1", (a, b) => {
//   console.log("a_1", a, b);
// });

// hooks.a.call(1, 2);
// 保险类型，当回调返回不是undefined时，停止调用
// hooks.b.tap("hook1", (a, b) => {
//   console.log("hook1", a, b);
//   return 1;
// });
// hooks.b.tap("hook2", (a, b) => {
//   console.log("hook2", a, b);
// });

// hooks.b.call(1, 2);

// Waterfail 瀑布类型，当返回不为undefined时，将下一个回调的第一个参数替换为返回值
// hooks.c.tap("hook1", (a, b) => {
//   console.log("hook1", a, b);
//   return 8;
// });
// hooks.c.tap("hook2", (a, b) => {
//   console.log("hook2", a, b);
// });

// hooks.c.call(1, 2);

// Loop循环类型，如果当前执行的事件回调的返回值不为undefined，递归调用注册事件直到没有返回值
// let age = 0;
// hooks.d.tap("hook1", (a, b) => {
//   console.log("hook1", a, b);
//   ++age;
//   if (age < 3) {
//     return age;
//   }
// });
// hooks.d.tap("hook2", (a, b) => {
//   console.log("hook2", a, b);
// });

// hooks.d.call(1, 2);

// AsyncParaller，Async开头的钩子，只能用callAsync或promise方法触发回调，AsyncParaller并行执行回调
// hooks.e.tapAsync("hook1", (a, b, cb) => {
//   setTimeout(() => {
//     console.log("hook1", a, b);
//     cb();
//   }, 300);
// });
// hooks.e.tapAsync("hook2", (a, b, cb) => {
//   setTimeout(() => {
//     console.log("hook2", a, b);
//     cb();
//   }, 200);
// });

// hooks.e.callAsync(1, 2, (err, data) => {
//   console.log("hook over", err, data);
// });

// AsyncSeries，串行执行回调

hooks.f.tapAsync("hook1", (a, b, cb) => {
    setTimeout(() => {
      console.log("hook1", a, b);
      cb();
    }, 300);
  });
  hooks.f.tapAsync("hook2", (a, b, cb) => {
    setTimeout(() => {
      console.log("hook2", a, b);
      cb();
    }, 200);
  });
  
  hooks.f.callAsync(1, 2, (err, data) => {
    console.log("hook over", err, data);
  });
  