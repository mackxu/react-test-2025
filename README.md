## 延迟加载组件

```jsx
const CompA = React.lazy(() => import("./LazyComp"));

<div>{visible && <CompA />}</div>;
```
