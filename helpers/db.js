// file that contains all database logic
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("places.db"); // contains a reference to the database and takes an argument as the naem of the database

export const init = () => {
  // function to initialize the database

  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      // function to create a table to store data in the database
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lattitude REAL NOT NULL, longitude REAL NOT NULL);",
        [],
        () => {
          // 3rd argument is a function that runs if the query is a sucess
          resolve();
        },
        (query, error) => {
          // 4th argument is a function that runs if the query fails
          reject(error);
        }
      ); // takes a sql query as an argument
    });
  });

  return promise;
};

export const insertPlace = (title, imageUri, address, lattitude, longitude) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO places (title, imageUri, address, lattitude, longitude) VALUES (?, ?, ?, ?, ?);",
        // we dont directly add the values in to prevent SQL injection from occuring
        [title, imageUri, address, lattitude, longitude],
        // add the values in the array so that they can be added dynamically and can be validated
        (query, result) => {
          resolve(result);
        },
        (query, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

export const fetchPlaces = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM places",
        [],
        (query, result) => {
          resolve(result);
        },
        (query, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

/**
 * Concept of transactions is that the package guarantees that the query we execute is executed as a whole.
 * If any part of the query fails, the entire query is rolled back.
 * Thus preventing data getting corrupted.
 */
