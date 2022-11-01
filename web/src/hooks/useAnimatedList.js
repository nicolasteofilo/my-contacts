import { useCallback, useRef, useState, useEffect } from 'react';

export default function useAnimatedList(initialValue) {
  const [items, setItems] = useState(initialValue || []);
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState([]);

  const animatedRefs = useRef(new Map());
  const animationEndListeners = useRef(new Map());

  const handleAnimationEnd = useCallback((itemId) => {
    const removeListener = animationEndListeners.current.get(itemId);
    removeListener();
    animatedRefs.current.delete(itemId);
    animationEndListeners.current.delete(itemId);

    setItems((prevState) =>
      prevState.filter((message) => message.id !== itemId)
    );

    animatedRefs.current
      .get(itemId)
      .setPendingRemovalItemsIds((prevState) =>
        prevState.filter((id) => id !== itemId)
      );
  }, []);

  useEffect(() => {
    pendingRemovalItemsIds.forEach((itemId) => {
      const animatedRef = animatedRefs.current.get(itemId);
      const animatedElement = animatedRef?.current;
      const alreadyHasListener = animationEndListeners.current.has(itemId);

      if (animatedElement && !alreadyHasListener) {
        const onAnimationEnd = () => handleAnimationEnd(itemId);
        const removeListener = () => {
          animatedElement.removeEventListener('animationend', onAnimationEnd);
        };

        animatedElement.addEventListener('animationend', onAnimationEnd);
        animationEndListeners.current.set(itemId, removeListener);
      }
    });
  }, [handleAnimationEnd, pendingRemovalItemsIds]);

  useEffect(() => {
    const removeListeners = animationEndListeners.current;
    return () => {
      removeListeners.forEach((removeListener) => removeListener());
    };
  }, []);

  const handleRemoveItem = useCallback((id) => {
    setPendingRemovalItemsIds((prevState) => [...prevState, id]);
  }, []);

  const getAnimatedRef = useCallback((id) => {
    let animatedElementRef = animatedRefs.current.get(id);

    if (!animatedElementRef) {
      animatedElementRef = { current: null }; // or createRef()
      animatedRefs.current.set(id, animatedElementRef);
    }

    return animatedElementRef;
  }, []);

  const renderList = useCallback(
    (renderItem) =>
      items.map((item) => {
        const isLeaving = pendingRemovalItemsIds.includes(item.id);
        const animatedElementRef = getAnimatedRef(item.id);

        return renderItem(item, {
          isLeaving,
          animatedElementRef,
        });
      }),
    [items, pendingRemovalItemsIds, getAnimatedRef]
  );

  return {
    pendingRemovalItemsIds,
    items,
    setItems,
    renderList,
    handleRemoveItem,
  };
}
