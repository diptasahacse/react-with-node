import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [users, setUsers] = useState([])
  const nameRef = useRef('');
  const emailRef = useRef('');

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const formOnSubmitHandler = (event) => {
    event.preventDefault()

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    console.log(name, email)


    // User
    const user = {
      name,
      email
    }

    // POST
    fetch('http://localhost:5000/user', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        let newArray = [...users, data]
        setUsers(newArray)
      })

  }
  // console.log(users)
  return (
    <div className="App">
      <form onSubmit={formOnSubmitHandler}>
        <input ref={nameRef} type="text" name='name' placeholder='Enter Name' />
        <br />
        <input ref={emailRef} type="email" name='email' placeholder='Enter Email' />
        <br />
        <input type="submit" value="Send" />
      </form>

      <h3>Total User : {users.length}</h3>
      <div>
        {
          users.map(element => <MakeList key={element.id} element={element}></MakeList>)
        }

      </div>

    </div>
  );
}
const MakeList = ({ element }) => {
  const { name, email } = element;
  return (
    <div>
      <h4>{name}</h4>
      <p>{email}</p>
    </div>
  );

}

export default App;
