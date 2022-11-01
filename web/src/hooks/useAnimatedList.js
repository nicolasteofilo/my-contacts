import { useCallback, useRef, useState } from 'react';

export default function useAnimatedList(initialValue) {
  const [items, setItems] = useState(initialValue || []);
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState([]);

  const animatedRefs = useRef(new Map());

  const handleRemoveItem = useCallback((id) => {
    setPendingRemovalItemsIds((prevState) => [...prevState, id]);
  }, []);

  // const handleAnimationEnd = useCallback((id) => {
  //   setItems((prevState) => prevState.filter((message) => message.id !== id));
  //   setPendingRemovalItemsIds((prevState) =>
  //     prevState.filter((itemId) => itemId !== id)
  //   );
  // }, []);

  const getAnimatedRef = useCallback((id) => {
    let animatedElementRef = animatedRefs.current.get(id);

    if(!animatedElementRef) {
      animatedElementRef = { current: null } // or createRef()
      animatedRefs.current.set(id, animatedElementRef);
    }

    return animatedElementRef;
  }, [])

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
