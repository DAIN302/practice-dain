import { makeAutoObservable } from "mobx";
import Question from "./question";

// section mobx 설정
export type SectionData = {
    id:number;
    title: string;
    description : string;
    questions : Question[];
}

export default class Section implements SectionData{
    id:number;
    title: string;
    description: string;
    questions : Question[];

    constructor(data: SectionData = {
        id: Date.now(),
        title : '',
        description : '',
        questions : [new Question()],
    }){
        makeAutoObservable(this, {}, {autoBind:true});
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.questions = data.questions.map(question => new Question(question))
    }

    // 추가 액션
    addQuestion(){
        this.questions.push(new Question());
    }

    // 제거 액션
    removeQuestion(id:number){
        this.questions = this.questions.filter((question) =>  question.id !== id);
    }

    // copy
    copyQuestion(id:number){
        const question = this.questions.find(q => q.id === id);
        if(question){
            this.questions.push(new Question({...question, id:Date.now()}));
        }
    }

    // title setter
    setTitle(title : string){
        this.title = title;
    }

    // description setter
    setDescription(description : string){
        this.description = description;
    }

    
}