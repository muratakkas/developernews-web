import { ListRequestParam } from './ListRequestParam';

export class OperationRequest {

    private RequestParams :ListRequestParam; 

    constructor( ) { 

        this.RequestParams  = new ListRequestParam(); 
    }

    SetCurrentPage(pageNumber)
    { 
        this.RequestParams.SetCurrentPage(pageNumber);
        return this;
    }
    
    SetPageCount(pageCount)
    {
        this.RequestParams.SetPageCount(pageCount);
        return this;
    }

    AddCriteria(name:string,value:any)
    {
        this.RequestParams.AddCriteria(name,value);
    }

}
