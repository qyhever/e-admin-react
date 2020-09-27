import { sizeList, lineHeightList, fontList } from './Toolbar'
export default function registerModule() {
  const Quill = window.Quill
  const Parchment = Quill.import('parchment')
  class Font extends Parchment.Attributor.Class {}
  // font-size
  const fontSize = new Font('size', 'ql-size', {
    scope: Parchment.Scope.INLINE,
    whitelist: sizeList
  })
  // line-height
  const lineHeight = new Font('lineHeight', 'ql-line-height', {
    scope: Parchment.Scope.INLINE,
    whitelist: lineHeightList
  })
  // font-family
  const FontFamily = Quill.import('formats/font')
  FontFamily.whitelist = fontList

  Quill.register(FontFamily, true)
  Quill.register({
    'formats/size': fontSize,
    'formats/lineHeight': lineHeight
  }, true)
}
