import { RequestCriteria } from '../servicerequests/RequestCriteria'; 

export class  ListRequestParam {
 
    private CurrentPage : number; 

    private PageCount : number; 

    private Criterias : RequestCriteria[]; 

    constructor( ) { 

        this.CurrentPage  = 0;
        this.PageCount = 10;
        this.Criterias = [];
    }


    SetCurrentPage(pageNumber)
    {
        this.CurrentPage = pageNumber;
        return this;
    }
    
    SetPageCount(pageCount)
    {
        this.PageCount = pageCount;
        return this;
    } 

    AddCriteria(name:string,value:any)
    {
        this.Criterias.push(new RequestCriteria(name,value)); 
    }
    
}
