// 컨테이너 컴포넌트
// 리덕스 스토어의 상태를 조회하거나, 액션을 디스패치 할 수 있는 컴포넌트를 의미

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { decrease, increase, setDiff } from "../modules/counter";
import Counter from "./Counter";

// HTML 태그들을 사용하지 않고 다른 프리젠테이셔널 컴포넌트들을 불러와서 사용
function CounterContainer() {
  // useSelector : 리덕스 스토어의 상태를 조회하는 Hook
  // state의 값은 store.getState() 함수를 호출했을 때 나타나는 결과물과 동일

  const { number, diff } = useSelector(
    (state) => ({
      number: state.counter.number,
      diff: state.counter.diff,
    }),
    shallowEqual
  );

  // useDispatch :  리덕스 스토어의 dispatch 를 함수에서 사용 할 수 있게 해주는 Hook
  const dispatch = useDispatch();
  // 각 액션들을 디스패치하는 함수
  const onIncrease = () => dispatch(increase());
  const onDecrease = () => dispatch(decrease());
  const onSetDiff = (diff) => dispatch(setDiff(diff));

  return (
    <Counter
      number={number}
      diff={diff}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onSetDiff={onSetDiff}
    />
  );
}

export default CounterContainer;
