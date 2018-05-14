import { News } from '../types/classes/News'; 
import { OperationResult } from './OperationResult'; 
export interface  GetNewsByIdResult extends OperationResult { 
    Item : News  
}
  