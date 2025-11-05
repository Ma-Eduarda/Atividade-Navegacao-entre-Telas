import { IAuthor } from "@/Interfaces/IAuthor";
import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, TextInput, Text } from "react-native";

export type AddAuthorScreenProps = {
    onAdd: (nome: string, bio: string, id: number) => void;
    onCancel: () => void;
    onDelete?: (id: number) => void;
    author?: IAuthor;

};

export default function AuthorModal({onCancel, onAdd, onDelete, author }: AddAuthorScreenProps) {
    const [nome, setNome] = useState<string>("");
    const [bio, setBio] = useState<string>("");
    const [id, setId] = useState<number>(0);

    useEffect(() => {
        if (author) {
            setNome(author.nome);
            setBio(author.bio);
            setId(author.id);
        } else {
            setNome("");
            setBio("");
            setId(0);
        }
    }, [author]);

    return (
            <View style={styles.overlay}>
                <View style={{ width: "80%" }}>
                    <Text style={styles.header}>Novo Autor</Text>

                    <TextInput
                        placeholder="Nome"
                        value={nome}
                        onChangeText={setNome}
                        style={styles.input}
                    />

                    <TextInput
                        placeholder="Bio"
                        value={bio}
                        onChangeText={setBio}
                        style={[styles.input, { height: 70 }]}
                        multiline
                    />


                    <TouchableOpacity style={styles.addButton} onPress={() => onAdd(nome, bio, id)}>
                        <Text style={styles.addButtonText}>Adicionar</Text>
                    </TouchableOpacity>
                    

                    <TouchableOpacity onPress={onCancel} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Cancelar</Text>
                    </TouchableOpacity>


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
    header: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 12,
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
