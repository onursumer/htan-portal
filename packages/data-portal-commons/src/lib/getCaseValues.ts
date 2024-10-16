import _ from 'lodash';
import { Entity } from './entity';
import { getNormalizedOrgan } from './entityReportHelpers';

export function getCaseValues(propName: keyof Entity) {
    return (e: Entity) => {
        if (e.cases) {
            return _.uniq(e.cases.map((c) => c[propName] as string));
        } else {
            return [e[propName] as string];
        }
    };
}

export function getNormalizedOrganCaseValues(e: Entity) {
    if (e.cases) {
        return _.uniq(e.cases.map((c) => getNormalizedOrgan(c)));
    } else {
        return [getNormalizedOrgan(e)];
    }
}
