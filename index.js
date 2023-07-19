import Head from 'next/head';
import styles from '../styles/Home.module.css';
import React, { useEffect, useState } from 'react'; 



export default function Home() {
  // Define state variables
  const [data, setData] = useState([]);  //
  const [loading, setLoading] = useState(false);  //

  const getData = async () => {
    // try-catch-finally statement for API call
    // We don't know we'll get an answer
    try {
      // Update state variable
      setLoading(true);
      // Get portion of query from searchbar
      // Then concatenate and await API call results.  
      // turn it into JSON, and update the other state variable
      let queryFragment = document.getElementById('searchBar').value;
      const urlName = await fetch('https://www.googleapis.com/books/v1/volumes?q=' + queryFragment + '&maxResults=3');
      const dataObj = await urlName.json();
      //console.log(dataObj, 'dataObj');
      setData(dataObj.items);
      //console.log(data);
    } catch (err) {
      // Catch errors and log in browser console
      console.log(err);
    } finally {
      // Update state variable again
      setLoading(false);
    }

  }

  // useEffect hook ensures getData() is called
  // once per render 
  useEffect(() => {
    getData();
  }, [])

  // Add event listener to searchbar - Enter key
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const queryFragment = event.target.value;
      getData(queryFragment);
    }
  };

  // Function to render table
  const renderBooks = () => {
    // Check if loading
    if (loading) {
      return <p>Loading...</p>;
    }

    // Check if empty
    if (!data || data.length === 0) {
      return <p>No books found.</p>;
    }

    // Return table with information
    return (
      <div className={styles.resultdiv}>
        <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Subtitle</th>
            <th>Author</th>
            <th>Thumbnail</th>
          </tr>
        </thead>
        <tbody id="tableBody">
          {data.map((book) => (
            <tr key={book.id}>
              <td>{book.volumeInfo.title}</td>
              <td>{book.volumeInfo.subtitle}</td>
              <td>{book.volumeInfo.authors && book.volumeInfo.authors.join(", ")}</td>
              <td>
                {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail && (
                  <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    )

  };


  // 
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing <code>pages/index.js</code>
        </p>

        <input
        id='searchBar'
        onKeyDown={handleKeyPress}
        className={styles.searchbar}
        placeholder='Search For Books'
        type='text'></input>

        <br></br>

        <button onClick={getData}>SEARCH BOOKS</button>

        <div className={styles.outerdiv}>
          {
            // renderBooks() depends on search results
            renderBooks()
          }
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        searchbar {
          width: 600px;
          height: 40px;
          font-size: 18px;
        }
        
        button {
          background-color: #0070f3;
          color: white;
          font-size: '1.5 rem';
          padding: 4px;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

