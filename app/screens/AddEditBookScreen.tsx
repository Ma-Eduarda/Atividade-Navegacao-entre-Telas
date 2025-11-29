import React, { useState, useEffect } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, TouchableOpacity, View, TextInput, Text } from "react-native";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { Image } from "expo-image";

import { IBook } from "@/Interfaces/IBooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";

export default function AddEditBookScreen() {

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [id, setId] = useState<number>(0);

    const { bookId } = useLocalSearchParams();
    const [bookParams, setBookParams] = useState<IBook>();
    const [books, setBooks] = useState<IBook[]>([]);


    useEffect(() => {
        async function getData() {
            try {
                const data = await AsyncStorage.getItem("@books:books");
                const booksData: IBook[] = data != null ? JSON.parse(data) : [];
                setBooks(booksData);

                booksData.forEach((book) => {
                    if (book.id.toString() == bookId) {
                        setBookParams(book);

                        setTitle(book.title);
                        setDescription(book.description);
                        setImage(book.image);
                        setId(book.id);
                    }
                });

            } catch (e) { }
        }
        getData()
    }, []);

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
    };

    const onDelete = () => {
        if (bookParams) {
            const newBooks: Array<IBook> = [];

            for (let index = 0; index < books.length; index++) {
                const book = books[index];

                if (book.id !== bookParams.id) {
                    newBooks.push(book);
                }
            }
            setBooks(newBooks);
            AsyncStorage.setItem("@books:books", JSON.stringify(newBooks));
        }
        router.replace('/(tabs)/bookScreen');
    };


    return (
            <View style={styles.overlay}>
                <View style={styles.container}>

                    <View style={styles.form}>
                        <Text style={styles.header}>{id > 0 ? "Editar Livro" : "Novo Livro"}</Text>

                        <Text style={styles.hr} />
                        <Text style={styles.label} >Título: </Text>
                        <TextInput
                            placeholder="Título"
                            value={title}
                            onChangeText={setTitle}
                            style={styles.input}
                        />

                        <Text style={styles.label} >Descrição: </Text>
                        <TextInput
                            placeholder="Descrição"
                            value={description}
                            onChangeText={setDescription}
                            style={[styles.input, { height: 100 }]}
                            multiline
                            textAlignVertical="top"
                        />

                        <Text style={styles.label} >URL da Imagem: </Text>
                        <TextInput
                            placeholder="URL da imagem"
                            value={image}
                            onChangeText={setImage}
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.buttonContainer}>

                        <TouchableOpacity style={styles.addButton} onPress={() => {
                            onAdd(title, description, image, id);
                            router.replace('/(tabs)/bookScreen');
                        }}>
                            <Ionicons name={id > 0 ? "save-outline" : "add-outline"} size={20} color="white" style={{ marginRight: 8 }} />
                            <Text style={styles.addButtonText}>{id > 0 ? "Salvar" : "Adicionar"}</Text>
                        </TouchableOpacity>

                        {id > 0 && (
                            <TouchableOpacity onPress={() => onDelete()} style={styles.deleteButton}>
                                <Ionicons name="trash-outline" size={20} color="white" style={{ marginRight: 8 }} />
                                <Text style={styles.deleteButtonText}>Excluir</Text>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity onPress={() => router.replace('/(tabs)/bookScreen')} style={styles.closeButton}>
                            <Ionicons name="close-outline" size={20} color="white" style={{ marginRight: 8 }} />
                            <Text style={styles.closeButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "#f3f4f6",
        alignItems: "center",
    },

    container: {
        width: "85%",
        flex: 1,
        alignItems: "center",
    },

    header: {
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#2b2c2eff",
        width: "100%",
    },

    form: {
        backgroundColor: "#ffffff",
        padding: 20,
        borderRadius: 16,
        width: "100%",
        marginTop: 80,
        borderColor: "#e1e5e8",
        borderWidth: 1,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },

    label: {
        marginBottom: 6,
        fontWeight: "bold",
        color: "#1e1f1fff",
        fontSize: 14,
    },

    input: {
        borderColor: "#d0d4d6",
        borderWidth: 1,
        width: "100%",
        height: 45,
        borderRadius: 10,
        paddingHorizontal: 12,
        marginBottom: 18,
        backgroundColor: "#fafafa",
        fontSize: 14,
    },

    buttonContainer: {
        width: "100%",
        marginBottom: 80,
        flex: 1,
        justifyContent: "flex-end",
    },

    addButton: {
        backgroundColor: "#0dbe83ff",
        padding: 10,
        borderRadius: 50,
        flexDirection: "row",
        justifyContent: "center",
    },

    addButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },

    deleteButton: {
        backgroundColor: "#eb5353ff",
        padding: 10,
        borderRadius: 50,
        marginTop: 12,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    deleteButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },

    closeButton: {
        backgroundColor: "#6b7280",
        padding: 10,
        borderRadius: 50,
        marginTop: 12,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    closeButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },

    hr: {
        height: 1,
        backgroundColor: "#d1d5db",
        width: "100%",
        marginTop: 8,
        marginBottom: 25,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",

    },
});
