/**
 * css变量形式是var(--xxx-xx, 14px)
 * px不会被postcss-pxtorem转换，此处进行转换
 */
const pxRegex = (unit: string) => new RegExp(`(\\d*\\.?\\d+)${unit}`, 'g')
const filterPropList = {
    exact: list => list.filter(m => m.match(/^[^*!]+$/)),
    contain: list => list.filter(m => m.match(/^\*.+\*$/)).map(m => m.substr(1, m.length - 2)),
    endWith: list => list.filter(m => m.match(/^\*[^*]+$/)).map(m => m.substr(1)),
    startWith: list => list.filter(m => m.match(/^[^*!]+\*$/)).map(m => m.substr(0, m.length - 1)),
    notExact: list => list.filter(m => m.match(/^![^*].*$/)).map(m => m.substr(1)),
    notContain: list => list.filter(m => m.match(/^!\*.+\*$/)).map(m => m.substr(2, m.length - 3)),
    notEndWith: list => list.filter(m => m.match(/^!\*[^*]+$/)).map(m => m.substr(2)),
    notStartWith: list => list.filter(m => m.match(/^![^*]+\*$/)).map(m => m.substr(1, m.length - 2))
}

const defaults = {
    rootValue: 16 as number | Function,
    unitPrecision: 5,
    selectorBlackList: [],
    propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
    replace: true,
    mediaQuery: false,
    minPixelValue: 0,
    exclude: null as null | string | Function,
    unit: 'px',
    transformUnit: 'rem'
}

const legacyOptions = {
    root_value: 'rootValue',
    unit_precision: 'unitPrecision',
    selector_black_list: 'selectorBlackList',
    prop_white_list: 'propList',
    media_query: 'mediaQuery',
    propWhiteList: 'propList'
}

function convertLegacyOptions(options) {
    if (typeof options !== 'object') return
    if (
        ((typeof options['prop_white_list'] !== 'undefined' && options['prop_white_list'].length === 0) ||
            (typeof options.propWhiteList !== 'undefined' && options.propWhiteList.length === 0)) &&
        typeof options.propList === 'undefined'
    ) {
        options.propList = ['*']
        delete options['prop_white_list']
        delete options.propWhiteList
    }
    Object.keys(legacyOptions).forEach(key => {
        if (Reflect.has(options, key)) {
            options[legacyOptions[key]] = options[key]
            delete options[key]
        }
    })
}

function createPxReplace(rootValue, unitPrecision, minPixelValue, toUnit) {
    return (m, $1) => {
        if (!$1) return m
        const value = parseFloat($1)
        if (value < minPixelValue) return m
        let fixedVal
        if (toUnit === 'rem') {
            fixedVal = toFixed(value / rootValue, unitPrecision)
        }
        if (toUnit === 'rpx') {
            fixedVal = toFixed(value * rootValue, unitPrecision)
        }
        if (!fixedVal) return m
        return fixedVal === 0 ? '0' : fixedVal + toUnit
    }
}

function toFixed(number, precision) {
    const multiplier = Math.pow(10, precision + 1),
        wholeNumber = Math.floor(number * multiplier)
    return (Math.round(wholeNumber / 10) * 10) / multiplier
}

function declarationExists(decls, prop, value) {
    return decls.some(decl => decl.prop === prop && decl.value === value)
}

function blacklistedSelector(blacklist, selector) {
    if (typeof selector !== 'string') return
    return blacklist.some(regex => {
        if (typeof regex === 'string') {
            return selector.indexOf(regex) !== -1
        }
        return selector.match(regex)
    })
}

function createPropListMatcher(propList) {
    const hasWild = propList.indexOf('*') > -1
    const matchAll = hasWild && propList.length === 1
    const lists = {
        exact: filterPropList.exact(propList),
        contain: filterPropList.contain(propList),
        startWith: filterPropList.startWith(propList),
        endWith: filterPropList.endWith(propList),
        notExact: filterPropList.notExact(propList),
        notContain: filterPropList.notContain(propList),
        notStartWith: filterPropList.notStartWith(propList),
        notEndWith: filterPropList.notEndWith(propList)
    }
    return prop => {
        if (matchAll) return true
        return (
            (hasWild ||
                lists.exact.indexOf(prop) > -1 ||
                lists.contain.some(function (m) {
                    return prop.indexOf(m) > -1
                }) ||
                lists.startWith.some(function (m) {
                    return prop.indexOf(m) === 0
                }) ||
                lists.endWith.some(function (m) {
                    return prop.indexOf(m) === prop.length - m.length
                })) &&
            !(
                lists.notExact.indexOf(prop) > -1 ||
                lists.notContain.some(function (m) {
                    return prop.indexOf(m) > -1
                }) ||
                lists.notStartWith.some(function (m) {
                    return prop.indexOf(m) === 0
                }) ||
                lists.notEndWith.some(function (m) {
                    return prop.indexOf(m) === prop.length - m.length
                })
            )
        )
    }
}

export default (options = {}) => {
    convertLegacyOptions(options)
    const opts = Object.assign({}, defaults, options)
    const satisfyPropList = createPropListMatcher(opts.propList)
    const exclude = opts.exclude
    let isExcludeFile = false
    let pxReplace
    return {
        postcssPlugin: 'postcss-pxtorem-var',
        Once(css) {
            const filePath = css.source.input.file
            if (
                exclude &&
                ((typeof exclude === 'function' && exclude(filePath)) ||
                    (typeof exclude === 'string' && filePath.indexOf(exclude) !== -1) ||
                    filePath.match(exclude) !== null)
            ) {
                isExcludeFile = true
            } else {
                isExcludeFile = false
            }

            const rootValue = typeof opts.rootValue === 'function' ? opts.rootValue(css.source.input) : opts.rootValue
            pxReplace = createPxReplace(rootValue, opts.unitPrecision, opts.minPixelValue, opts.transformUnit)
        },
        Declaration(decl) {
            if (isExcludeFile) return

            // 只处理 var()
            if (decl.value.indexOf('var(') === -1) {
                return
            }

            if (
                decl.value.indexOf(opts.unit) === -1 ||
                !satisfyPropList(decl.prop) ||
                blacklistedSelector(opts.selectorBlackList, decl.parent.selector)
            )
                return

            const varTxt = /var\(([^)]*)\)/g.exec(decl.value)?.[1] || ''
            const res = varTxt.replace(pxRegex(opts.unit), pxReplace)
            const value = decl.value.replace(varTxt, res)

            // if rem unit already exists, do not add or replace
            if (declarationExists(decl.parent, decl.prop, value)) return

            if (opts.replace) {
                decl.value = value
            } else {
                decl.cloneAfter({ value: value })
            }
        },
        AtRule(atRule) {
            if (isExcludeFile) return

            if (opts.mediaQuery && atRule.name === 'media') {
                if (atRule.params.indexOf(opts.unit) === -1) return
                atRule.params = atRule.params.replace(pxRegex(opts.unit), pxReplace)
            }
        }
    }
}
