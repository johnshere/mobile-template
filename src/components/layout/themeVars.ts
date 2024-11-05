import type { ConfigProviderThemeVars } from 'wot-design-uni'
import uniVars from '../../uni.module.scss'

export function getThemeVars(): ConfigProviderThemeVars {
    return {
        colorTheme: uniVars.colorPrimary, // 主题色
        // colorWhite: 'string', // 用于mix的白色
        // colorBlack: 'string', // 用于mix的黑色
        colorSuccess: uniVars.colorSuccess, // 成功色
        colorWarning: uniVars.colorWarning, // 警告色
        colorDanger: uniVars.colorError, // 危险出错色
        // colorPurple: 'string', // 紫色
        // colorYellow: 'string', // 黄色
        // colorBlue: 'string', // 蓝色
        // colorInfo: 'string', // 信息色
        // colorGray1: 'string', // 灰色1
        // colorGray2: 'string', // 灰色2
        // colorGray3: 'string', // 灰色3
        // colorGray4: 'string', // 灰色4
        // colorGray5: 'string', // 灰色5
        // colorGray6: 'string', // 灰色6
        // colorGray7: 'string', // 灰色7
        // colorGray8: 'string', // 灰色8
        // fontGray1: 'string', // 字体灰色1
        // fontGray2: 'string', // 字体灰色2
        // fontGray3: 'string', // 字体灰色3
        // fontGray4: 'string', // 字体灰色4
        // fontWhite1: 'string', // 字体白色1
        // fontWhite2: 'string', // 字体白色2
        // fontWhite3: 'string', // 字体白色3
        // fontWhite4: 'string', // 字体白色4
        colorTitle: uniVars.colorTitle, // 模块标题/重要正文
        colorContent: uniVars.textColor, // 普通正文
        colorSecondary: uniVars.textColorPlaceholder, // 次要信息，注释/补充/正文
        colorAid: uniVars.textColorPlaceholder, // 辅助文字字号，弱化信息，引导性/不可点文字
        colorTip: uniVars.textColorDisable, // 失效、默认提示文字
        colorBorder: uniVars.borderColor, // 控件边框线
        // colorBorderLight: 'string', // 分割线颜色
        colorBg: uniVars.bgColorGrey // 背景色、禁用填充色
        // darkBackground: 'string', // 深色背景1
        // darkBackground2: 'string', // 深色背景2
        // darkBackground3: 'string', // 深色背景3
        // darkBackground4: 'string', // 深色背景4
        // darkBackground5: 'string', // 深色背景5
        // darkBackground6: 'string', // 深色背景6
        // darkBackground7: 'string', // 深色背景7
        // darkColor: 'string', // 深色字体1
        // darkColor2: 'string', // 深色字体2
        // darkColor3: 'string', // 深色字体3
        // darkColorGray: 'string', // 深色灰色
        // darkBorderColor: 'string', // 深色边框颜色
        // colorIcon: 'string', // icon颜色
        // colorIconActive: 'string', // icon颜色hover
        // colorIconDisabled: 'string', // icon颜色disabled
        // fsBig: uniVars.fontSizeLg, // 大型标题字号
        // fsImportant: 'string', // 重要数据字号
        // fsTitle: uniVars.fontSizeTitle, // 标题字号/重要正文字号
        // fsContent: uniVars.fontSizeBase, // 普通正文字号
        // fsSecondary: uniVars.fontSizeSm, // 次要信息字号
        // fsAid: uniVars.fontSizeSm, // 辅助文字字号
        // fwMedium: 'string', // 字重500
        // fwSemibold: 'string', // 字重600
        // sizeSidePadding: 'string' // 屏幕两边留白padding
    }
}
