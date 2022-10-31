import { useEffect, useRef, useState } from "react";

export default function useAnimatedUnmount(visible) {
  const [shouldRender, setShouldRender] = useState(visible);

  const animatedElementRef = useRef(null);

  useEffect(() => {
    function handleAnimationEnd() {
      setShouldRender(false);
    }

    if (visible) {
      setShouldRender(true);
    }

    const animatedRefElement = animatedElementRef.current;
    if (!visible && animatedRefElement) {
      animatedRefElement.addEventListener('animationend', handleAnimationEnd);
    }

    return () => {
      if(animatedRefElement) {
        animatedRefElement.removeEventListener(
          'animationend',
          handleAnimationEnd
        );
      }
    };
  }, [visible]);

  return { shouldRender, animatedElementRef }
}
