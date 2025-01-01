export interface IBaseService {
    add     (props: any): any,
    remove  (id: any)   : any,
    update  (props: any): any,
    getAll  ()          : any,
    getById(id: any)    : any,
}