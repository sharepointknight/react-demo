import pnp from 'sp-pnp-js'

export default class SharePointService
{
    static GetListItems(listTitle:string):any
    {
        return pnp.sp.web.lists.getByTitle(listTitle).items.get();
    }
    static AddListItem(listTitle:string, item:any):any
    {
        return pnp.sp.web.lists.getByTitle(listTitle).items.add(item);
    }
}