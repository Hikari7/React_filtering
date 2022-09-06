import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import axios from "axios";

function App() {
  //set関数の中に新しいuserが入ったときに、usersという変数が変わる
  //(usersの数が変われば画面がレンダリングされる)

  const url = "https://jsonplaceholder.typicode.com/users";

  //1.まずjson folderからAPIを取得する
  const [users, setUsers] = useState([]);

  //4. filteringした後の文字列を格納するための変数を用意
  const [searchQuery, setSearchQuery] = useState([]);

  const ref = useRef();

  const handleSearch = () => {
    // console.log(ref.current.value); 打ち込んだ文字列が表示される

    //filtering機能を追加(とある配列に対して残す、濾過するイメージ。それにincludesを組み合わせると検索機能を作ることができるよ！）
    //setSearchQuery()のカッコの中に入れていく
    //userの名前を全て小文字にして、その中にref.current.valueを含まれているなら、その情報だけを残す
    //で、最後にmapをusersだけで展開しているので、searchQueryに書き直す！！！
    setSearchQuery(
      users.filter((user) =>
        user.name.toLowerCase().includes(ref.current.value)
      )
    );
  };

  useEffect(() => {
    const fetchInfo = async () => {
      const { data } = await axios.get(url);
      setUsers(data);
    };
    fetchInfo();
  }, []);

  //3. inputされた文字をfilterしていく、色んなやり方があるが今回はuseRef使う
  //inputタグにrefと、onChange属性(input属性の値が更新される度に発火される)のトリガーを作る

  //console.log(users);　usersを10個の配列として取得できたことを確認！
  //mapで処理してく

  //2. map関数はreturnの中に突っ込んじゃう

  return (
    <div className="App">
      <div className="main">
        <h2>Search App</h2>
        <input type="text" ref={ref} onChange={() => handleSearch()} />
        <div className="content">
          {searchQuery.map((user) => (
            <div className="box" key={user.id}>
              <h3>{user.name}</h3>
              <hr />
              <p>{user.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
