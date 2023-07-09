import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const DivTodoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  
  margin: 5px;
  padding: 5px;
  
  & > div.todo {
    flex: 1;
  }
`;
const TodoItem = () => {
  return (
    <DivTodoItem>
      <input type="checkbox" />
      <div className={'todo'}>할 일</div>
      <div className={'date'}>{new Date().toLocaleDateString()}</div>
      <Button variant={'secondary'}>Del</Button>
    </DivTodoItem>
  );
};

export default TodoItem;
