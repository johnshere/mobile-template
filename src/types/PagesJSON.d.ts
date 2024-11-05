namespace PageJSON {
    interface Page {
        path: string
        name: string
        meta: {
            title: string
            islogin: boolean
            isTab?: boolean
        }
        style?: {
            navigationStyle?: 'custom'
            enablePullDownRefresh?: true
            'app-plus'?: {
                scrollIndicator: 'none'
            }
        }
    }
}
