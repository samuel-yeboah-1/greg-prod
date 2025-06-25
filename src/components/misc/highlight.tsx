'use client';

import * as React from 'react';
import {
  motion,
  useInView,
  type HTMLMotionProps,
  type Transition,
  type UseInViewOptions,
} from 'motion/react';

import { cn } from '@/lib/utils';

type HighlightTextProps = HTMLMotionProps<'span'> & {
  text: string;
  inView?: boolean;
  inViewMargin?: UseInViewOptions['margin'];
  inViewOnce?: boolean;
  transition?: Transition;
};

function HighlightText({
  ref,
  text,
  className,
  inView = true, // Changed to true by default
  inViewMargin = '0px',
  inViewOnce = true, // Made this configurable
  transition = { duration: 2, ease: 'easeInOut' },
  ...props
}: HighlightTextProps) {
  const localRef = React.useRef<HTMLSpanElement>(null);
  React.useImperativeHandle(ref, () => localRef.current as HTMLSpanElement);

  const inViewResult = useInView(localRef, {
    once: inViewOnce,
    margin: inViewMargin,
  });

  // Fixed logic: only animate when element is in view
  const shouldAnimate = inView ? inViewResult : true;

  return (
    <motion.span
      ref={localRef}
      data-slot="highlight-text"
      initial={{
        backgroundSize: '0% 100%',
      }}
      animate={shouldAnimate ? { backgroundSize: '100% 100%' } : undefined}
      transition={transition}
      style={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center',
        display: 'inline',
      }}
      className={cn(
        `relative inline-block px-2 py-1 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-500 dark:to-purple-500`,
        className,
      )}
      {...props}
    >
      {text}
    </motion.span>
  );
}

export { HighlightText, type HighlightTextProps };
export default HighlightText;