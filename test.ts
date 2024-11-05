function toFixed(number, precision) {
    const multiplier = Math.pow(10, precision + 1),
        wholeNumber = Math.floor(number * multiplier)
    return (Math.round(wholeNumber / 10) * 10) / multiplier
}
function createPxReplace(rootValue, unitPrecision, minPixelValue) {
    return (m, $1) => {
        if (!$1) return m
        const pixels = parseFloat($1)
        if (pixels < minPixelValue) return m
        const fixedVal = toFixed(pixels / rootValue, unitPrecision)
        return fixedVal === 0 ? '0' : fixedVal + 'rem'
    }
}

const reg = /var\(--xxx-xx, (\d*\.?\d+)px\)/g
const test = str => {
    const rp = createPxReplace(100, 5, 1)
    const res = str.replace(reg, rp)
    // console.log(str, '       ', res)
    console.log(str, '       ', res)
}
test('var( 28px) 14px')
test('var(--wot-button-medium-padding, 0 16px)')
test('var( --t-w, 11px) "test" 28px')
test("solid '#fff' 3px")
test('(3px)')
test('(3px')
test('a3px)')
test('aaaaa-3px)')
test('. .3px)')
test('--3px)')
