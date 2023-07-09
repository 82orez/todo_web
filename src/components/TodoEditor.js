import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const DivTodoEditor = styled.div`
  & > .editor-wrapper {
    display: flex;
    gap: 10px;
    
    padding: 5px 0;
  }
  
  & > .editor-wrapper > input {
    flex: 1;
    border-radius: 5px;
  }

  & > .editor-wrapper > input:focus {
    outline: none;
    border: 1px solid #1f93ff;
  }
`;

const TodoEditor = (props) => {
  return (
    <DivTodoEditor>
      <h4>New Todo...✏️</h4>
      <div className={'editor-wrapper'}>
        <input type="text" placeholder={'New Todo...'} onChange={props.handleOnChange} ref={props.textRef}/>
        <Button variant={'danger'} onClick={props.handleOnClickAdd}>Add</Button>
      </div>
    </DivTodoEditor>
  );
};

export default TodoEditor;
