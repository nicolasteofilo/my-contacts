/* eslint-disable no-nested-ternary */

export default function useHeader(qtyOfContacts, hasError) {
  const aligment = hasError
    ? 'flex-end'
    : qtyOfContacts > 0
    ? 'space-between'
    : 'center';

    return { aligment }
}
