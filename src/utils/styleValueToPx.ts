export const styleValueToPx = (px: string | number): number | void => {
  if (typeof px === 'string') {
    if (px.match(/%/)) {
      return
    }
    const convertedPx = parseFloat(px)
    if (isNaN(convertedPx)) return
    return convertedPx
  }
  if (isNaN(px)) return
  return px
}
