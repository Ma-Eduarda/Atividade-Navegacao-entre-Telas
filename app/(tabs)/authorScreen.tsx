import { Image } from "expo-image";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import Autor from "@/components/author/author";
import AuthorModal from "@/components/modals/authorModal";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IAuthor } from "@/Interfaces/IAuthor";

export default function AuthorScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedAuthor, setSelectedAuthor] = useState<IAuthor>();
    const [author, setAuthor] = useState<IAuthor[]>([{
        id: 1,
        nome: "George R.R. Martin",
        bio: "George R. R. Martin é um autor, roteirista e produtor de televisão americano. É mundialmente famoso pela série de livros de fantasia épica 'Game of Thrones'.",
    }]);


    const onAdd = (nome: string, bio: string, id?: number) => {
        
        if(!id || id <= 0){
            const newAuthor = {
                id: Math.random() * 1000,
                nome,
                bio
            };
            
            const authorPlus: IAuthor[] = [
                ...author, 
                newAuthor
            ];

            setAuthor(authorPlus);

        } else {
            author.forEach( author => {
                if(author.id == id){
                    author.nome = nome;
                    author.bio = bio;
                }
            });

            setAuthor([...author]);
        }
        setModalVisible(false);
    };

    const onDelete = (id: number) => {
        const newAuthor: Array<IAuthor> = [];

        for(let index = 0; index < author.length; index++){
            const authors = author[index];

            if(authors.id != id){
                newAuthor.push(authors);
            }
        }
        setAuthor(newAuthor);
        setModalVisible(false);
    };

    const openModal = () => {
        setSelectedAuthor(undefined);
        setModalVisible(true);
    };

    const openEditModal = (selectedAuthor: IAuthor) => {
        setSelectedAuthor(selectedAuthor)
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
                <ThemedText type="title">Autores 📝 </ThemedText> 
            </ThemedView>

            <ThemedView style={styles.stepContainer}>
                <ThemedText>Adicione, edite ou remova autores da sua lista.</ThemedText>
            </ThemedView>

            <TouchableOpacity onPress={() => openModal()}>
                <ThemedText style={styles.addButton}>+</ThemedText>
            </TouchableOpacity>

            {author.map((author) => (
                <TouchableOpacity key={author.id} onPress={() => openEditModal(author)}>
                    <Autor
                        key={author.id}
                        nome={author.nome}
                        bio={author.bio}
                    />
                </TouchableOpacity>
            ))}

            <AuthorModal
                visible={modalVisible}
                onAdd={onAdd}
                onCancel={closeModal}
                onDelete={onDelete}
                author={selectedAuthor}
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
