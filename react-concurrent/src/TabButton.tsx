// import { startTransition, useTransition } from "react";

// export default function TabButton({
//   action,
//   children,
//   isActive,
// }: {
//   action: () => void;
//   children: React.ReactNode;
//   isActive: boolean;
// }) {
//   const [isPending, startTransition] = useTransition();
//   if (isPending) {
//     return <b style={{ color: "gray" }}>{children}</b>;
//   }
//   if (isActive) {
//     return <b>{children}</b>;
//   }
//   return (
//     <button
//       onClick={() => {
//         startTransition(() => {
//           action();
//         });
//       }}
//     >
//       {children}
//     </button>
//   );
// }

export default function TabButton({ action, children, isActive }) {
  if (isActive) {
    return <b>{children}</b>;
  }
  return (
    <button
      onClick={() => {
        action();
      }}
    >
      {children}
    </button>
  );
}
