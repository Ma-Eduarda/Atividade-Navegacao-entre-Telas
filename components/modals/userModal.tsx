import { IUser } from "@/Interfaces/IUser";
import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, TouchableOpacity, View, TextInput, Text } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

export type UserModalProps = {
    visible: boolean;
    onAdd: (nome: string, email: string, id: number) => void;
    onCancel: () => void;
    onDelete?: (id: number) => void;
    user?: IUser;
};

export default function UserModal({ visible, onCancel, onAdd, onDelete, user }: UserModalProps) {
    const [nome, setNome] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [id, setId] = useState<number>(0);

    useEffect(() => {
        if (user) {
            setNome(user.nome);
            setEmail(user.email);
            setId(user.id);
        } else {
            setNome("");
            setEmail("");
            setId(0);
        }
    }, [user]);

    return (
        <Modal visible={visible} animationType="fade" transparent={true}>
            <View style={styles.overlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.header}>{id > 0 ? "Editar Usuário" : "Novo Usuário"}</Text>
                    <Text style={styles.hr} />

                    <Text style={styles.label}>Nome: </Text>
                    <TextInput
                        placeholder="Nome"
                        value={nome}
                        onChangeText={setNome}
                        style={styles.input}
                    />

                    <Text style={styles.label}>Email: </Text>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.addButton} onPress={() => {onAdd (nome, email, id)}}>
                            <View style={styles.iconRow}>
                            <Ionicons name={id > 0 ? "save-outline" : "add-outline"} size={21} color="white" style={styles.icon} />
                            <Text style={styles.addButtonText}>{id > 0 ? "Salvar" : "Adicionar"}</Text>
                        </View>
                        </TouchableOpacity>

                        {id > 0 && (
                            <TouchableOpacity onPress={() => onDelete?.(id)} style={styles.deleteButton}>
                                <View style={styles.iconRow}>
                                <Ionicons name="trash-outline" size={20} color="white" style={styles.icon} />
                                <Text style={styles.deleteButtonText}>Excluir</Text>
                            </View>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity onPress={onCancel} style={styles.closeButton}>
                            <View style={styles.iconRow}>
                            <Ionicons name="close-outline" size={21} color="white" style={styles.icon} />
                            <Text style={styles.closeButtonText}>Cancelar</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.53)",
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
        marginBottom: 10,
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
        marginTop: 10,
    },

    addButton: {
        backgroundColor: "#0dbe83ff",
        padding: 8,
        borderRadius: 50,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },

    deleteButton: {
        backgroundColor: "#eb5353ff",
        padding: 8,
        borderRadius: 50,
        marginTop: 12,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },

    closeButton: {
        backgroundColor: "#6b7280",
        padding: 8,
        borderRadius: 50,
        marginTop: 12,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },

    iconRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        width: 100,
    },

    icon: {
        width: 24,
        textAlign: "center",
        marginRight: 8,
    },

    addButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    deleteButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    closeButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    hr: {
        width: "100%",
        height: 1,
        backgroundColor: "#0000002f",
        marginBottom: 20,
    },
});
