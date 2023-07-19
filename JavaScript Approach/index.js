import Head from 'next/head';
import styles from '../styles/Home.module.css';
import React, { useEffect, useState } from 'react'; 



export default function Home() {
  
  async function getBooks() {
    var displayed = document.getElementById('results');

    let queryFragment = document.getElementById('searchBar').value;
    const urlName = await fetch('https://www.googleapis.com/books/v1/volumes?q=' + queryFragment + '&maxResults=3');

    
    const books = async () => {
      try {
        let queryFragment = document.getElementById('searchBar').value;
        let tabBod = document.querySelector('#tableBody');
        const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=' + queryFragment + '&maxResults=3');
        const data = await response.json();
        //console.log(data);
        //console.log(data.items);
        //console.log(typeof(data.items));

        const datObj = data.items;

        let out = '';

        for (let i = 0; i < datObj.length; i++){
          console.log(datObj[i].volumeInfo);
          out += `
            <tr>
              <td>${datObj[i].volumeInfo.title}</td>
              <td>${datObj[i].volumeInfo.subtitle}</td>
              <td>${datObj[i].volumeInfo.authors}</td>
              <td><img src='${datObj[i].volumeInfo.imageLinks.thumbnail}'></td>
            </tr>
          `;

          tabBod.innerHTML = out;
          
        }
        

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    books();
    

  };

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
        className={styles.searchbar}
        placeholder='Search For Books'
        type='text'></input>

        <br></br>

        <button onClick={getBooks}>SEARCH BOOKS</button>

        <div className={styles.outerdiv}>
          <table>
            <thead>
              <tr>
                <td>TITLE</td>
                <td>SUBTITLE</td>
                <td>AUTHOR</td>
                <td>THUMBNAIL</td>
              </tr>
            </thead>
            <tbody id='tableBody'>
            </tbody>
          </table>
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

