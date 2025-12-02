import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { IAuthor } from "@/Interfaces/IAuthor";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from "expo-image";

export default function AuthorDetailScreen() {
    const { authorId } = useLocalSearchParams();
    const [author, setAuthor] = useState<IAuthor>();
    
    useEffect(() => {
        async function getData() {
            try {
                const data = await AsyncStorage.getItem("@authors:authors");
                const authorsData = data != null ? JSON.parse(data) : [];

                authorsData.forEach((author: IAuthor) => {
                    if (author.id.toString() === authorId) {
                        setAuthor(author);
                    }
                });
            } catch (e) { }
        }
        getData();
    }, []);

    return (
        <View style={styles.overlay}>
            <View style={styles.container}>

                <Image
                    source={{ uri: author?.image }}
                    style={styles.profileImage}
                    contentFit="cover"
                />

                <Text style={styles.authorName}>{author?.nome}</Text>

                <View style={styles.card}>
                    <Text style={styles.label}>Biografia</Text>
                    <Text style={styles.value}>{author?.bio}</Text>
                </View>

                <View style={styles.buttonContainer}>

                    <TouchableOpacity
                        style={[styles.button, styles.editButton]}
                        onPress={() =>
                            router.push({
                                pathname: '/screens/AddEditAuthorScreen',
                                params: { authorId: author?.id }
                            })
                        }
                    >
                        <Ionicons name="create-outline" size={22} color="white" />
                        <Text style={styles.buttonText}>Editar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.closeButton]}
                        onPress={() => router.replace('/(tabs)/authorScreen')}
                    >
                        <Ionicons name="close-outline" size={22} color="white" />
                        <Text style={styles.buttonText}>Fechar</Text>
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
        marginTop: 50,
    },

    profileImage: {
        width: 140,
        height: 140,
        borderRadius: 100,
        backgroundColor: "#ddd",
        marginBottom: 12,
    },

    authorName: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1f2937",
        marginBottom: 25,
    },

    card: {
        width: "100%",
        backgroundColor: "#ffffff",
        padding: 22,
        borderRadius: 16,
        borderColor: "#e5e7eb",
        borderWidth: 1,
        shadowColor: "#000",
        shadowOpacity: 0.07,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 4,
    },

    label: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#374151",
        marginBottom: 6,
    },

    value: {
        fontSize: 15,
        color: "#1f2937",
        lineHeight: 20,
    },

    buttonContainer: {
        width: "100%",
        marginTop: 40,
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 60,
    },

    button: {
        padding: 12,
        borderRadius: 50,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
        gap: 6,
    },

    editButton: {
        backgroundColor: "#10b981",
    },

    closeButton: {
        backgroundColor: "#6b7280",
    },

    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 15,
    },
});
