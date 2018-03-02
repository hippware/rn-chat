//const XRegExp = require('xregexp')
const s = `1.
e4
e6
2.
d4
d5
3.
e5
c5
4.
c3
♕b6
5.
♝d3
♘c6
6.
♞f3
♘h6
7.
O-O
♗e7
8.
b3
cxd4
9.
♞xd4
♘xe5
10.
♝b5+
♗d7
11.
♝xd7+
♘xd7
12.
♝xh6
gxh6
13.
♛h5
♗f6
14.
♜d1
♗g7
15.
♞a3
♘f6
16.
♛e5
O-O
17.
♜d3
♘e8
18.
♜g3
♕d6
19.
♛xd6
♘xd6
20.
♜e1
♔h8
21.
♞ac2
♗xd4
22.
♞xd4
♖g8
23.
♜h3
♖g6
24.
♜e5
♖c8
25.
f4`

// const regex = /[\u4e00-\u9eff\u0000-\u007F\u0080-\u00FF\u0100-\u017F\u0180-\u024F\u0370-\u03FF\u0400-\u04FF\u0500-\u052F\u0530-\u058F\u0590-\u05FF\u0600-\u06FF\u0700-\u074F\u0750-\u077F\u0780-\u07BF\u07C0-\u07FF\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F\u0D80-\u0DFF\u0E00-\u0E7F\u0E80-\u0EFF\u0F00-\u0FFF\u1000-\u109F\u10A0-\u10FF\u1100-\u11FF\u1200-\u137F\u13A0-\u13FF\u1400-\u167F\u1680-\u169F\u16A0-\u16FF\u1700-\u171F\u1720-\u173F\u1740-\u175F\u1760-\u177F\u1780-\u17FF\u1800-\u18AF\u1900-\u194F\u1950-\u197F\u1980-\u19DF\u19E0-\u19FF\u1A00-\u1A1F\u1B00-\u1B7F]/u
// const unicodeWord = XRegExp('^\\pL+$')
//console.log(unicodeWord.test('ひらがな')) // -> true
console.log(
  s
    .replace(/(♕|♛)/g, 'Q')
    .replace(/♚|♔/g, 'K')
    .replace(/♘|♞/g, 'N')
    .replace(/♝|♗/g, 'B')
    .replace(/♜|♖/g, 'R')
    .replace(/\n/g, ' ')
)
