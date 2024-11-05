import { pages, subPackages } from '@/pages.json'

export function findPageConfig(path?: string): PageJSON.Page | undefined {
    if (!path) return undefined
    const rous = [...pages] as PageJSON.Page[]
    subPackages.forEach(pkg => {
        pkg.pages.forEach(it => {
            const item = it as PageJSON.Page
            rous.push({ ...item, path: `${pkg.root}/${it.path}` })
        })
    })
    const page = rous.find(it => path?.includes(it.path))
    return page
}
