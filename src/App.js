import logo from './logo.svg';
import './App.css';
import {useState} from 'react';


function Header(props) {
  console.log('props',props,props.title);
  return (
    <header>
      <h1><a href="/" onClick={function(event){
        event.preventDefault();
        props.onChangeMode();
      }}>{props.title}</a></h1>
    </header>
  )
}

function Nav(props) {
  const ls = [
      // <li><a href="/read/1">html</a></li>,
      // <li><a href="/read/2">css</a></li>,
      // <li><a href="/read/3">js</a></li>,
      // <li><a href="/read/4">java</a></li>
  ]
  for(let i=0; i<props.topics.length; i++) {
    let t = props.topics[i];
    ls.push(<li key={t.id}><a id={t.id} href={'/read/4'+t.id} onClick={function(event){
      event.preventDefault();
      //props.onChangeMode(t.id); //여러가지 방법 존재 
      props.onChangeMode(Number(event.target.id))
    }}>{t.title}</a></li>)
  }
  return (
    <nav>
      <ol>
        {ls}  
      </ol>
    </nav>
  )
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article> 
  )
}
function Create(props){
  return <article>
    <h2>Create</h2>
    <form onSubmit={event=>{
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onCreate(title,body);
    }}>
      <p><input type="text" name="title" placeholder='title'></input></p>
      <p><textarea name="body" placeholder='body'></textarea></p>
      <p><input type="submit" value="Create"></input></p>
    </form>
  </article>
}

function Update(props){
  const [title,setTitle] = useState(props.title);
  const [body,setBody] = useState(props.body);
  return <article>
  <h2>Update</h2>
  <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onUpdate(title,body);
  }}>
    <p><input type="text" name="title" placeholder='title' value={title} onChange={(event => {
      console.log(event.target.value);
      setTitle(event.target.value);
    })}></input></p>
    <p><textarea name="body" placeholder='body' value={body}  onChange={event => {
      setBody(event.target.value);
    }}></textarea></p>
    <p><input type="submit" value="Update"></input></p>
  </form>
</article>
}

function App() { 
  // const _mode = useState('WELCOME');
  // const mode= _mode[0];   //상태 초기값
  // const setMode = _mode[1]; // 값읇 변경할경우 1번지로 바꿔야 한다.
  const [mode, setMode] = useState('WELCOME');  // 위에 코드들은 한번에 축약시킨 것
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics ]= useState([
      {id:1, title:'html',body:'html is ...'},
      {id:2, title:'css',body:'css is ...'},
      {id:3, title:'js',body:'js is ...'}
  ])
  let content = null;
  let contextControll = null;
  if(mode === 'WELCOME'){
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  }else if(mode === 'READ'){
    let title, body = null;
    for(let i = 0; i<topics.length; i++){
      console.log(topics[i].id,id);
      if(topics[i].id === id){
        console.log(topics[i].id,id);
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
    contextControll = <>
        <li><a href={'/update'+id} onClick={event => {
          event.preventDefault();
          setMode('UPDATE');
        }}>UPDATE</a></li>
        <li>
          <input type="button" value="Delete" onClick={()=>{
            const newTopics = [];
            for(let i =0; i<topics.length; i++){
              if(topics[i].id !== id){
                newTopics.push(topics[i]);
              }
            }
            setTopics(newTopics);
            setMode('WELCOME');
          }}/>
        </li>
    </>
  }else if(mode === 'CREATE'){
    content = <Create onCreate={(_title,_body) => {
      const newTopic = {id:nextId, title:_title, body:_body}
      //topics.push(newTopic);
      //setTopics(topics);
      //object 객체 복제
      // newValue = {...value}
      // 배열 복제
      // newValue = [...value]
      const newTopics = [...topics]
      newTopics.push(newTopic);
      setTopics(newTopics);
    }}></Create>
  }else if(mode === 'UPDATE'){
    let title, body = null;
    for(let i = 0; i<topics.length; i++){
      console.log(topics[i].id,id);
      if(topics[i].id === id){
        console.log(topics[i].id,id);
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Update title={title} body={body} onUpdate={(title,body)=>{
      const newTopics = [...topics]
      const updateTopics = {id:id , title: title, body : body}
      for(let i=0; i<newTopics.length; i++){
        if(newTopics[i].id === id){
          newTopics[i] = updateTopics;
          break;
        }
      }
      setTopics(newTopics);
      setMode('READ');
    }}> </Update>
  }


  return (
    <div className="App">
      <Header title="REACT" onChangeMode={function(){
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(id)=>{
       setMode('READ');
       setId(id);
      }}></Nav>
      {content}
      <ul>
        <li><a href='/create' onClick={event=>{
          event.preventDefault();
          setMode('CREATE');
        }}>CREATE</a></li>
        {contextControll}
      </ul>
    </div>
  );
}

export default App;