import { createStore } from "redux";

// createStore는 스토어를 만들어주는 함수
// 리액트 프로젝트에서는 단 하나의 스토어를 만듬

// 리덕스에서 관리 할 상태 정의
const initialState = {
  counter: 0,
  text: "",
  list: [],
};

// 액션 타입 정의
// 액션 타입은 주로 대문자로 작성
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
const CHANGE_TEXT = "CHANGE_TEXT";
const ADD_TO_LIST = "ADD_TO_LIST";

// 액션 생성함수 정의
// 액션 생성함수는 주로 카멜케이스로 작성
function increase() {
  return {
    type: INCREASE, // 액션 객체에는 type값이 필수
  };
}

// 화살표 함수로 작성하는 것이 더욱 코드가 간단, 추천
// 객체 리터럴임을 명시하기 위해 괄호 ()로 감싸줘야 함
// 호출 시에 객체를 반환하는데, 객체 리터럴을 반환하기 위해선 괄호 ()를 사용
const decrease = () => ({
  type: DECREASE,
});

const changeText = (text) => ({
  type: CHANGE_TEXT,
  text, // 액션안에는 type 외에 추가적인 필드를 마음대로 넣을 수 있습니다.
});

const addToList = (item) => ({
  type: ADD_TO_LIST,
  item,
});

// 리듀서 만들기
// 불변성을 꼭 지켜야 함

function reducer(state = initialState, action) {
  // state의 초기값을 initialState로 지정

  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        counter: state.counter + 1,
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };
    case CHANGE_TEXT:
      return {
        ...state,
        text: action.text,
      };
    case ADD_TO_LIST:
      return {
        ...state,
        list: state.list.concat(action.item),
      };
    default:
      return state;
  }
}

// 스토어 만들기
const store = createStore(reducer);

console.log(store.getState()); // 현재 store 안에 들어있는 상태를 조회

// 스토어안에 들어있는 상태가 바뀔 때 마다 호출되는 listener 함수
const listener = () => {
  const state = store.getState();
  console.log(state);
};

const unsubscribe = store.subscribe(listener);
// 구독을 해제하고 싶을 때는 unsubscribe()를 호출하면 됨

// 액션들을 디스패치
store.dispatch(increase());
store.dispatch(decrease());
store.dispatch(changeText("안녕하세요"));
store.dispatch(addToList({ id: 1, text: "와우" }));
