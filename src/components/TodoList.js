import styled from 'styled-components';
import { Button } from 'react-bootstrap';

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
`;

const TodoList = (props) => {
  return (
    <DivTodoList>
      <h4>TodoList</h4>
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
            <div>{todoList.createdDate}</div>
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
