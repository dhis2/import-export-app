import { getInstance } from 'd2/lib/d2'
import { isProduction } from '../../../helpers/env'

export const fetchRoot = async setList => {
    try {
        const d2 = await getInstance()
        d2.models.organisationUnits
            .list({
                level: 1,
                paging: false,
                fields: 'id,path,displayName,children::isNotEmpty',
            })
            .then(root => {
                const list = root.toArray().map(item => {
                    const { path, displayName } = item
                    return {
                        open: false,
                        value: path,
                        label: displayName,
                        children: [],
                    }
                })

                setList(list)
            })
    } catch (e) {
        !isProduction && console.log('OrgUnitTree root fetch failed')
    }
}
