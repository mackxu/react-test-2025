## 依赖 React.lazy 实现组件延迟加载

```jsx
const CompA = React.lazy(() => import("./LazyComp"));

<div>{visible && <CompA />}</div>;
```
