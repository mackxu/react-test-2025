## 依赖 React.lazy 实现组件延迟加载

```jsx
const CompA = React.lazy(() => import("./LazyComp"));

<div>{visible && <CompA />}</div>;
```

## html2video

- html2canvas
- captureStream()
  https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/captureStream
  - MediaStream
- MediaRecorder
  - ondataavailable
  - onstop
  - start
  - stop
- childNodes vs children
