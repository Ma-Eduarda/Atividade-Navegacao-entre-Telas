import React, { useState } from "react";
import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import BooksModal from "@/components/modals/booksModal";
import Books from "@/components/books/books";
import { IBook } from "@/Interfaces/IBooks";

export default function BookScreen() {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedBook, setSelectedBook] = useState<IBook>();
    const [books, setBooks] = useState<IBook[]>([{
    id: 1,
        title: "Guerra dos Tronos: volume 1",
        description: "O verão pode durar décadas. O inverno, toda uma vida. E a guerra dos tronos começou.",
        image: "https://m.media-amazon.com/images/I/91+1SUO3vUL._SY425_.jpg"
    },
    {
    id: 2,
        title: "Harry Potter e a Pedra Filosofal: 1",
        description: "Harry Potter é um garoto cujos pais, feiticeiros, foram assassinados por um poderosíssimo bruxo quando ele ainda era um bebê.",
        image: "https://m.media-amazon.com/images/I/81ibfYk4qmL._SL1500_.jpg"
    }]);

    const onAdd = (title: string, description: string, image: string, id?: number) => {
        
        if(!id || id <= 0){
            const newBook: IBook = {
                id: Math.random() * 1000,
                title: title,
                description: description,
                image: image
            };
            
            const booksPlus: IBook[] = [
                ...books, 
                newBook
            ];

            setBooks(booksPlus);

        } else {
            books.forEach( book => {
                if(book.id === id){
                    book.title = title;
                    book.description = description;
                    book.image = image;
                }
            });

            setBooks([...books]);
        }
        setModalVisible(false);
    };

    const onDelete = (id: number) => {
        const newBooks: Array<IBook> = [];

        for (let index = 0; index < books.length; index++) {
            const book = books[index];
            
            if (book.id != id) {
                newBooks.push(book);
            }
        }
        setBooks(newBooks);
        setModalVisible(false);
    };

    const openModal = () => {
        setSelectedBook(undefined);
        setModalVisible(true);
    };

    const openEditModal = (selectedBook: IBook) => {
        setSelectedBook(selectedBook)
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
            headerImage={
                <Image
                    source={require("@/assets/images/livros.png")}
                    style={styles.reactLogo}
                />
            }
        >
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Lista de livros 📚 </ThemedText>
            </ThemedView>

            <ThemedView style={styles.stepContainer}>
                <ThemedText>Adicione, edite ou remova livros da sua lista.</ThemedText>
            </ThemedView>
            
            <TouchableOpacity onPress={() => openModal()}>
                <ThemedText style={styles.addButton}>+</ThemedText>
            </TouchableOpacity>
            


            {books.map((book) => (
                <TouchableOpacity key={book.id} onPress={() => openEditModal(book)}>
                    <Books
                        key={book.id}
                        title={book.title}
                        description={book.description}
                        image={book.image}
                    />
                </TouchableOpacity>
            ))}

            <BooksModal
                visible={modalVisible}
                onAdd={onAdd}
                onCancel={closeModal}
                onDelete={onDelete}
                book={selectedBook}
            />

        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        width: 500,
        height: 300,
        alignSelf: "center",
    },
    addButton: {
        backgroundColor: "#1D3D47",
        color: "#FFFFFF",
        fontSize: 30,
        textAlign: "center",
        borderRadius: 20,
        marginBottom: 10,
        padding: 5,
        paddingTop: 5,
    },
});
