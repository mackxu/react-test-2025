import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";

export const MyLazyload = ({
  placeholder,
  offset,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  placeholder?: ReactNode;
  offset?: string | number;
  width?: number | string;
  height?: string | number;
  onContentVisible?: () => void;
  children: ReactNode;
}) => {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef(null);
  const elObserver = useRef<IntersectionObserver>(null);
  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      setVisible(true);
      elObserver.current?.unobserve(containerRef.current!);
    }
  };
  useEffect(() => {
    const targetEl = containerRef.current;
    if (!targetEl) {
      return;
    }
    elObserver.current = new IntersectionObserver(handleIntersect, {
      rootMargin: `${offset || 0}px`,
      threshold: 0,
    });

    elObserver.current.observe(targetEl);
    return () => {
      elObserver.current?.unobserve(targetEl);
    };
  }, [offset]);
  return <div ref={containerRef}>{visible ? children : placeholder}</div>;
};
