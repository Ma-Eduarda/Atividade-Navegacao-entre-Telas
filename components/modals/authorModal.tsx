import { IAuthor } from "@/Interfaces/IAuthor";
import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, TouchableOpacity, View, TextInput, Text } from "react-native";

export type AuthorModalProps = {
    visible: boolean;
    onAdd: (nome: string, bio: string, id: number) => void;
    onCancel: () => void;
    onDelete?: (id: number) => void;
    author?: IAuthor;

};

export default function AuthorModal({ visible, onCancel, onAdd, onDelete, author }: AuthorModalProps) {
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
        <Modal visible={visible} animationType="fade" transparent={true}>
            <View style={styles.overlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.header}>{id > 0 ? "Editar Autor" : "Novo Autor"}</Text>

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


                    <TouchableOpacity style={styles.addButton} onPress={() => {onAdd(nome, bio, id);
                    setNome("");
                    setBio("");
                    setId(0);
                    }}>
                        <Text style={styles.addButtonText}>{id > 0 ? "Salvar" : "Adicionar"}</Text>
                    </TouchableOpacity>
                    
                    {id > 0 && (
                        <TouchableOpacity onPress={() => onDelete?.(id)} style={styles.deleteButton}>
                            <Text style={styles.deleteButtonText}>Deletar</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity onPress={onCancel} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Cancelar</Text>
                    </TouchableOpacity>


                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 5,
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
