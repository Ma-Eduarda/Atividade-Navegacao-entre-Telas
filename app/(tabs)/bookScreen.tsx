import React, { useState, useEffect } from "react";
import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import BooksModal from "@/components/modals/booksModal";
import Books from "@/components/books/books";
import { IBook } from "@/Interfaces/IBooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";


export default function BookScreen() {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedBook, setSelectedBook] = useState<IBook>();
    const [books, setBooks] = useState<IBook[]>([]);
    const [location, setLocation] = useState({});
    const [errorMsg, setErrorMsg] = useState("");
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        async function getData() {
            try {
                const data = await AsyncStorage.getItem("@books:books");
                const booksData = data != null ? JSON.parse(data) : [];
                setBooks(booksData);
            } catch (e) {
            }
        }
        getData()
    }, []);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    const onAdd = async (title: string, description: string, image: string, id?: number) => {

        if (!id || id <= 0) {
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
            AsyncStorage.setItem("@books:books", JSON.stringify(booksPlus));

        } else {
            books.forEach(book => {
                if (book.id === id) {
                    book.title = title;
                    book.description = description;
                    book.image = image;
                }
            });

            setBooks([...books]);
            AsyncStorage.setItem("@books:books", JSON.stringify(books));
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
        AsyncStorage.setItem("@books:books", JSON.stringify(newBooks));
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

            <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                <ThemedText
                    style={styles.locationText}
                    numberOfLines={expanded ? undefined : 1}>📍 {text}</ThemedText>
            </TouchableOpacity>

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
    locationText: {
        fontSize: 12,
        color: "#555",
        fontStyle: "italic",
        backgroundColor: "#f1f1f1cc",
    },
});
