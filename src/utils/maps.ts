export function formatText(text = '', matched: any[] = [], wrap, key) {
  const bold: any[] = []
  const res: any[] = []
  matched.forEach(({offset, length}) => {
    for (let i = offset; i < offset + length; i += 1) {
      bold[i] = true
    }
  })
  let cur = ''
  for (let i = 0; i < text.length; i += 1) {
    if (i > 0 && bold[i] !== bold[i - 1]) {
      res.push(bold[i] ? cur : wrap(cur, key + i))
      cur = ''
    }
    cur += text[i]
  }
  if (cur) {
    res.push(bold[text.length - 1] ? wrap(cur, key + (text.length - 1)) : cur)
  }
  return res
}
