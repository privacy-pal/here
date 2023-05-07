
export interface Option {
    option: string,
    capacity: any
}

export function mapToList<T>(map: Record<string, T>): Option[] {
    let list = [];
    for (const key in map) {
        list.push({ option: key, capacity: map[key] })
    }
    return list;
}