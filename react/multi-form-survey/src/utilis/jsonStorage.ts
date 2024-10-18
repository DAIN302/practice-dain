import fs from 'fs'

type Key = string | number;

// 데이터를 저장하는 클래스
export default class JsonStorage<Data> {
    // private 으로 설정 앞에다 # 을 붙인당.
    #values: Record<Key, Data> = {};
    
    constructor(private readonly filename: string){
        this.load();
    }

    // 로드 함수
    load(){
        try {
            const data = fs.readFileSync(this.filename, 'utf-8');
            this.#values = JSON.parse(data) ?? {}; // undefined 면 빈 객체 할당
        } catch (error) {
            console.error(error);
            
        }
    }

    // 저장 메서드
    save(){
        try {
            fs.writeFileSync(this.filename, JSON.stringify(this.#values));
        } catch (error) {
            console.error(error);
        }
    }

    // getter
    get(key : Key) : Data | undefined {
        return this.#values[key]
    }

    // setter
    set(key: Key, value : Data){
        this.#values[key] = value;
        this.save();
    }

    // 모든 데이터 get
    getAll(){
        return this.#values;
    }
}