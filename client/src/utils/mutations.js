import { gql } from '@apollo/client'; 

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!){ 
        login(
            email: $email, 
            password: $password) {
            token
            user { username, savedBooks { bookID } }
            }
        }`; 

    export const ADD_User = gql`
    mutation addUser($username: String!, $email: String!, $password: String!){ 
        addUser(username: $username, email: $email, password: $password){ 
        token
        user {email, username}
        }
    }`; 

    export const SAVE_BOOK = gql`
    mutation saveBook( $authors: [String], $description: String, $title: String, $bookID: String, $image: String, $link: String){
        saveBook(bookID: $bookID, title: $title, authors: $authors, description: $description, image: $image, link: $link ){ 
            email
            username
            savedBooks
            bookCount
            }
        }
    }`

    export const REMOVE_BOOK = gql`
    mutation removeBook($bookID: String){ 
        removeBook(bookID: $bookID) { 
            email
            username
            savedBooks
            bookCount
        }
    }`; 