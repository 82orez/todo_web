import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { useMemo } from 'react';

const DivTodoList = styled.div`
  & > input {
    width: 100%;
    border: none;
    border-bottom: 1px solid;
    padding: 5px 0;
    margin-bottom: 10px;
  }

  & > div {
    display: flex;
    align-items: center;
    gap: 15px;

    padding: 5px 0;
  }

  & > div > div.content {
    flex: 1;
  }

  .createdDate {
    @media (max-width: 500px) {
      display: none;
    }
  }
`;

const TodoList = (props) => {
  // useMemo : 의존성 배열 안의 props.todoLists 의 상태가 변할 때에만 재렌더링 실시.
  const analyzeTodo = useMemo(() => {
    console.log('Analyze 함수 호출됨!');
    const totalNum = props.todoLists.length;
    const doneNum = props.todoLists.filter((obj) => obj.isDone).length;
    const noDoneNum = props.todoLists.filter((obj) => !obj.isDone).length;
    return {
      totalNum,
      doneNum,
      noDoneNum,
    };
  }, [props.todoLists]);
  // ! useMemo 메서드는 함수 자체가 아닌 실행된 값을 반환하므로 analyzeTodo() 가 아니라 analyzeTodo.
  const { totalNum, doneNum, noDoneNum } = analyzeTodo;

  return (
    <DivTodoList>
      <h4>TodoList</h4>
      <h6>총갯수: {totalNum}</h6>
      <h6>완료된 할 일: {doneNum}</h6>
      <h6>미완료 할 일: {noDoneNum}</h6>
      <input type="text" placeholder={'검색어를 입력하세요.'} />
      {props.todoLists.map((todoList) => {
        return (
          <div key={todoList.id}>
            {todoList.isDone ? (
              <input type={'checkbox'} checked={true} value={todoList.id} onChange={props.handleOnChangeCheck} />
            ) : (
              <input type={'checkbox'} value={todoList.id} checked={false} onChange={props.handleOnChangeCheck} />
            )}
            <div className={'content'}>{todoList.content}</div>
            <div className="createdDate">{todoList.createdDate}</div>
            <Button onClick={props.handleOnClickDel} value={todoList.id}>
              Del
            </Button>
          </div>
        );
      })}
    </DivTodoList>
  );
};

export default TodoList;

