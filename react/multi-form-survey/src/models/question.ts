import { makeAutoObservable } from "mobx";
import { QuestionType } from "../types/app";

//mobx 
type QuestionData = {
    id : number;
    title : string;
    type: QuestionType;
    required : boolean;
    options? : string[];
}

export default class Question implements QuestionData {
    id : number;
    title : string;
    type: QuestionType;
    required : boolean;
    options? : string[];

    constructor(data:QuestionData = {
        id:Date.now(),
        title:'',
        type:'shortText',
        required: false
    }){
        makeAutoObservable(this);
        this.id = data.id;
        this.title = data.title;
        this.type = data.type;
        this.required = data.required;
        this.options = data.options;
    }

    setTitle(title:string){
        this.title = title;
    }

    setType(type:QuestionType){
        this.type = type;
        
        // options 를 초기화하는 로직
        // 옵션 추가 항목인 타입과 아닌 타입 구분
        if(type === 'multipleChoice' || type === 'dropdown' || type === 'checkbox'){
            this.options =  this.options ?? ['']
        } else {
            this.options = undefined
        }
    }

    setRequired(required:boolean){
        this.required = required;
    }

    setOptions(options:string[]){
        this.options = options;
    }
}