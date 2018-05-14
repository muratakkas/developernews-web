import { Category } from '../types/classes/Category'

export class SaveCategoryRequest {

    private Category :Category; 

    constructor( category :Category) { 

        this.Category = category;
    } 
 
}
