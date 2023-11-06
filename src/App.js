import Header from './components/Header';
import styled from 'styled-components';
import TodoEditor from './components/TodoEditor';
import { useEffect, useRef, useState } from 'react';
import TodoList from './components/TodoList';
import axios from 'axios';

const DivApp = styled.div`
  max-width: 750px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid gray;

  display: flex;
  flex-direction: column;
  gap: 30px;
`;

function App() {
  const [text, setText] = useState('');
  const textRef = useRef(null);

  // *  cors 에러 주의할 것.
  // 해결책: 서버 api 에 cors 를 적용할 것.
  const [todoLists, setTodoLists] = useState([]);

  const callData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/todolist`);
      setTodoLists(response.data);
      console.log('good rendering');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    callData().then();
  }, []);

  const handleOnChange = (e) => {
    setText(e.target.value);
  };

  const handleOnClickAdd = async () => {
    if (text.length === 0) {
      alert('할 일을 입력해 주세요');
      textRef.current.focus();
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/todolist`, {
        isDone: false,
        content: text,
        createdDate: new Date().toLocaleDateString(),
      });
      await callData();
      setText('');
      textRef.current.value = '';
      textRef.current.focus();
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnClickDel = async (e) => {
    const userConfirm = window.confirm('정말로 삭제하시겠습니까?');

    if (userConfirm) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/todolist`, {
          data: { id: e.target.value }
        });
        await callData();
        textRef.current.focus();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleOnChangeCheck = async (e) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/todolist`, {
        id: e.target.value,
        isDone: e.target.checked,
      });
      await callData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DivApp>
      <Header />
      <TodoEditor handleOnChange={handleOnChange} handleOnClickAdd={handleOnClickAdd} textRef={textRef} />
      <TodoList todoLists={todoLists} handleOnClickDel={handleOnClickDel} handleOnChangeCheck={handleOnChangeCheck} />
      <h6>v1.1</h6>
    </DivApp>
  );
}

export default App;
