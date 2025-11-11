import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, TextInput, Text } from "react-native";
import { IBook } from "@/Interfaces/IBooks";

export type AddBookScreenProps = {
    onAdd: (title: string, description: string, image: string, id: number) => void;
    onCancel: () => void;
    onDelete?: (id: number) => void;
    book?: IBook;
};

export default function AddBookScreen({ onCancel, onAdd, book }: AddBookScreenProps) {
    
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [id, setId] = useState<number>(0);

    useEffect(() => {
        if (book) {
            setTitle(book.title);
            setDescription(book.description);
            setImage(book.image);
            setId(book.id);
        } else {
            setTitle("");
            setDescription("");
            setImage("");
            setId(0);
        }
    }, [book]);


    return (
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.header}>Novo Livro</Text>

                    <TextInput
                        placeholder="Título"
                        value={title}
                        onChangeText={setTitle}
                        style={styles.input}
                    />

                    <TextInput
                        placeholder="Descrição"
                        value={description}
                        onChangeText={setDescription}
                        style={[styles.input, { height: 70 }]}
                        multiline
                    />

                    <TextInput
                        placeholder="URL da imagem"
                        value={image}
                        onChangeText={setImage}
                        style={styles.input}
                    />
                    <View style = {styles.buttonContainer}>
                        <TouchableOpacity style={styles.addButton} onPress={() => onAdd(title, description, image, id)}>
                        <Text style={styles.addButtonText}>Adicionar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={onCancel} style={styles.closeButton}>
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
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        width: "80%",
        flex: 1,
        marginTop: 50,
    },
    header: {
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 40,
        marginTop:80,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 12,
        backgroundColor: "#55555513",

    },
    buttonContainer: {
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 50,
    },
    addButton: {
        backgroundColor: "#1d5c2aff",
        padding: 10,
        borderRadius: 8,
        marginTop: 5,
    },
    addButtonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
    },
    closeButton: {
        backgroundColor: "#ccc",
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
    },
    closeButtonText: {
        color: "#333",
        textAlign: "center",
        fontWeight: "bold",
    },
    deleteButton: {
        backgroundColor: "#e05555ff",
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
    },
    deleteButtonText: {
        color: "#ffffffff",
        textAlign: "center",
        fontWeight: "bold",
    },
});

