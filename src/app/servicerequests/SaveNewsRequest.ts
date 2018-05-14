import { News } from '../types/classes/News'

export class SaveNewsRequest {

    private News :News; 

    constructor( news :News) { 

        this.News = news;
    } 
 
}
