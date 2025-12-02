import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

import { IAuthor } from "@/Interfaces/IAuthor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";

export default function AddEditAuthorScreen() {

    const [nome, setNome] = useState<string>("");
    const [bio, setBio] = useState<string>("");
    const [id, setId] = useState<number>(0);
    const [image, setImage] = useState<string>("");

    const { authorId } = useLocalSearchParams();
    const [author, setAuthor] = useState<IAuthor[]>([]);
    const [authorParams, setAuthorParams] = useState<IAuthor>();

    useEffect(() => {
        async function getData() {
            try {
                const data = await AsyncStorage.getItem("@authors:authors");
                const authorsData: IAuthor[] = data != null ? JSON.parse(data) : [];
                setAuthor(authorsData);

                authorsData.forEach((author) => {
                    if (author.id.toString() == authorId) {
                        setAuthorParams(author);

                        setNome(author.nome);
                        setBio(author.bio);
                        setId(author.id);
                        setImage(author.image);
                    }
                });

            } catch (e) { }
        }
        getData()
    }, []);

    const onAdd = async (nome: string, bio: string, image: string, id?: number) => {

        if (!id || id <= 0) {
            const newAuthor = {
                id: Math.random() * 1000,
                nome: nome,
                bio: bio,
                image: image
            };

            const authorPlus: IAuthor[] = [
                ...author,
                newAuthor
            ];

            setAuthor(authorPlus);
            AsyncStorage.setItem("@authors:authors", JSON.stringify(authorPlus));
            router.replace('/(tabs)/authorScreen');

        } else {
            author.forEach(author => {
                if (author.id === id) {
                    author.nome = nome;
                    author.bio = bio;
                    author.image = image;
                }
            });

            setAuthor([...author]);
            AsyncStorage.setItem("@authors:authors", JSON.stringify(author));
            router.replace({ pathname: '/screens/AuthorDetailScreen', params: { authorId: id } })
        }
    };

    const onDelete = () => {
        if (authorParams) {
            const newAuthor: Array<IAuthor> = [];

            for (let index = 0; index < author.length; index++) {
                const authors = author[index];

                if (authors.id != authorParams.id) {
                    newAuthor.push(authors);
                }
            }
            setAuthor(newAuthor);
            AsyncStorage.setItem("@authors:authors", JSON.stringify(newAuthor));
        }
        router.replace('/(tabs)/authorScreen');
    };

    const onCancel = () => {
        id > 0 ? router.replace({ pathname: '/screens/AuthorDetailScreen', params: { authorId: id } }) : router.back()
    }

    return (
        <View style={styles.overlay}>
            <View style={styles.container}>

                <View style={styles.form}>
                    <Text style={styles.header}>{authorParams ? "Editar Autor" : "Novo Autor"}</Text>
                    <Text style={styles.hr} />

                    <Text style={styles.label}>Nome: </Text>
                    <TextInput
                        placeholder="Nome"
                        value={nome}
                        onChangeText={setNome}
                        style={styles.input}
                    />
                    <Text style={styles.label}>Biografia: </Text>
                    <TextInput
                        placeholder="Biografia"
                        value={bio}
                        onChangeText={setBio}
                        style={[styles.input, { height: 150 }]}
                        multiline
                        textAlignVertical="top"
                    />

                    <Text style={styles.label}>URL da imagem: </Text>
                    <TextInput
                        placeholder="URL da imagem"
                        value={image}
                        onChangeText={setImage}
                        style={styles.input}
                    />
                </View>

                <View style={styles.buttonContainer}>

                    <TouchableOpacity style={styles.addButton} onPress={() => { onAdd(nome, bio, image, id); }}>
                        <View style={styles.iconRow}>
                            <Ionicons name={id > 0 ? "save-outline" : "add-outline"} size={21} color="white" style={styles.icon} />
                            <Text style={styles.addButtonText}>{id > 0 ? "Salvar" : "Adicionar"}</Text>
                        </View>
                    </TouchableOpacity>

                    {id > 0 && (
                        <TouchableOpacity onPress={() => onDelete()} style={styles.deleteButton}>
                            <View style={styles.iconRow}>
                                <Ionicons name="trash-outline" size={20} color="white" style={styles.icon} />
                                <Text style={styles.deleteButtonText}>Excluir</Text>
                            </View>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity onPress={() => onCancel()} style={styles.closeButton}>
                        <View style={styles.iconRow}>
                            <Ionicons name="close-outline" size={21} color="white" style={styles.icon} />
                            <Text style={styles.closeButtonText}>Cancelar</Text>
                        </View>
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
        marginTop: 40,
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
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 50,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },

    deleteButton: {
        backgroundColor: "#eb5353ff",
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 50,
        marginTop: 12,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },

    closeButton: {
        backgroundColor: "#6b7280",
        paddingVertical: 12,
        paddingHorizontal: 18,
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
        width: 120,
        paddingLeft: 12,
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
        marginBottom: 30,
    },
});
