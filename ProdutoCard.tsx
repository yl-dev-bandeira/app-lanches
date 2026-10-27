import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";

import { Produto, useCart } from "@/contexts/CardContext";

type ProdutoCardProps={
    produto:Produto
}

export default function ProdutoCard({produto}:ProdutoCardProps){
    const{adicionar}=useCart();

    function adicionarCarrinho(){
        adicionar(produto);
        Alert.alert("Adicionado!",`${produto.nome} foi adicionado ao carrinho`);
    }
    return(
            <View style={styles.card}>
                <Image source={produto.imagem} style={styles.imagem}/>

                <View style={styles.info}>
                    <Text style={styles.nome}>{produto.nome}</Text>
                    <Text style={styles.preco}>R$ {produto.preco.toFixed(2).replace(".",",")}</Text>
                    <Pressable style={styles.botao} onPress={adicionarCarrinho}>
                        <Text style={styles.textoBotao}>Adicionar ao carrinho</Text>
                    </Pressable>
                </View>
            </View>
    )
}

const styles=StyleSheet.create({
    card:{
        borderWidth:1,
        borderColor:'#FFB3C6',
        borderRadius:10,
        padding:15,
        marginBottom:10,
    },
    info:{
        gap:5,
    },
    nome:{
        fontSize:20,
        fontWeight:'bold',
        color:'#172033'
    },
    preco:{
        fontSize:16,
        fontWeight:'bold',
        color:'#C9184A'
    },
    imagem:{
        width:'100%',
        height:180,
        borderRadius:8,
        marginBottom: 10,
    },
    botao:{
        backgroundColor:"#C9184A",
        padding:12,
        borderRadius:8,
        alignItems:"center",
    },
    textoBotao:{
        color:"#FFFFFF",
        fontWeight:"bold",
    }
});