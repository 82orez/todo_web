import Header from './components/Header';
import styled from 'styled-components';
import TodoEditor from './components/TodoEditor';
import { useEffect, useRef,useState } from 'react';
import TodoList from './components/TodoList';

const DivApp = styled.div`
  max-width: 500px;
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

  const callData = () => {
    fetch('http://localhost:8080/')
      .then((re) => re.json())
      // .then((data) => setTodoLists(data))
      .then((data) => {
        console.log('good');
        return setTodoLists(data);
      })
      .catch((e) => console.error(e));
  };

  // !
  useEffect(callData, []);

  const handleOnChange = (e) => {
    setText(e.target.value);
  };

  const handleOnClickAdd = () => {
    if (text.length === 0) {
      alert('할 일을 입력해 주세요')
      textRef.current.focus()
      return
    }
    fetch('http://localhost:8080/todolist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isDone: false,
        content: text,
        createdDate: new Date().toLocaleDateString(),
      }),
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      // !
      .then(() => callData())
      .then(() => {
        setText('')
        textRef.current.value =''
        textRef.current.focus()
      });
  };

  return (
    <DivApp>
      <Header />
      <TodoEditor handleOnChange={handleOnChange} handleOnClickAdd={handleOnClickAdd} textRef={textRef}/>
      <TodoList todoLists={todoLists} />
    </DivApp>
  );
}

export default App;