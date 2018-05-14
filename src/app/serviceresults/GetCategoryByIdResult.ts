import { Category } from '../types/classes/Category'; 
import { OperationResult } from './OperationResult'; 
export interface  GetCategoryByIdResult extends OperationResult { 
    Item : Category  
}
  