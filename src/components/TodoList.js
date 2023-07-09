import styled from 'styled-components';
import { Button } from 'react-bootstrap';

const DivTodoList = styled.div`
  & > input {
    width: 100%;
    border: none;
    border-bottom: 1px solid;
    //padding-top: 5px;
    //padding-bottom: 5px;
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
            <input type={'checkbox'} value={todoList.isDone} />
            <div className={'content'}>{todoList.content}</div>
            <div>{todoList.createdDate}</div>
            <Button>Del</Button>
          </div>
        );
      })}
    </DivTodoList>
  );
};

export default TodoList;
