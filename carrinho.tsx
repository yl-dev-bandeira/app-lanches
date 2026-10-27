import { useCart } from "@/contexts/CardContext";
import { useRouter } from "expo-router";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function CarrinhoScreen(){
    const{
        itens,
        adicionar,
        remover,
        alterarQuantidade,
        total,
        limpar,
    }=useCart();

const router=useRouter();
return(
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Carrinho</Text>
        {itens.length===0 ? (
            <View style={styles.vazio}>
                <Text>Seu carrinho está vazio</Text>
                <Pressable style={styles.botao} onPress={()=>router.back()}>
                    <Text style={styles.textoBotao}>Voltar ao cardápio</Text>
                </Pressable>
            </View>
        ):(<>
        {itens.map((item)=>
        <View key={item.produto.id}style={styles.item}>
            <View style={styles.info}>
                <Text style={styles.nome}>{item.produto.nome}</Text>
                <Text style={styles.preco}>R${(item.produto.preco*item.quantidade).toFixed(2).replace(".",",")}</Text>
                <View style={styles.quantidade}>
                    <Pressable style={styles.controle} onPress={()=>alterarQuantidade(item.produto.id,item.quantidade-1)}>
                        <Text style={styles.textoControle}>-</Text>
                    </Pressable>
                    <Pressable style={styles.controle} onPress={()=>alterarQuantidade(item.produto.id,item.quantidade+1)}>
                        <Text style={styles.textoControle}>+</Text>
                    </Pressable>
                </View>
                <Pressable onPress={()=>remover(item.produto.id)}>
                    <Text style={styles.remover}>Remover item</Text>
                </Pressable>
            </View>
        </View>)}

        <View style={styles.resumo}>
            <Text style={styles.total}>
                Total: R${total.toFixed(2).replace(".",",")}
            </Text>
            <Pressable style={styles.botaoSecundario} onPress={()=>Alert.alert("Limpar carrinho","Deseja remover todos os itens?",[{text:'Cancelar',style:'cancel'},{text:'limpar',style:'destructive',onPress:limpar,}])}>
                <Text style={styles.textoSecundario}>Limpar carrinho</Text>
            </Pressable>
            <Pressable style={styles.botao} onPress={()=>Alert.alert('Próxima etapa',"Ainda não implementado")}>
                <Text style={styles.textoBotao}>Finalizar Pedido</Text>
            </Pressable>
            <Pressable style={styles.botao} onPress={()=>router.back()}>
                <Text style={styles.textoBotao}>Voltar ao cardápio</Text>
            </Pressable>
        </View>
    </>

        )}
    </ScrollView>
);}
const styles=StyleSheet.create({
    container:{
        padding:20,
        flexGrow:1,
        backgroundColor:"#FFE5EC",
    },
    titulo:{
        fontSize:28,
        fontWeight:'bold',
        color:"#C9184A",
        marginBottom:20,
    },
    vazio:{
        alignItems:'center',
        paddingVertical:40,
        gap:20,
    },
    mensagem:{
        fontSize:17,
        color:"#780016",
    },
    item:{
        borderWidth:1,
        borderColor:'#FFB3C6',
        borderRadius:12,
        padding:16,
        marginBottom:12,
        backgroundColor:"#FFFFFF",
    },
    info:{
        gap:10,
    },
    nome:{
        fontSize:18,
        fontWeight:'bold',
        color:"#172033",
    },
    preco:{
        fontSize:16,
        fontWeight:'bold',
        color:"#C9184A",
    },
    quantidade:{
        flexDirection:"row",
        alignItems:'center',
        gap:18,
    },
    controle:{
        backgroundColor:"#C9184A",
        width:38,
        height:38,
        borderRadius:8,
        alignItems:'center',
        justifyContent:'center',
    },
    textoControle:{
        color:"#FFFFFF",
        fontSize:23,
        fontWeight:'bold',    
    },
    numero:{
        fontSize:18,
        fontWeight:'bold',
        color:'#172033'
    },
    remover:{
        color:'#B42318',
        fontWeight:'600',
        paddingVertical:4,
    },
    resumo:{
        borderTopWidth:1,
        borderColor:"#FFB3C6",
        paddingTop:20,
        marginTop:8,
        gap:14
    },
    total:{
        fontSize:23,
        fontWeight:'bold',
        color:"#C9184A",
    },
    botao:{
        backgroundColor:"#C9184A",
        padding:15,
        borderRadius:10,
        alignItems:'center',
    },
    textoBotao:{
        color:'#FFFFFF',
        fontSize:16,
        fontWeight:'bold',
    },
    botaoSecundario:{
        padding:12,
        alignItems:'center',
        borderWidth:1,
        borderColor:'#B42318',
        borderRadius:10,
    },
    textoSecundario:{
        color:"#B42318",
        fontWeight:'bold',
    },
});