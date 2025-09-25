export interface IDataset{
    label: string,
    data: number[],
    fill ?:boolean,
    borderColor ?:string[],
    tension ?:number,
    backgroundColor ?: string[],
    borderWidth ?: number
}
export interface IDataGraph{
    labels:string[],
    datasets:IDataset[]
}

