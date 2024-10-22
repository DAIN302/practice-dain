import { makeAutoObservable } from "mobx";
import { createContext, PropsWithChildren, useContext } from "react";
import Section, { SectionData } from "./models/section";
import callApi from "./utilis/api";

// mobx store
class SurveyStore {
  sections: Section[] = [];
  focusedSetionId: number | null = null;

  constructor() {
    makeAutoObservable(this, {}, {autoBind:true});
    this.sections = [new Section()];
    this.focusedSetionId = this.sections[0].id;
  }

  // 섹션 추가
  addSection(){
    const section = new Section();
    this.sections.push(section);
    this.focusedSetionId = section.id;
  }

  // 질문 추가
  addQuestion(){
    const section = this.sections.find(section => section.id === this.focusedSetionId);
    if(section){
        section.addQuestion();
    }
  }
  
  // focus 설정
  setFocusSection(id:number) {
    this.focusedSetionId = id;
  }

  fetchSurvey(id:number){
    callApi<{sections : SectionData[]}>(`/surveys/${id}`).then(({sections} => {
      this.sections = sections.map(section => new Section(section))
    }))
  }
}


// store 인스턴스 생성
const surveyStore = new SurveyStore();

// 전역으로 넘겨주기 위해 컨텍스트 생성
const SurveyStoreContext = createContext(surveyStore);
export const useSurveyStore = () => useContext(SurveyStoreContext);
export const SurveyStoreProvider = ({ children }: PropsWithChildren) => (
  <SurveyStoreContext.Provider value={surveyStore}>
    {children}
  </SurveyStoreContext.Provider>
);
